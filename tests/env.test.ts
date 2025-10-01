import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { EnvParser, EnvReader, EnvWriter } from '../src/env';

describe('Env utilities (EnvParser, EnvReader, EnvWriter)', () => {
  let tmpDir: string;
  let envFilePath: string;

  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'delphirtl-env-'));
    envFilePath = path.join(tmpDir, '.env');

    const initial = [
      '# sample env',
      'FOO=bar',
      '',
      "QUOTED=' spaced value '",
      'NO_EQUALS', // should be treated as comment by parser
    ].join('\n');

    fs.writeFileSync(envFilePath, initial, 'utf-8');
  ``});

  afterAll(() => {
    try {
      if (fs.existsSync(envFilePath)) fs.unlinkSync(envFilePath);
    } finally {
      if (fs.existsSync(tmpDir)) fs.rmdirSync(tmpDir);
    }
  });

  test('EnvParser preserves lines and kinds', () => {
    const text = fs.readFileSync(envFilePath, 'utf-8');
    const parser = new EnvParser();
    const nodes = parser.parse(text);

    // Expect 5 lines converted to nodes
    expect(nodes.length).toBe(5);
    expect(nodes[0].kind).toBe('comment');
    expect(nodes[1].kind).toBe('kv');
    expect(nodes[2].kind).toBe('blank');
    expect(nodes[3].kind).toBe('kv');
    // Line without '=' becomes comment-like to preserve content
    expect(nodes[4].kind).toBe('comment');
  });

  test('EnvReader reads from path and returns values (raw and unquoted)', () => {
    const reader = new EnvReader(envFilePath, { isPath: true });
    expect(reader.has('FOO')).toBe(true);
    expect(reader.getValue('FOO')).toBe('bar');

    // QUOTED is surrounded by single quotes; getValue should strip quotes
    expect(reader.getValue('QUOTED')).toBe(' spaced value ');
    // Raw should still include quotes
    expect(reader.getValueRaw('QUOTED')).toBe("' spaced value '");

    // Keys listing
    const keys = reader.getKeys();
    expect(keys).toEqual(expect.arrayContaining(['FOO', 'QUOTED']));
  });

  test('EnvWriter append/set/remove and save to file', async () => {
    // Start from the existing file
    const writer = EnvWriter.fromFile(envFilePath);

    // Append a new key and a comment, then set/update existing
    writer.comment('added by test').append('NEW_KEY', 'new_val').set('FOO', 'baz');

    // Quote handling
    const pathVal = 'C\\\\Temp';
    writer.set('JSON', '{"a":1}', { quote: 'double' });
    writer.set('PATHLIKE', pathVal, { quote: 'single' });

    writer.save(envFilePath);

    // Re-read to validate persisted changes
    const reader2 = new EnvReader(envFilePath, { isPath: true });

    expect(reader2.getValue('FOO')).toBe('baz');
    expect(reader2.getValue('NEW_KEY')).toBe('new_val');

    // Quoted retrieval
    expect(reader2.getValue('JSON')).toBe('{\\"a\\":1}');
    expect(reader2.getValueRaw('JSON')).toBe('"{\\"a\\":1}"'); // raw retains double quotes

    expect(reader2.getValue('PATHLIKE')).toBe(pathVal);
    expect(reader2.getValueRaw('PATHLIKE')).toBe(`'${pathVal}'`);

    // Now remove a key and persist again
    const writer2 = EnvWriter.fromFile(envFilePath);
    writer2.remove('NEW_KEY');
    writer2.save(envFilePath);

    const reader3 = new EnvReader(envFilePath, { isPath: true });
    expect(reader3.has('NEW_KEY')).toBe(false);
  });
});
