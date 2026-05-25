const { useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

export default function Edit({ attributes }) {
  const blockProps = useBlockProps({ className: 'sobe-site-header-editor' });
  const variant = attributes.variant ?? 'header-1';

  return (
    <div {...blockProps}>
      <strong>{__('Site Header', 'sobe')}</strong>
      <span style={{ marginLeft: '8px', color: '#64748b' }}>{variant}</span>
    </div>
  );
}
