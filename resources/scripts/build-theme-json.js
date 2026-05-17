import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const themeJsonPath = path.join(rootDir, 'public/build/assets/theme.json');
const tokensPath = path.join(rootDir, 'resources/css/tokens.css');
const packageJsonPath = path.join(rootDir, 'package.json');

function readPackageConfig() {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return packageJson.wpBoilerplate ?? {};
}

function normalizeOverridePaths(value) {
  if (!value) return [];
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.filter((item) => typeof item === 'string');
  return [];
}

function resolveTokenSources() {
  const config = readPackageConfig();
  const overridePaths = normalizeOverridePaths(config.themeJsonTokenOverrides);
  const sources = [{ label: 'platform tokens', path: tokensPath, isOverride: false }];

  for (const overridePath of overridePaths) {
    const resolvedPath = path.isAbsolute(overridePath)
      ? overridePath
      : path.join(rootDir, overridePath);

    if (fs.existsSync(resolvedPath)) {
      sources.push({
        label: overridePath,
        path: resolvedPath,
        isOverride: true,
      });
    }
  }

  return sources;
}

function parseRootTokens(css) {
  const tokens = new Map();
  const rootBlockMatches = [...css.matchAll(/:root\s*{([^}]*)}/gs)];
  const rootBlocks = rootBlockMatches.length > 0 ? rootBlockMatches.map((match) => match[1]) : [css];

  for (const rootBlock of rootBlocks) {
    const declarationMatches = rootBlock.matchAll(/(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g);

    for (const match of declarationMatches) {
      tokens.set(match[1], match[2].trim());
    }
  }

  return tokens;
}

function readTokenSource(source) {
  return {
    ...source,
    tokens: parseRootTokens(fs.readFileSync(source.path, 'utf8')),
  };
}

function mergeTokenSources(sources) {
  const merged = new Map();

  for (const source of sources) {
    for (const [token, value] of source.tokens.entries()) {
      merged.set(token, value);
    }
  }

  return merged;
}

const tokenSources = resolveTokenSources().map(readTokenSource);
const tokens = mergeTokenSources(tokenSources);
const overrideTokens = mergeTokenSources(tokenSources.filter((source) => source.isOverride));

const extractColor = (token) => {
  const value = tokens.get(token);
  return value && /^(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))$/.test(value) ? value : null;
};

const extractToken = (token) => {
  return tokens.get(token) ?? null;
};

const extractOverrideToken = (token) => overrideTokens.get(token) ?? null;

// Curated editor palette mapping
const paletteMapping = [
  { name: 'Background', slug: 'background', token: '--c-background' },
  { name: 'Surface Dark', slug: 'surface-invert', token: '--c-surface-invert' },
  { name: 'Heading', slug: 'heading', token: '--c-heading' },
  { name: 'Text Muted', slug: 'text-muted', token: '--c-text-muted' },
  { name: 'Text Subtle', slug: 'text-subtle', token: '--c-text-subtle' },
  {
    name: 'Text Inverse',
    slug: 'surface-invert-fg',
    token: '--c-surface-invert-fg',
  },
  { name: 'Accent', slug: 'accent', token: '--c-accent' },
  { name: 'Border', slug: 'border', token: '--c-border' },
  { name: 'White', slug: 'accent-fg', token: '--c-accent-fg' },
];

const editorPalette = paletteMapping.reduce((acc, item) => {
  const colorValue = extractColor(item.token);
  if (colorValue)
    acc.push({ name: item.name, slug: item.slug, color: colorValue });
  return acc;
}, []);

const editorFontSizes = [
  { name: 'XS', slug: 'xs', size: 'var(--font-size-xs)' },
  { name: 'SM', slug: 'sm', size: 'var(--font-size-sm)' },
  { name: 'Base', slug: 'base', size: 'var(--font-size-base)' },
  { name: 'LG', slug: 'lg', size: 'var(--font-size-lg)' },
  { name: 'XL', slug: 'xl', size: 'var(--font-size-xl)' },
  { name: '2XL', slug: '2xl', size: 'var(--font-size-2xl)' },
  { name: '3XL', slug: '3xl', size: 'var(--font-size-3xl)' },
  { name: '4XL', slug: '4xl', size: 'var(--font-size-4xl)' },
  { name: '5XL', slug: '5xl', size: 'var(--font-size-5xl)' },
  { name: '6XL', slug: '6xl', size: 'var(--font-size-6xl)' },
  { name: '7XL', slug: '7xl', size: 'var(--font-size-7xl)' },
];

const editorFontDefaults = {
  sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", serif',
  mono: 'ui-monospace, "Cascadia Code", "Fira Code", Consolas, monospace',
};

const editorFonts = [
  {
    name: 'Sans',
    slug: 'sans',
    fontFamily:
      extractOverrideToken('--editor-font-sans') ??
      extractOverrideToken('--font-sans') ??
      editorFontDefaults.sans,
  },
  {
    name: 'Serif',
    slug: 'serif',
    fontFamily:
      extractOverrideToken('--editor-font-serif') ??
      extractOverrideToken('--font-serif') ??
      editorFontDefaults.serif,
  },
  {
    name: 'Mono',
    slug: 'mono',
    fontFamily:
      extractOverrideToken('--editor-font-mono') ??
      extractOverrideToken('--font-mono') ??
      editorFontDefaults.mono,
  },
];

function injectEditorSettings(themeJson) {
  if (!themeJson.settings) themeJson.settings = {};
  if (!themeJson.settings.color) themeJson.settings.color = {};
  if (!themeJson.settings.typography) themeJson.settings.typography = {};

  themeJson.settings.color.palette = editorPalette;
  themeJson.settings.color.custom = false;
  themeJson.settings.typography.fontSizes = editorFontSizes;
  themeJson.settings.typography.fontFamilies = editorFonts;
  themeJson.settings.layout = {
    ...(themeJson.settings.layout ?? {}),
    contentSize: extractToken('--layout-content') ?? '72rem',
    wideSize: extractToken('--layout-wide') ?? '90rem',
  };
  themeJson.settings.custom = {
    ...(themeJson.settings.custom ?? {}),
    layout: {
      content: extractToken('--layout-content') ?? '72rem',
      wide: extractToken('--layout-wide') ?? '90rem',
      standard: extractToken('--layout-standard') ?? '90rem',
      grid: extractToken('--layout-grid') ?? '96rem',
      reading: extractToken('--layout-reading') ?? '60rem',
    },
  };

  return themeJson;
}

try {
  const themeJsonContent = fs.readFileSync(themeJsonPath, 'utf-8');
  const themeJson = JSON.parse(themeJsonContent);
  const merged = injectEditorSettings(themeJson);

  fs.writeFileSync(themeJsonPath, JSON.stringify(merged, null, 2) + '\n');

  console.log(`Injected editor settings into theme.json`);
  console.log(`   Token sources: ${tokenSources.length}`);
  console.log(`   Colors: ${editorPalette.length}`);
  console.log(`   Font sizes: ${editorFontSizes.length}`);
  console.log(`   Font families: ${editorFonts.length}`);
} catch (err) {
  console.error(`Failed to inject editor settings: ${err.message}`);
  process.exit(1);
}
