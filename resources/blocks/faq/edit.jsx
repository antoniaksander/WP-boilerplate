const { useBlockProps, InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow, TextControl, Button } = wp.components;
const { __ } = wp.i18n;
const { useState } = wp.element;

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const { faqs } = attributes;
  const [localFaqs, setLocalFaqs] = useState(faqs);

  const blockProps = useBlockProps({ className: 'sobe-faq' });

  const updateFaq = (index, field, value) => {
    const updated = [...localFaqs];
    updated[index][field] = value;
    setLocalFaqs(updated);
    setAttributes({ faqs: updated });
  };

  const addFaq = () => {
    const updated = [...localFaqs, { question: '', answer: '' }];
    setLocalFaqs(updated);
    setAttributes({ faqs: updated });
  };

  const removeFaq = (index) => {
    const updated = localFaqs.filter((_, i) => i !== index);
    setLocalFaqs(updated);
    setAttributes({ faqs: updated });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('FAQ Items', 'sobe')}>
          <PanelRow>
            <p
              style={{
                marginBottom: '1rem',
                fontSize: '13px',
                color: '#646970',
              }}
            >
              {localFaqs.length === 0
                ? __('Add your first FAQ item using the button below.', 'sobe')
                : __('Manage your FAQ items below.', 'sobe')}
            </p>
          </PanelRow>

          {localFaqs.map((faq, index) => (
            <div key={index} className="faq-item-editor">
              <div className="faq-item-header">
                <span className="faq-item-number">
                  {__('Item', 'sobe')} {index + 1}
                </span>
                <Button
                  isDestructive
                  onClick={() => removeFaq(index)}
                  className="faq-item-remove"
                >
                  {__('Remove', 'sobe')}
                </Button>
              </div>

              <TextControl
                label={__('Question', 'sobe')}
                value={faq.question}
                onChange={(value) => updateFaq(index, 'question', value)}
                placeholder={__('Enter the question…', 'sobe')}
              />

              <TextControl
                label={__('Answer', 'sobe')}
                value={faq.answer}
                onChange={(value) => updateFaq(index, 'answer', value)}
                placeholder={__('Enter the answer…', 'sobe')}
                rows={3}
              />
            </div>
          ))}

          <PanelRow>
            <Button isPrimary onClick={addFaq} style={{ width: '100%' }}>
              {__('Add FAQ Item', 'sobe')}
            </Button>
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="faq__header">
          <h2 className="faq__title">
            {__('Frequently Asked Questions', 'sobe')}
          </h2>
        </div>

        <div className="faq__items">
          {localFaqs.length === 0 ? (
            <p className="faq__empty">
              {__(
                'No FAQ items yet. Add your first item in the sidebar.',
                'sobe',
              )}
            </p>
          ) : (
            localFaqs.map((faq, index) => (
              <div key={index} className="faq__item">
                <div className="faq__question-wrapper">
                  <span className="faq__question-text">
                    {faq.question || __('Question', 'sobe')}
                  </span>
                  <svg
                    className="faq__chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="faq__answer-wrapper">
                  <p className="faq__answer-text">
                    {faq.answer || __('Answer', 'sobe')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
