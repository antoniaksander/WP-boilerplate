import domReady from '@wordpress/dom-ready';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { ToggleControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { createElement } from '@wordpress/element';

function PageHeroToggle() {
  const [meta, setMeta] = useEntityProp('postType', 'page', 'meta');

  return createElement(
    PluginDocumentSettingPanel,
    { name: 'sobe-page-hero', title: __('Page Hero', 'sobe') },
    createElement(ToggleControl, {
      label: __('Use featured image as hero background', 'sobe'),
      help: __('Displays the featured image as a full-width banner behind the page title.', 'sobe'),
      checked: !!meta?._sobe_page_hero,
      onChange: (value) => setMeta({ ...meta, _sobe_page_hero: value }),
    })
  );
}

function PageHeroPanel() {
  const postType = useSelect(
    (select) => select('core/editor').getCurrentPostType(),
    []
  );

  if (postType !== 'page') return null;

  return createElement(PageHeroToggle, null);
}

domReady(() => {
  registerPlugin('sobe-page-hero', {
    render: PageHeroPanel,
  });
});
