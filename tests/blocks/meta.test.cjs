/**
 * Block metadata tests.
 * Validates block.json for every path in blocks-manifest.json.
 */

const { readFileSync, existsSync } = require('node:fs');
const { resolve, join } = require('node:path');

const ROOT = resolve(__dirname, '../..');
const manifest = JSON.parse(readFileSync(join(ROOT, 'resources/blocks/blocks-manifest.json'), 'utf8'));
const blockPaths = Object.keys(manifest);

function expectedBlockName(blockPath, entry) {
  return entry.name ?? blockPath;
}

describe('block manifest schema', () => {
  test('defaults block names to the manifest path', () => {
    expect(expectedBlockName('sobe/hero', { category: 'sobe-general' })).toBe('sobe/hero');
  });

  test('supports explicit client namespace block names', () => {
    expect(expectedBlockName('roxder/cta-banner', { name: 'roxder/cta-banner', category: 'roxder' })).toBe(
      'roxder/cta-banner',
    );
  });
});

describe.each(blockPaths)('block "%s" — block.json', (blockPath) => {
  let meta;
  const manifestEntry = manifest[blockPath];

  beforeAll(() => {
    const blockJsonPath = join(ROOT, `resources/blocks/${blockPath}/block.json`);
    expect(existsSync(blockJsonPath)).toBe(true);
    meta = JSON.parse(readFileSync(blockJsonPath, 'utf8'));
  });

  test('name matches manifest name or default path name', () => {
    expect(meta.name).toBe(expectedBlockName(blockPath, manifestEntry));
  });

  test('apiVersion is 3', () => {
    expect(meta.apiVersion).toBe(3);
  });

  test('supports.html is false', () => {
    expect(meta.supports?.html).toBe(false);
  });

  test('category matches manifest', () => {
    expect(meta.category).toBe(manifestEntry.category);
  });

  test('manifest schema is valid', () => {
    expect(blockPath).toMatch(/^[a-z0-9_-]+\/[a-z0-9_-]+$/);
    expect(typeof manifestEntry.category).toBe('string');
    expect(manifestEntry.category.length).toBeGreaterThan(0);

    if (manifestEntry.name !== undefined) {
      expect(typeof manifestEntry.name).toBe('string');
      expect(manifestEntry.name).toMatch(/^[a-z0-9_-]+\/[a-z0-9_-]+$/);
      expect(manifestEntry.name).toBe(meta.name);
    }
  });
});
