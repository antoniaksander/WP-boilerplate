const { useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

export default function Edit({ attributes }) {
  const blockProps = useBlockProps({ className: 'sobe-site-footer-editor' });
  const variant = attributes.variant ?? 'layout-2';

  return (
    <div {...blockProps}>
      <strong>{__('Site Footer', 'sobe')}</strong>
      <span style={{ marginLeft: '8px', color: '#64748b' }}>{variant}</span>
    </div>
  );
}
