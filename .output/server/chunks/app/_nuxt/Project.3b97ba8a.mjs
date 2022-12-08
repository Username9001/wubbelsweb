import _sfc_main$1 from './ContentDoc.66ab35d7.mjs';
import { _ as __nuxt_component_0$1 } from '../server.mjs';
import { useSSRContext, mergeProps, withCtx, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper.a1a6add7.mjs';
import 'ufo';
import './ContentRenderer.1dde7a3f.mjs';
import './ContentRendererMarkdown.25e1e074.mjs';
import 'destr';
import 'scule';
import 'property-information';
import 'html-tags';
import './ContentQuery.e94505d1.mjs';
import './query.f9ce131a.mjs';
import 'ohash';
import 'cookie-es';
import 'h3';
import './utils.e0a74da4.mjs';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'unenv/runtime/fetch/index';
import 'unstorage';
import 'unstorage/drivers/overlay';
import 'unstorage/drivers/memory';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'unified';
import 'mdast-util-to-string';
import 'micromark/lib/preprocess.js';
import 'micromark/lib/postprocess.js';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'remark-emoji';
import 'rehype-slug';
import 'remark-squeeze-paragraphs';
import 'rehype-external-links';
import 'remark-gfm';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'remark-mdc';
import 'remark-parse';
import 'remark-rehype';
import 'mdast-util-to-hast';
import 'detab';
import 'unist-builder';
import 'mdurl';
import 'slugify';
import 'unist-util-position';

const _sfc_main = {
  props: ["project"],
  methods: {
    projectHighlight() {
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ContentDoc = _sfc_main$1;
  const _component_nuxt_link = __nuxt_component_0$1;
  if ($props.project) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-item" }, _attrs))}><div class="project-header">`);
    if ($props.project) {
      _push(ssrRenderComponent(_component_ContentDoc, {
        path: `projects/${$props.project.slug}`
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if ($props.project) {
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: "read-more-link",
        to: { path: "projects/" + $props.project.slug }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Visit project page `);
          } else {
            return [
              createTextVNode(" Visit project page ")
            ];
          }
        }),
        _: 1
      }, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div class="img-container"><img${ssrRenderAttr("src", `${$props.project.img}`)} alt=""></div><br></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_2 as default };
//# sourceMappingURL=Project.3b97ba8a.mjs.map
