// All @wordpress/* accessed via wp.* globals — never import from '@wordpress/…'
const {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} = wp.blockEditor;
const {
  PanelBody,
  PanelRow,
  SelectControl,
  ToggleControl,
  Button,
} = wp.components;
const { __, sprintf, _n } = wp.i18n;
const { useState, useEffect } = wp.element;
const { useSelect } = wp.data;

import './editor.scss';

function normalizeItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items
    .map((row) => ({
      termId: parseInt(row.termId, 10) || 0,
      imageId: parseInt(row.imageId, 10) || 0,
    }))
    .filter((r) => r.termId > 0);
}

function CategoryCardEditor({ row, terms, onRemove, onImage, onClearOverride }) {
  const term = terms.find((t) => t.id === row.termId);
  const name = term?.name ?? sprintf(__('Category #%d', 'sobe'), row.termId);
  const count = typeof term?.count === 'number' ? term.count : 0;

  const media = useSelect(
    (select) => {
      if (!row.imageId) {
        return null;
      }
      return select('core').getMedia(row.imageId);
    },
    [row.imageId],
  );

  const wcSrc =
    term && term.image && typeof term.image === 'object' && term.image.src
      ? term.image.src
      : '';
  const overrideSrc =
    row.imageId && media?.source_url ? media.source_url : '';
  const src = overrideSrc || wcSrc;

  return (
    <li className="sobe-product-categories-grid-editor__card">
      <div className="sobe-product-categories-grid-editor__card-media">
        {src ? (
          <img src={src} alt="" />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              fontSize: 12,
              color: 'var(--c-text-subtle)',
            }}
          >
            {__('No image', 'sobe')}
          </div>
        )}
      </div>
      <div className="sobe-product-categories-grid-editor__card-body">
        <p className="sobe-product-categories-grid-editor__card-title">{name}</p>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--c-text-muted)' }}>
          {sprintf(_n('%d product', '%d products', count, 'sobe'), count)}
        </p>
        <div className="sobe-product-categories-grid-editor__card-actions">
          <MediaUploadCheck>
            <MediaUpload
              value={row.imageId || undefined}
              onSelect={onImage}
              allowedTypes={['image']}
              render={({ open }) => (
                <Button variant="secondary" onClick={open} size="small">
                  {row.imageId
                    ? __('Replace image', 'sobe')
                    : __('Override image', 'sobe')}
                </Button>
              )}
            />
          </MediaUploadCheck>
          {row.imageId > 0 && (
            <Button variant="link" isDestructive onClick={onClearOverride} size="small">
              {__('Use category image', 'sobe')}
            </Button>
          )}
          <Button variant="link" isDestructive onClick={onRemove} size="small">
            {__('Remove', 'sobe')}
          </Button>
        </div>
      </div>
    </li>
  );
}

export default function Edit({ attributes, setAttributes }) {
  const { layout, enableHoverEffects, items: rawItems } = attributes;
  const items = normalizeItems(rawItems);

  const [terms, setTerms] = useState([]);

  useEffect(() => {
    wp.apiFetch({
      path: '/wp/v2/product_cat?per_page=100&orderby=name&order=asc&hide_empty=false',
    })
      .then(setTerms)
      .catch(() => setTerms([]));
  }, []);

  const addableTerms = terms.filter((t) => !items.some((i) => i.termId === t.id));

  const blockProps = useBlockProps({
    className: 'sobe-product-categories-grid-editor',
  });

  const layoutOptions = [
    { value: 'bento-alternating', label: __('Bento — alternating heights', 'sobe') },
    { value: 'uniform-2', label: __('Two equal columns', 'sobe') },
    { value: 'columns-4', label: __('Four columns (wide screens)', 'sobe') },
    { value: 'hero-follow', label: __('Hero row + grid', 'sobe') },
    { value: 'split-tall-left', label: __('Tall column + stack', 'sobe') },
    { value: 'stack', label: __('Stacked list', 'sobe') },
  ];

  function addTerm(termId) {
    const id = parseInt(termId, 10);
    if (!id) {
      return;
    }
    setAttributes({
      items: [...items, { termId: id, imageId: 0 }],
    });
  }

  function removeAt(index) {
    setAttributes({
      items: items.filter((_, i) => i !== index),
    });
  }

  function setItemImage(index, media) {
    const next = items.map((row, i) =>
      i === index
        ? { ...row, imageId: media && media.id ? media.id : 0 }
        : row,
    );
    setAttributes({ items: next });
  }

  function clearOverride(index) {
    setItemImage(index, null);
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Layout', 'sobe')} initialOpen={true}>
          <PanelRow>
            <SelectControl
              label={__('Grid layout', 'sobe')}
              value={layout}
              options={layoutOptions}
              onChange={(val) => setAttributes({ layout: val })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label={__('Hover zoom & darken', 'sobe')}
              checked={enableHoverEffects}
              onChange={(val) => setAttributes({ enableHoverEffects: val })}
              __nextHasNoMarginBottom
            />
          </PanelRow>
        </PanelBody>
        <PanelBody title={__('Categories', 'sobe')} initialOpen={true}>
          <PanelRow>
            <SelectControl
              key={`add-cat-${items.length}`}
              label={__('Add category', 'sobe')}
              value=""
              options={[
                { label: __('— Choose —', 'sobe'), value: '' },
                ...addableTerms.map((t) => ({ label: t.name, value: String(t.id) })),
              ]}
              onChange={addTerm}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          </PanelRow>
          {addableTerms.length === 0 && terms.length > 0 && (
            <p className="components-base-control__help" style={{ marginTop: 8 }}>
              {__('All loaded categories are already in the grid.', 'sobe')}
            </p>
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {items.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--c-text-muted)' }}>
            {__('Add product categories from the sidebar.', 'sobe')}
          </p>
        ) : (
          <ul className="sobe-product-categories-grid-editor__cards">
            {items.map((row, index) => (
              <CategoryCardEditor
                key={`${row.termId}-${index}`}
                row={row}
                terms={terms}
                onRemove={() => removeAt(index)}
                onImage={(media) => setItemImage(index, media)}
                onClearOverride={() => clearOverride(index)}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
