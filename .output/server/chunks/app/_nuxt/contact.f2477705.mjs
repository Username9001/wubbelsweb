import __nuxt_component_0 from './EmailButton.193ba0af.mjs';
import _sfc_main$1 from './ContentRenderer.1dde7a3f.mjs';
import { useSSRContext, defineComponent, withAsyncContext, ref, mergeProps, unref, withCtx, createVNode, toDisplayString } from 'vue';
import { u as useAsyncData, q as queryContent } from './query.f9ce131a.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper.a1a6add7.mjs';
import '../server.mjs';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
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
import 'html-tags';
import './ContentRendererMarkdown.25e1e074.mjs';
import 'property-information';
import 'cookie-es';
import './utils.e0a74da4.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contact",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Default title"
    },
    description: {
      type: String,
      default: "Default description"
    },
    further_description: {
      type: String,
      default: "Default description"
    },
    ending_description: {
      type: String,
      default: "Default description"
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("page-data", () => queryContent("/contact").findOne())), __temp = await __temp, __restore(), __temp);
    const expanded = ref(false);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EmailButton = __nuxt_component_0;
      const _component_ContentRenderer = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "contact" }, _attrs))} data-v-a400447c><header class="header" data-v-a400447c><section class="text-box" data-v-a400447c><p data-v-a400447c>Want to work together?</p><h1 data-v-a400447c>Feel free to contact me</h1><h1 data-v-a400447c>Mail me below</h1><p data-v-a400447c>Need a new website for your company? Or have an interesting project you could use some web development help with?</p>`);
      _push(ssrRenderComponent(_component_EmailButton, null, null, _parent));
      _push(`</section></header>`);
      if (unref(expanded)) {
        _push(`<div class="main" id="contact" data-v-a400447c><div class="markdown-box" data-v-a400447c>`);
        _push(ssrRenderComponent(_component_ContentRenderer, { value: unref(data) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h1 data-v-a400447c${_scopeId}>${ssrInterpolate(unref(data).title)}</h1><div class="text-top" data-v-a400447c${_scopeId}><p data-v-a400447c${_scopeId}>${ssrInterpolate(unref(data).description)}</p><p data-v-a400447c${_scopeId}>${ssrInterpolate(unref(data).further_description)}</p></div><div class="img-container" data-v-a400447c${_scopeId}><img src="https://loremflickr.com/600/335" width="600" height="335" alt="" data-v-a400447c${_scopeId}><small data-v-a400447c${_scopeId}>Subscript for image</small></div><p data-v-a400447c${_scopeId}>${ssrInterpolate(unref(data).ending_description)}</p>`);
            } else {
              return [
                createVNode("h1", null, toDisplayString(unref(data).title), 1),
                createVNode("div", { class: "text-top" }, [
                  createVNode("p", null, toDisplayString(unref(data).description), 1),
                  createVNode("p", null, toDisplayString(unref(data).further_description), 1)
                ]),
                createVNode("div", { class: "img-container" }, [
                  createVNode("img", {
                    src: "https://loremflickr.com/600/335",
                    width: "600",
                    height: "335",
                    alt: ""
                  }),
                  createVNode("small", null, "Subscript for image")
                ]),
                createVNode("p", null, toDisplayString(unref(data).ending_description), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a400447c"]]);

export { contact as default };
//# sourceMappingURL=contact.f2477705.mjs.map
