const { useBlockProps, InspectorControls } = wp.blockEditor;
const {
  PanelBody,
  PanelRow,
  RangeControl,
  SelectControl,
  TextControl,
} = wp.components;
const { __ } = wp.i18n;
const { useState, useEffect } = wp.element;

export default function Edit({ attributes, setAttributes }) {
  const {
    count,
    orderBy,
    categoryId,
    heading,
    paragraph,
    linkText,
    linkUrl,
    linkType,
  } = attributes;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    wp.apiFetch({ path: '/wp/v2/product_cat?per_page=100&orderby=name&order=asc' })
      .then((terms) => setCategories(terms))
      .catch(() => {});
  }, []);

  const blockProps = useBlockProps({
    className: 'sobe-product-carousel-editor',
  });

  const categoryOptions = [
    { label: __('All Categories', 'sobe'), value: 0 },
    ...categories.map((cat) => ({ label: cat.name, value: cat.id })),
  ];

  const orderByOptions = [
    { label: __('Latest', 'sobe'), value: 'latest' },
    { label: __('Featured', 'sobe'), value: 'featured' },
    { label: __('Best Selling', 'sobe'), value: 'best_selling' },
    { label: __('Top Rated', 'sobe'), value: 'top_rated' },
    { label: __('On Sale', 'sobe'), value: 'on_sale' },
    { label: __('Random', 'sobe'), value: 'random' },
  ];

  const linkTypeOptions = [
    { label: __('Button', 'sobe'), value: 'btn-dark' },
    { label: __('Outline Button', 'sobe'), value: 'btn-outline-dark' },
    { label: __('Text Link', 'sobe'), value: 'link-dark' },
  ];

  const orderByLabel =
    orderByOptions.find((option) => option.value === orderBy)?.label ?? 'Latest';
  const catLabel =
    categoryId === 0
      ? __('all categories', 'sobe')
      : categories.find((category) => category.id === categoryId)?.name ??
        `category ${categoryId}`;

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Product Source', 'sobe')} initialOpen={true}>
          <PanelRow>
            <SelectControl
              label={__('Order By', 'sobe')}
              value={orderBy}
              options={orderByOptions}
              onChange={(val) => setAttributes({ orderBy: val })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label={__('Category', 'sobe')}
              value={categoryId}
              options={categoryOptions}
              onChange={(val) => setAttributes({ categoryId: parseInt(val, 10) })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label={__('Number of Products', 'sobe')}
              value={count}
              onChange={(val) =>
                setAttributes({ count: Math.min(Math.max(val ?? 8, 1), 12) })
              }
              min={1}
              max={12}
              __nextHasNoMarginBottom
            />
          </PanelRow>
        </PanelBody>

        <PanelBody title={__('Content', 'sobe')} initialOpen={false}>
          <TextControl
            label={__('Heading', 'sobe')}
            value={heading}
            onChange={(val) => setAttributes({ heading: val })}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
          />
          <div style={{ marginTop: '12px' }}>
            <TextControl
              label={__('Paragraph', 'sobe')}
              value={paragraph}
              onChange={(val) => setAttributes({ paragraph: val })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </div>
          <div style={{ marginTop: '16px', borderTop: '1px solid #e0e0e0', paddingTop: '16px' }}>
            <TextControl
              label={__('Link Label', 'sobe')}
              value={linkText}
              onChange={(val) => setAttributes({ linkText: val })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
            <div style={{ marginTop: '8px' }}>
              <TextControl
                label={__('Link URL', 'sobe')}
                value={linkUrl}
                onChange={(val) => setAttributes({ linkUrl: val })}
                type="url"
                __nextHasNoMarginBottom
                __next40pxDefaultSize
              />
            </div>
            <div style={{ marginTop: '8px' }}>
              <SelectControl
                label={__('Link Style', 'sobe')}
                value={linkType}
                options={linkTypeOptions}
                onChange={(val) => setAttributes({ linkType: val })}
                __nextHasNoMarginBottom
                __next40pxDefaultSize
              />
            </div>
          </div>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {(heading || paragraph || (linkText && linkUrl)) && (
          <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' }}>
            {heading && <p style={{ margin: 0, fontWeight: 700 }}>{heading}</p>}
            {paragraph && <p style={{ margin: '4px 0 0', color: '#64748b' }}>{paragraph}</p>}
            {linkText && linkUrl && <p style={{ margin: '8px 0 0', fontSize: '12px' }}>{linkText}</p>}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ aspectRatio: '1', background: '#f1f5f9' }} />
              <div style={{ padding: '10px' }}>
                <div style={{ height: '9px', background: '#e2e8f0', borderRadius: '3px', marginBottom: '5px' }} />
                <div style={{ height: '9px', background: '#e2e8f0', borderRadius: '3px', width: '65%', marginBottom: '8px' }} />
                <div style={{ fontSize: '12px', fontWeight: 700 }}>€49.00</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: '10px 0 0', fontSize: '11px', color: '#94a3b8', textAlign: 'center' }}>
          {[`${count} products`, orderByLabel, catLabel].filter(Boolean).join(' · ')}
        </p>
      </div>
    </>
  );
}
