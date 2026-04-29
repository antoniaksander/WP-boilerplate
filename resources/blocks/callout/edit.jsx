// Access WordPress packages through global variables — do NOT use "import from '@wordpress/...'"
const { useBlockProps, InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow, TextControl, SelectControl, ToggleControl } =
  wp.components;
const { __ } = wp.i18n;

// Local styles only for the editor
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const { heading, layout, showCta, ctaText, ctaUrl } = attributes;
  const blockProps = useBlockProps();

  return (
    <>
      {/* The sidebar settings panel */}
      <InspectorControls>
        <PanelBody title={__('Content', 'sage')} initialOpen={true}>
          <PanelRow>
            <TextControl
              label={__('Heading', 'sage')}
              value={heading ?? ''}
              onChange={(val) => setAttributes({ heading: val })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label={__('Show CTA Button', 'sage')}
              checked={showCta}
              onChange={(val) => setAttributes({ showCta: val })}
              __nextHasNoMarginBottom
            />
          </PanelRow>
          {showCta && (
            <>
              <PanelRow>
                <TextControl
                  label={__('CTA Text', 'sage')}
                  help={__('Text shown on the button.', 'sage')}
                  value={ctaText}
                  onChange={(val) => setAttributes({ ctaText: val })}
                  placeholder={__('Get started', 'sage')}
                  __nextHasNoMarginBottom
                  __next40pxDefaultSize
                />
              </PanelRow>
              <PanelRow>
                <TextControl
                  label={__('CTA URL', 'sage')}
                  help={__('Include https:// for external links.', 'sage')}
                  value={ctaUrl ?? ''}
                  onChange={(val) => setAttributes({ ctaUrl: val })}
                  type="url"
                  placeholder="https://"
                  __nextHasNoMarginBottom
                  __next40pxDefaultSize
                />
              </PanelRow>
            </>
          )}
        </PanelBody>

        <PanelBody title={__('Extra Settings', 'sage')} initialOpen={false}>
          <PanelRow>
            <SelectControl
              label={__('Layout', 'sage')}
              value={layout}
              options={[
                { label: __('Standard', 'sage'), value: 'standard' },
                { label: __('Wide', 'sage'), value: 'wide' },
              ]}
              onChange={(val) => setAttributes({ layout: val })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      {/* What the editor canvas shows (a rough preview) */}
      <div {...blockProps}>
        <h2>{heading || __('Your heading here…', 'sage')}</h2>
        {showCta && ctaText && <a href={ctaUrl || '#'}>{ctaText}</a>}
      </div>
    </>
  );
}
