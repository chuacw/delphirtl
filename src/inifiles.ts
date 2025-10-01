import {EnvParser, EnvReader} from "./env";
import fs from "fs";
import path from "path";
import {sLineBreak} from "./rtl";

/**
 * TCustomIniFile: An INI reader/writer compatible with Delphi-like API.
 * Implements sections [Section] and key=value pairs. Uses EnvReader to parse existing files.
 */
class TCustomIniFile extends EnvParser {

    // Maintain order
    protected sectionOrder: string[] = [];
    protected data: Map<string, Map<string, string>> = new Map();

    constructor() {
        super();
    }

    destroy() {
        this.save();
        super.destroy();
    }

    protected ensureSection(name: string): Map<string, string> {
        if (!this.data.has(name)) {
            this.data.set(name, new Map());
            this.sectionOrder.push(name);
        }
        return this.data.get(name)!;
    }

    SectionExists(Section: string): boolean {
        return this.data.has(Section);
    }

    ValueExists(Section: string, Key: string): boolean {
        return this.data.get(Section)?.has(Key) ?? false;
    }

    ReadString(Section: string, Key: string, Default: string): string {
        const v = this.data.get(Section)?.get(Key);
        return (v === undefined) ? Default : v;
    }

    WriteString(Section: string, Key: string, Value: string): void {
        const map = this.ensureSection(Section);
        // Set the value regardless of prior existence; Map#set updates or inserts.
        map.set(Key, Value);
        // Persist immediately so subsequent instances see the change
        this.save();
    }

    ReadInteger(Section: string, Key: string, Default: number): number {
        const s = this.data.get(Section)?.get(Key);
        if (s === undefined || s === '') return Default;
        const n = parseInt(s, 10);
        return Number.isNaN(n) ? Default : n;
    }

    WriteInteger(Section: string, Key: string, Value: number): void {
        this.WriteString(Section, Key, String(Value));
    }

    ReadInt64(Section: string, Key: string, Default: number): number {
        // In JS, safe integer range applies; still parse as base 10
        const s = this.data.get(Section)?.get(Key);
        if (s === undefined || s === '') return Default;
        const n = Number(s);
        return Number.isFinite(n) ? Math.trunc(n) : Default;
    }

    WriteInt64(Section: string, Key: string, Value: number): void {
        this.WriteString(Section, Key, String(Math.trunc(Value)));
    }

    ReadBool(Section: string, Key: string, Default: boolean): boolean {
        const s = this.data.get(Section)?.get(Key);
        if (s === undefined) return Default;
        const val = s.trim().toLowerCase();
        if (val === 'true' || val === '1' || val === 'yes' || val === 'y' || val === 'on') return true;
        if (val === 'false' || val === '0' || val === 'no' || val === 'n' || val === 'off') return false;
        return Default;
    }

    WriteBool(Section: string, Key: string, Value: boolean): void {
        this.WriteString(Section, Key, Value ? 'True' : 'False');
    }

    ReadFloat(Section: string, Key: string, Default: number): number {
        const s = this.data.get(Section)?.get(Key);
        if (s === undefined || s === '') return Default;
        const n = Number(s);
        return Number.isFinite(n) ? n : Default;
    }

    WriteFloat(Section: string, Key: string, Value: number): void {
        this.WriteString(Section, Key, String(Value));
    }

    private encodeDate(d: Date): string {
        // ISO 8601 without milliseconds for stability
        return d.toISOString();
    }

    private decodeDate(s: string, def: Date): Date {
        const t = Date.parse(s);
        return Number.isNaN(t) ? def : new Date(t);
    }

    ReadDate(Section: string, Key: string, Default: Date): Date {
        const s = this.data.get(Section)?.get(Key);
        if (!s) return Default;
        return this.decodeDate(s, Default);
    }

    ReadTime(Section: string, Key: string, Default: Date): Date {
        return this.ReadDate(Section, Key, Default);
    }

    ReadDateTime(Section: string, Key: string, Default: Date): Date {
        return this.ReadDate(Section, Key, Default);
    }

    WriteDate(Section: string, Key: string, Value: Date): void {
        this.WriteString(Section, Key, this.encodeDate(Value));
    }

    WriteTime(Section: string, Key: string, Value: Date): void {
        this.WriteDate(Section, Key, Value);
    }

    WriteDateTime(Section: string, Key: string, Value: Date): void {
        this.WriteDate(Section, Key, Value);
    }

    private hexToBuffer(hex: string): Buffer {
        const clean = hex.replace(/\s+/g, '');
        if (clean.length % 2 === 1) return Buffer.from(clean.slice(0, -1), 'hex');
        return Buffer.from(clean, 'hex');
    }

    private bufferToHex(buf: Buffer): string {
        return buf.toString('hex');
    }

    ReadBinaryStream(Section: string, Key: string, stream: any): number {
        const s = this.data.get(Section)?.get(Key);
        if (!s) return 0;
        const buf = this.hexToBuffer(s);
        if (stream && typeof stream.write === 'function') {
            stream.write(buf);
        }
        return buf.length;
    }

    WriteBinaryStream(Section: string, Key: string, stream: any): void {
        let buf: Buffer;
        if (Buffer.isBuffer(stream)) buf = stream as Buffer; else if (stream && typeof stream.read === 'function') {
            // try to read all
            const chunks: Buffer[] = [];
            let chunk: Buffer;
            while ((chunk = stream.read()) !== null) {
                chunks.push(chunk);
            }
            buf = Buffer.concat(chunks);
        } else if (typeof stream === 'string') {
            buf = Buffer.from(stream, 'utf-8');
        } else {
            buf = Buffer.from([]);
        }
        const hex = this.bufferToHex(buf);
        this.WriteString(Section, Key, hex);
    }

    ReadSection(Section: string, Strings: string[]): void {
        Strings.length = 0;
        const m = this.data.get(Section);
        if (!m) return;
        for (const k of m.keys()) Strings.push(k);
    }

    ReadSectionValues(Section: string, Strings: string[]): void {
        Strings.length = 0;
        const m = this.data.get(Section);
        if (!m) return;
        for (const [k, v] of m.entries()) Strings.push(`${k}=${v}`);
    }

    ReadSubSections(Section: string, Strings: string[], Recurse: boolean = false): void {
        Strings.length = 0;
        const prefix = Section ? Section + '.' : '';
        const set = new Set<string>();
        for (const s of this.sectionOrder) {
            if (!s.startsWith(prefix) || s === Section) continue;
            const rest = s.substring(prefix.length);
            const firstDot = rest.indexOf('.');
            if (!Recurse) {
                const ss = (firstDot >= 0 ? rest.substring(0, firstDot) : rest);
                set.add(ss);
            } else {
                set.add(rest);
            }
        }
        for (const v of set.values()) Strings.push(v);
    }

    EraseSection(Section: string): void {
        if (!this.data.has(Section)) return;
        this.data.delete(Section);
        this.sectionOrder = this.sectionOrder.filter(s => s !== Section);
        this.save();
    }

    DeleteKey(Section: string, Key: string): void {
        const m = this.data.get(Section);
        if (!m) return;
        m.delete(Key);
        this.save();
    }

    // Methods to be overridden in descendants

    protected load() {
        // no disk interaction for memory-only version
    }

    protected save() {
        // no-op: do not write to disk
    }

    UpdateFile(): void {
      // no-op: nothing to persist
    }
}

class TIniFile extends TCustomIniFile {
    public FileName: string;

    constructor(fileName: string) {
        super();
        this.FileName = fileName;
        this.load();
    }

    protected load() {
        if (!this.FileName) return;
        if (!fs.existsSync(this.FileName)) {
            // initialize empty
            this.sectionOrder = [];
            this.data.clear();
            return;
        }
        const text = fs.readFileSync(this.FileName, 'utf-8');
        // Use EnvReader to get line nodes, then interpret [Section] lines and kv lines
        const reader = new EnvReader(text);
        const nodes = reader.getAllNodes();
        this.sectionOrder = [];
        this.data.clear();
        let currentSection = '';
        for (const n of nodes as any[]) {
            switch (n.kind) {
                case 'comment': {
                    const raw = n.raw;
                    const line = raw.trim();
                    // noinspection RegExpRedundantEscape
                    const m = /^\[([^\]\[\r\n]*)\]$/.exec(line);
                    if (m) {
                        currentSection = m[1];
                        this.ensureSection(currentSection);
                    }
                    break;
                }
                case 'kv': {
                    const kv = n;
                    const key = kv.key.trim();
                    // values are verbatim in kv.value
                    let value = kv.value;
                    // Trim surrounding whitespace and possible quotes similar to EnvReader.getValue
                    const trimmed = value.trim();
                    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
                        value = trimmed.slice(1, -1);
                    } else {
                        value = trimmed;
                    }
                    const sect = currentSection || '';
                    const map = this.ensureSection(sect);
                    map.set(key, value);
                    break;
                }
                default: {
                    // blank lines ignored
                }
            }
        }
    }

    protected save() {
        // Reconstruct INI content with sections in stored order
        const lines: string[] = [];
        for (const sect of this.sectionOrder) {
            // Write section header (empty section means no header)
            if (sect) {
                lines.push(`[${sect}]`);
            }
            const kv = this.data.get(sect);
            if (kv) {
                for (const [k, v] of kv.entries()) {
                    lines.push(`${k}=${v}`);
                }
            }
            // blank line between sections
            if (sect !== this.sectionOrder[this.sectionOrder.length - 1]) {
                lines.push('');
            }
        }
        const out = lines.join(sLineBreak);
        fs.mkdirSync(path.dirname(this.FileName), {recursive: true});
        fs.writeFileSync(this.FileName, out, 'utf-8');
    }

    UpdateFile(): void {
        this.save();
    }

}

class TMemIniFile extends TCustomIniFile {}

export { TIniFile, TMemIniFile };