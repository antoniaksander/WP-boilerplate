const {
  useBlockProps,
  InspectorControls,
  RichText,
  MediaUpload,
  MediaUploadCheck,
} = wp.blockEditor;
const {
  PanelBody,
  PanelRow,
  TextControl,
  SelectControl,
  ToggleControl,
  Button,
} = wp.components;
const { __ } = wp.i18n;

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const {
    heading,
    paragraph,
    ctaText,
    ctaUrl,
    ctaType,
    alignment,
    height,
    backgroundImageId,
    backgroundImageUrl,
    darkOverlay,
  } = attributes;

  const blockProps = useBlockProps({
    className: 'sobe-hero',
    style: {
      minHeight: height ?? '80vh',
      backgroundImage: backgroundImageUrl
        ? `url(${backgroundImageUrl})`
        : 'linear-gradient(135deg, #111827 0%, #334155 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
    },
  });

  const centered = alignment === 'center';
  const editorial = alignment === 'editorial';
  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: centered ? '48rem' : '54rem',
    margin: centered ? '0 auto' : undefined,
    padding: '5rem 2rem',
    color: '#fff',
    textAlign: centered ? 'center' : 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    justifyContent: editorial ? 'space-between' : 'center',
  };

  const ctaStyle = ctaType?.startsWith('link-')
    ? {
        color: 'inherit',
        fontWeight: 600,
        textDecoration: 'none',
      }
    : {
        display: 'inline-flex',
        padding: '0.75rem 1.25rem',
        borderRadius: '8px',
        background: ctaType?.includes('outline') ? 'transparent' : '#fff',
        border: ctaType?.includes('outline') ? '1px solid currentColor' : 0,
        color: ctaType?.includes('outline') ? '#fff' : '#111827',
        fontWeight: 600,
        textDecoration: 'none',
      };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Content', 'sobe')} initialOpen={true}>
          <PanelRow>
            <TextControl
              label={__('Button Text', 'sobe')}
              value={ctaText ?? ''}
              onChange={(val) => setAttributes({ ctaText: val })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label={__('Button URL', 'sobe')}
              value={ctaUrl ?? ''}
              onChange={(val) => setAttributes({ ctaUrl: val })}
              type="url"
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label={__('Button Style', 'sobe')}
              value={ctaType}
              options={[
                { label: __('Button', 'sobe'), value: 'btn-dark' },
                { label: __('Outline Button', 'sobe'), value: 'btn-outline-dark' },
                { label: __('Text Link', 'sobe'), value: 'link-dark' },
              ]}
              onChange={(val) => setAttributes({ ctaType: val })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </PanelRow>
        </PanelBody>

        <PanelBody title={__('Background', 'sobe')} initialOpen={false}>
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) =>
                  setAttributes({
                    backgroundImageId: media.id,
                    backgroundImageUrl: media.url,
                  })
                }
                allowedTypes={['image']}
                value={backgroundImageId}
                render={({ open }) =>
                  backgroundImageUrl ? (
                    <div style={{ width: '100%' }}>
                      <img
                        src={backgroundImageUrl}
                        alt=""
                        style={{ maxWidth: '100%', marginBottom: '8px' }}
                      />
                      <Button variant="secondary" onClick={open}>
                        {__('Change Image', 'sobe')}
                      </Button>
                      <Button
                        variant="link"
                        isDestructive
                        onClick={() =>
                          setAttributes({
                            backgroundImageId: 0,
                            backgroundImageUrl: '',
                          })
                        }
                      >
                        {__('Remove', 'sobe')}
                      </Button>
                    </div>
                  ) : (
                    <Button variant="secondary" onClick={open}>
                      {__('Select Background Image', 'sobe')}
                    </Button>
                  )
                }
              />
            </MediaUploadCheck>
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label={__('Dark Overlay', 'sobe')}
              checked={darkOverlay}
              onChange={(val) => setAttributes({ darkOverlay: val })}
              __nextHasNoMarginBottom
            />
          </PanelRow>
        </PanelBody>

        <PanelBody title={__('Layout', 'sobe')} initialOpen={false}>
          <PanelRow>
            <SelectControl
              label={__('Content Layout', 'sobe')}
              value={alignment}
              options={[
                { label: __('Left', 'sobe'), value: 'left' },
                { label: __('Center', 'sobe'), value: 'center' },
                { label: __('Split Screen', 'sobe'), value: 'split-screen' },
                { label: __('Editorial', 'sobe'), value: 'editorial' },
              ]}
              onChange={(val) => setAttributes({ alignment: val })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label={__('Height', 'sobe')}
              value={height}
              options={[
                { label: '70vh', value: '70vh' },
                { label: '80vh', value: '80vh' },
                { label: '90vh', value: '90vh' },
                { label: '100vh', value: '100vh' },
              ]}
              onChange={(val) => setAttributes({ height: val })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {darkOverlay && (
          <div
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.45)' }}
          />
        )}
        <div style={contentStyle}>
          <RichText
            tagName="h1"
            placeholder={__('Your headline here...', 'sobe')}
            value={heading}
            onChange={(val) => setAttributes({ heading: val })}
            style={{
              color: '#fff',
              margin: 0,
              fontSize: editorial ? 'clamp(4rem, 12vw, 8rem)' : 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: editorial ? 0.9 : 1.05,
            }}
          />
          <RichText
            tagName="p"
            placeholder={__('Supporting description...', 'sobe')}
            value={paragraph}
            onChange={(val) => setAttributes({ paragraph: val })}
            style={{ color: 'rgba(255,255,255,.85)', margin: 0, fontSize: '1.125rem' }}
          />
          {ctaText && (
            <div>
              <a href={ctaUrl || '#'} style={ctaStyle} onClick={(e) => e.preventDefault()}>
                {ctaText}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
