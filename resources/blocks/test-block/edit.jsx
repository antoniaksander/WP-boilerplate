// Access WordPress packages as globals — do NOT import from '@wordpress/...'
const { useBlockProps, InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow } = wp.components;
const { __ } = wp.i18n;

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Settings', 'sage')} initialOpen={true}>
          {/* Add controls here */}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <p>{__('Test Block — editor preview', 'sage')}</p>
      </div>
    </>
  );
}
