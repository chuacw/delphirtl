import * as fs from 'fs';
import assert from "assert";
import {TObject, sLineBreak} from "./rtl";

/**
 * Node types representing the structure of a .env file, preserving order and comments.
 */
type EnvNode = EnvCommentNode | EnvKeyValueNode | EnvBlankNode;

interface EnvBaseNode {
  kind: 'comment' | 'kv' | 'blank';
  /** The original line text without the trailing newline. */
  raw: string;
}

interface EnvCommentNode extends EnvBaseNode {
  kind: 'comment';
  /** Comment text including the leading # (as in the file). */
  comment: string;
}

interface EnvKeyValueNode extends EnvBaseNode {
  kind: 'kv';
  key: string;
  /**
   * The value exactly as it appeared after the first '=' sign.
   * This may include surrounding quotes and any inline content. No trimming.
   */
  value: string;
}

interface EnvBlankNode extends EnvBaseNode {
  kind: 'blank';
}

/**
 * A lightweight .env parser that preserves all lines, including comments and blanks.
 * Parsing rules:
 * - Lines starting with optional whitespace followed by '#' are comments.
 * - Empty or whitespace-only lines are blanks.
 * - Otherwise, the first '=' splits key and value. Key is trimmed of surrounding whitespace.
 * - The value is kept verbatim (no trimming), preserving quotes and inline content.
 */
class EnvParser extends TObject {
  parse(text: string): EnvNode[] {
    const lines = text.split(/\r?\n/);
    const nodes: EnvNode[] = [];
    for (const line of lines) {
      // Preserve the raw line (without newline)
      const raw = line;
      if (line.trim() === '') {
        nodes.push({ kind: 'blank', raw });
        continue;
      }
      const trimmed = line.trimStart();
      if (trimmed.startsWith('#')) {
        nodes.push({ kind: 'comment', comment: line, raw });
        continue;
      }
      // Find the first '=' sign; if none, keep as comment-like to avoid data loss
      const eqIdx = line.indexOf('=');
      if (eqIdx === -1) {
        // Treat as comment to preserve line as-is
        nodes.push({ kind: 'comment', comment: line, raw });
        continue;
      }
      const keyPart = line.slice(0, eqIdx).trim();
      const valuePart = line.slice(eqIdx + 1); // keep verbatim
      nodes.push({ kind: 'kv', key: keyPart, value: valuePart, raw });
    }
    return nodes;
  }
}

/**
 * Reader for .env files using EnvParser. Allows retrieving keys/values and comments.
 */
class EnvReader extends TObject {
  private nodes: EnvNode[] = [];
  private byKey: Map<string, EnvKeyValueNode> = new Map();

  constructor(source: string | EnvNode[], opts?: { isPath?: boolean }) {
    super();
    if (Array.isArray(source)) {
      this.nodes = source;
    } else {
      const isPath = opts?.isPath ?? this.looksLikePath(source);
      const text = isPath ? fs.readFileSync(source, 'utf-8') : source;
      const parser = new EnvParser();
      this.nodes = parser.parse(text);
    }
    this.reindex();
  }

  private looksLikePath(s: string): boolean {
    // Heuristic: if contains a path separator or ends with .env
    return /[\\/]/.test(s) || /\.env(\.|$)?/i.test(s);
  }

  private reindex() {
    this.byKey.clear();
    for (const n of this.nodes) {
      if (n.kind === 'kv' && n.key) {
        if (!this.byKey.has(n.key)) this.byKey.set(n.key, n);
      }
    }
  }

  getAllNodes(): EnvNode[] { return this.nodes.slice(); }

  getComments(): EnvCommentNode[] { return this.nodes.filter(n => n.kind === 'comment') as EnvCommentNode[]; }

  getKeyValueNodes(): EnvKeyValueNode[] { return this.nodes.filter(n => n.kind === 'kv') as EnvKeyValueNode[]; }

  getKeys(): string[] { return this.getKeyValueNodes().map(n => n.key); }

  has(key: string): boolean { return this.byKey.has(key); }

  getValueRaw(key: string): string | undefined { return this.byKey.get(key)?.value; }

  getValue(key: string): string | undefined {
    const raw = this.getValueRaw(key);
    if (raw == null) return undefined;
    // Try to unquote if wrapped in matching quotes
    const trimmed = raw.trim();
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
    return trimmed;
  }
}

/**
 * Writer for .env files. Can append comments and key/values while preserving existing content and order.
 */
class EnvWriter extends TObject {
  private nodes: EnvNode[];

  constructor(initial?: string | EnvNode[], opts?: { isPath?: boolean }) {
    super();
    if (typeof initial === 'string' || Array.isArray(initial)) {
      const reader = new EnvReader(initial as any, typeof initial === 'string' ? opts : undefined);
      this.nodes = reader.getAllNodes();
    } else {
      this.nodes = [];
    }
  }

  static fromFile(path: string): EnvWriter {
    return new EnvWriter(path, { isPath: true });
  }

  /** Append a blank line */
  blank(): this { this.nodes.push({ kind: 'blank', raw: '' }); return this; }

  /** Append a comment line. If text already starts with '#', it's preserved as-is. */
  comment(text: string): this {
    const line = text.trimStart().startsWith('#') ? text : `# ${text}`;
    this.nodes.push({ kind: 'comment', comment: line, raw: line });
    return this;
  }

  /** Append a key=value pair verbatim. Value is not modified. */
  append(key: string, value: string): this {
    assert(key !== "" && value !== "", "Key and value cannot be empty");
    const line = `${key}=${value}`;
    this.nodes.push({ kind: 'kv', key, value, raw: line });
    return this;
  }

  /** Set or update a key's value. If key exists, updates its node; otherwise appends at the end. */
  set(key: string, value: string, opts?: { quote?: 'single' | 'double' | 'none' }): this {
    assert(key !== "" && value !== "", "Key and value cannot be empty");
    const quote = opts?.quote ?? 'none';
    let val = value;
    if (quote === 'single') val = `'${value.replace(/'/g, "'\''")}'`;
    if (quote === 'double') val = `"${value.replace(/"/g, '\\"')}"`;

    const existingIdx = this.nodes.findIndex(n => n.kind === 'kv' && (n as EnvKeyValueNode).key === key);
    const raw = `${key}=${val}`;
    if (existingIdx >= 0) {
      const node = this.nodes[existingIdx] as EnvKeyValueNode;
      this.nodes[existingIdx] = { ...node, value: val, raw };
    } else {
      this.nodes.push({ kind: 'kv', key, value: val, raw });
    }
    return this;
  }

  /** Remove a key if present. */
  remove(key: string): this {
    assert(key !== "","Key cannot be empty");
    this.nodes = this.nodes.filter(n => !(n.kind === 'kv' && (n as EnvKeyValueNode).key === key));
    return this;
  }

  /** Serialize nodes back to .env text. */
  toString(): string {
    return this.nodes.map(n => {
        switch (n.kind) {
            case 'comment': return (n as EnvCommentNode).comment;
            case 'kv': return `${(n as EnvKeyValueNode).key}=${(n as EnvKeyValueNode).value}`;
            default: return '';
        }
    }).join(sLineBreak);
  }

  /** Save to a file path. Creates parent directories if needed. */
  save(filePath: string) {
      fs.mkdirSync(require('path').dirname(filePath), {recursive: true});
      fs.writeFileSync(filePath, this.toString(), 'utf-8');
  }
}

export {
    type EnvNode,
    EnvBaseNode, EnvCommentNode, EnvKeyValueNode, EnvBlankNode,
    EnvParser, EnvReader, EnvWriter
}