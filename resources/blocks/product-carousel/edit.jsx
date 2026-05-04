const { useBlockProps, InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow, RangeControl, SelectControl } = wp.components;
const { __ } = wp.i18n;
const { useState, useEffect } = wp.element;

export default function Edit({ attributes, setAttributes }) {
  const { count, categoryId } = attributes;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch WooCommerce categories
    wp.apiFetch({
      path: '/wp/v2/product_cat?per_page=100&orderby=name&order=asc',
    })
      .then((terms) => setCategories(terms))
      .catch(() => {});
  }, []);

  const blockProps = useBlockProps({
    className: 'sobe-product-carousel-editor',
  });

  const categoryOptions = [
    { label: __('All Products', 'sage'), value: 0 },
    ...categories.map((cat) => ({ label: cat.name, value: cat.id })),
  ];

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Carousel Settings', 'sage')} initialOpen={true}>
          <PanelRow>
            <RangeControl
              label={__('Number of Products', 'sage')}
              value={count}
              onChange={(val) => setAttributes({ count: val })}
              min={3}
              max={16}
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label={__('Product Category', 'sage')}
              value={categoryId}
              options={categoryOptions}
              onChange={(val) =>
                setAttributes({ categoryId: parseInt(val, 10) })
              }
              __nextHasNoMarginBottom
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div
          style={{
            padding: '3rem',
            background: '#f8f9fa',
            border: '2px dashed #cbd5e1',
            textAlign: 'center',
            borderRadius: '0.5rem',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a' }}>
            {__('🛍️ Product Carousel', 'sage')}
          </h3>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
            {categoryId === 0
              ? `Showing ${count} latest products.`
              : `Showing ${count} products from selected category.`}
          </p>
        </div>
      </div>
    </>
  );
}
