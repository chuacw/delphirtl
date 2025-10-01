import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { TIniFile, TMemIniFile } from '../src/inifiles';

describe('TIniFile', () => {
  let tmpDir: string;
  let iniPath: string;

  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'delphirtl-ini-'));
    iniPath = path.join(tmpDir, 'test.ini');

    const initial = [
      'rootKey=rootVal',
      '',
      '[General]',
      'Name=Delphi',
      '',
      '[Numbers]',
      'Int=42',
      'Float=3.14',
      'BoolTrue=Yes',
      'BoolFalse=No',
      '',
      '[Nested]',
      'ParentOnly=1',
      '',
      '[Nested.Child]',
      'Key=Val',
      '',
      '[Binary]',
      'Data=48656c6c6f' // "Hello" in hex
    ].join('\n');

    fs.writeFileSync(iniPath, initial, 'utf-8');
  });

  afterAll(() => {
    try {
      if (fs.existsSync(iniPath)) fs.unlinkSync(iniPath);
    } finally {
      if (fs.existsSync(tmpDir)) fs.rmdirSync(tmpDir);
    }
  });

  test('basic existence and reading defaults', () => {
    const ini = new TIniFile(iniPath);

    expect(ini.SectionExists('General')).toBe(true);
    expect(ini.SectionExists('Missing')).toBe(false);

    expect(ini.ValueExists('General', 'Name')).toBe(true);
    expect(ini.ValueExists('General', 'Nope')).toBe(false);

    expect(ini.ReadString('General', 'Name', 'def')).toBe('Delphi');
    expect(ini.ReadString('General', 'Missing', 'def')).toBe('def');

    expect(ini.ReadInteger('Numbers', 'Int', 7)).toBe(42);
    // Non-number should fallback to default
    expect(ini.ReadInteger('General', 'Name', 7)).toBe(7);

    expect(ini.ReadBool('Numbers', 'BoolTrue', false)).toBe(true);
    expect(ini.ReadBool('Numbers', 'BoolFalse', true)).toBe(false);

    expect(ini.ReadFloat('Numbers', 'Float', 1.5)).toBeCloseTo(3.14, 6);
  });

  test('write and read string/int/bool/float', () => {
    const ini = new TIniFile(iniPath);

    ini.WriteString('General', 'Lang', 'TypeScript');
    ini.WriteInteger('Numbers', 'Int', 100);
    ini.WriteInt64('Numbers', 'Big', 9007199254740991); // Max safe int
    ini.WriteBool('Numbers', 'Enabled', true);
    ini.WriteFloat('Numbers', 'E', 2.71828);

    expect(ini.ReadString('General', 'Lang', '')).toBe('TypeScript');
    expect(ini.ReadInteger('Numbers', 'Int', 0)).toBe(100);
    expect(ini.ReadInt64('Numbers', 'Big', 0)).toBe(9007199254740991);
    expect(ini.ReadBool('Numbers', 'Enabled', false)).toBe(true);
    expect(ini.ReadFloat('Numbers', 'E', 0)).toBeCloseTo(2.71828, 6);
  });

  test('date/time read and write roundtrip', () => {
    const ini = new TIniFile(iniPath);
    const d = new Date('2021-05-06T07:08:09.123Z');

    ini.WriteDate('General', 'When', d);
    ini.WriteTime('General', 'WhenTime', d);
    ini.WriteDateTime('General', 'WhenDT', d);

    const r1 = ini.ReadDate('General', 'When', new Date(0));
    const r2 = ini.ReadTime('General', 'WhenTime', new Date(0));
    const r3 = ini.ReadDateTime('General', 'WhenDT', new Date(0));

    expect(r1.toISOString()).toBe(d.toISOString());
    expect(r2.toISOString()).toBe(d.toISOString());
    expect(r3.toISOString()).toBe(d.toISOString());

    // Invalid date falls back to default
    const def = new Date('2000-01-01T00:00:00.000Z');
    expect(ini.ReadDate('General', 'NoSuch', def).toISOString()).toBe(def.toISOString());
  });

  test('binary read/write using hex payload', () => {
    const ini = new TIniFile(iniPath);

    // Read existing hex for "Hello"
    const chunks: Buffer[] = [];
    const receiver = { write: (b: Buffer) => { chunks.push(b); } };
    const len = ini.ReadBinaryStream('Binary', 'Data', receiver);
    expect(len).toBe(5);
    expect(Buffer.concat(chunks).toString('utf-8')).toBe('Hello');

    // Write new binary
    const buf = Buffer.from('Bye', 'utf-8');
    ini.WriteBinaryStream('Binary', 'Data', buf);

    const chunks2: Buffer[] = [];
    const receiver2 = { write: (b: Buffer) => { chunks2.push(b); } };
    const len2 = ini.ReadBinaryStream('Binary', 'Data', receiver2);
    expect(len2).toBe(3);
    expect(Buffer.concat(chunks2).equals(buf)).toBe(true);
  });

  test('ReadSection and ReadSectionValues', () => {
    const ini = new TIniFile(iniPath);

    const keys: string[] = [];
    ini.ReadSection('General', keys);
    expect(keys).toEqual(expect.arrayContaining(['Name', 'Lang', 'When', 'WhenTime', 'WhenDT']));

    const pairs: string[] = [];
    ini.ReadSectionValues('Numbers', pairs);
    // Contains Int, Float, Enabled, Big, E (order not enforced)
    expect(pairs).toEqual(expect.arrayContaining([
      expect.stringMatching(/^Int=\d+/),
      expect.stringMatching(/^Float=.+/),
      expect.stringMatching(/^Enabled=.+/),
      expect.stringMatching(/^Big=\d+/),
      expect.stringMatching(/^E=.+/),
    ]));
  });

  test('ReadSubSections with and without recursion', () => {
    const ini = new TIniFile(iniPath);

    const top: string[] = [];
    ini.ReadSubSections('', top, false);
    expect(top).toEqual(expect.arrayContaining(['General', 'Numbers', 'Nested', 'Binary']));

    const subs: string[] = [];
    ini.ReadSubSections('Nested', subs, false);
    expect(subs).toEqual(expect.arrayContaining(['Child']));

    const subsR: string[] = [];
    ini.ReadSubSections('Nested', subsR, true);
    // With recursion, direct child name includes full remainder
    expect(subsR).toEqual(expect.arrayContaining(['Child']));
  });

  test('DeleteKey and EraseSection', () => {
    const ini = new TIniFile(iniPath);

    ini.DeleteKey('General', 'Lang');
    expect(ini.ValueExists('General', 'Lang')).toBe(false);

    ini.EraseSection('Binary');
    expect(ini.SectionExists('Binary')).toBe(false);
  });

  test('UpdateFile persists and reload works', () => {
    const ini = new TIniFile(iniPath);

    ini.WriteString('Persist', 'A', '1');
    ini.WriteInteger('Persist', 'B', 2);
    ini.UpdateFile();

    // New instance should read from disk
    const ini2 = new TIniFile(iniPath);
    expect(ini2.ReadString('Persist', 'A', '')).toBe('1');
    expect(ini2.ReadInteger('Persist', 'B', 0)).toBe(2);
  });

  // Additional test to ensure Date-only values are covered explicitly
  test('date-only string ReadDate parsing', () => {
    const ini = new TIniFile(iniPath);

    // Simulate an external date-only value (YYYY-MM-DD)
    ini.WriteString('General', 'DateOnly', '2025-09-30');
    const parsed = ini.ReadDate('General', 'DateOnly', new Date(0));
    expect(parsed.toISOString()).toBe('2025-09-30T00:00:00.000Z');

    // Roundtrip a date that has no time component using WriteDate/ReadDate
    const d2 = new Date('1999-12-31T00:00:00.000Z');
    ini.WriteDate('General', 'OnlyDate2', d2);
    const r2 = ini.ReadDate('General', 'OnlyDate2', new Date(0));
    expect(r2.toISOString()).toBe(d2.toISOString());
  });
});

describe('TMemIniFile (in-memory only)', () => {
    let tmpDir: string;
    let iniPath: string;

    beforeAll(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'delphirtl-memini-'));
        iniPath = path.join(tmpDir, 'disk.ini');
        if (fs.existsSync(iniPath)) fs.unlinkSync(iniPath);
    });

    afterAll(() => {
        try {
            if (fs.existsSync(iniPath)) fs.unlinkSync(iniPath);
        } finally {
            if (fs.existsSync(tmpDir)) fs.rmdirSync(tmpDir);
        }
    });

    test('basic write/read without touching disk', () => {
        const mem = new TMemIniFile();

        mem.WriteString('General', 'Name', 'Mem');
        mem.WriteInteger('Numbers', 'Int', 123);
        mem.WriteBool('Flags', 'Enabled', true);
        mem.WriteFloat('Numbers', 'Pi', 3.14159);

        const d = new Date('2022-02-02T02:02:02.000Z');
        mem.WriteDate('Dates', 'D', d);
        mem.WriteTime('Dates', 'T', d);
        mem.WriteDateTime('Dates', 'DT', d);

        const buf = Buffer.from('abc', 'utf-8');
        mem.WriteBinaryStream('Bin', 'B', buf);

        expect(mem.ReadString('General', 'Name', '')).toBe('Mem');
        expect(mem.ReadInteger('Numbers', 'Int', 0)).toBe(123);
        expect(mem.ReadBool('Flags', 'Enabled', false)).toBe(true);
        expect(mem.ReadFloat('Numbers', 'Pi', 0)).toBeCloseTo(3.14159, 6);

        expect(mem.ReadDate('Dates', 'D', new Date(0)).toISOString()).toBe(d.toISOString());
        expect(mem.ReadTime('Dates', 'T', new Date(0)).toISOString()).toBe(d.toISOString());
        expect(mem.ReadDateTime('Dates', 'DT', new Date(0)).toISOString()).toBe(d.toISOString());

        const chunks: Buffer[] = [];
        const receiver = { write: (b: Buffer) => chunks.push(b) };
        const len = mem.ReadBinaryStream('Bin', 'B', receiver);
        expect(len).toBe(3);
        expect(Buffer.concat(chunks).equals(buf)).toBe(true);

        // Ensure UpdateFile does nothing on disk
        mem.UpdateFile();
        expect(fs.existsSync(iniPath)).toBe(false);
    });

    test('EraseSection and DeleteKey operate in-memory only', () => {
        const mem = new TMemIniFile();
        mem.WriteString('S', 'A', '1');
        mem.WriteString('S', 'B', '2');
        mem.WriteString('T', 'X', 'y');

        mem.DeleteKey('S', 'A');
        expect(mem.ValueExists('S', 'A')).toBe(false);
        expect(mem.ValueExists('S', 'B')).toBe(true);

        mem.EraseSection('T');
        expect(mem.SectionExists('T')).toBe(false);
    });

    test('TMemIniFile changes are not visible to TIniFile on disk', () => {
        // Prepare a disk INI with known content
        const initial = ['[Persist]', 'A=1', 'B=2'].join('\n');
        fs.writeFileSync(iniPath, initial, 'utf-8');

        const mem = new TMemIniFile();
        mem.WriteString('Persist', 'A', '999');
        mem.UpdateFile();
        const memValue = mem.ReadString('Persist', 'A', '');
        expect(memValue).toBe('999');

        // Disk content should remain unchanged
        const ini = new TIniFile(iniPath);
        expect(ini.ReadString('Persist', 'A', '')).toBe('1');
        expect(ini.ReadString('Persist', 'B', '')).toBe('2');
    });
});
