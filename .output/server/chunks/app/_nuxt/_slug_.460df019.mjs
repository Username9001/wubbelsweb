import _sfc_main$1 from './ContentRenderer.47848152.mjs';
import { a as useRoute, _ as __nuxt_component_0$1 } from '../server.mjs';
import { useSSRContext, defineComponent, withAsyncContext, ref, mergeProps, unref, withCtx, openBlock, createBlock, toDisplayString, createCommentVNode, createTextVNode, createVNode } from 'vue';
import { u as useAsyncData, q as queryContent } from './query.c22fbb98.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper.a1a6add7.mjs';
import './ContentRendererMarkdown.683ca7bf.mjs';
import 'destr';
import 'scule';
import 'property-information';
import 'html-tags';
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
import 'unenv/runtime/fetch/index';
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
import 'cookie-es';
import './utils.76ba10c8.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[[slug]]",
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
    const route = useRoute();
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("page-data", () => queryContent("/projects/" + route.params.slug.toString()).findOne())), __temp = await __temp, __restore(), __temp);
    ref(false);
    const refreshed = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = _sfc_main$1;
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        key: _ctx.$route.params.slug
      }, _attrs))} data-v-3cefb1f1>`);
      if (_ctx.$route.params.slug) {
        _push(`<header class="header" data-v-3cefb1f1><section class="text-box" data-v-3cefb1f1>`);
        _push(ssrRenderComponent(_component_ContentRenderer, { value: unref(data) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(data).title) {
                _push2(`<h1 data-v-3cefb1f1${_scopeId}>${ssrInterpolate(unref(data).title)}</h1>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(data).subtitle) {
                _push2(`<p data-v-3cefb1f1${_scopeId}>${ssrInterpolate(unref(data).subtitle)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(data).excerpt) {
                _push2(`<p data-v-3cefb1f1${_scopeId}>${ssrInterpolate(unref(data).excerpt)}</p>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(data).title ? (openBlock(), createBlock("h1", { key: 0 }, toDisplayString(unref(data).title), 1)) : createCommentVNode("", true),
                unref(data).subtitle ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(unref(data).subtitle), 1)) : createCommentVNode("", true),
                unref(data).excerpt ? (openBlock(), createBlock("p", { key: 2 }, toDisplayString(unref(data).excerpt), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          "aria-label": "Read more",
          to: "#main",
          class: "header-link read-more-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Continue `);
            } else {
              return [
                createTextVNode(" Continue ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</section></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="main" id="main" data-v-3cefb1f1>`);
      if (unref(refreshed)) {
        _push(`<div class="markdown-box" data-v-3cefb1f1>`);
        _push(ssrRenderComponent(_component_ContentRenderer, { value: unref(data) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h1 data-v-3cefb1f1${_scopeId}>${ssrInterpolate(unref(data).title)}</h1><p data-v-3cefb1f1${_scopeId}>${ssrInterpolate(unref(data).introduction)}</p><div class="img-container" data-v-3cefb1f1${_scopeId}><img src="https://loremflickr.com/600/335" width="600" height="335" alt="" data-v-3cefb1f1${_scopeId}><small data-v-3cefb1f1${_scopeId}>Subscript for image</small></div><p data-v-3cefb1f1${_scopeId}>${ssrInterpolate(unref(data).further_description)}</p><div class="img-container container-large" data-v-3cefb1f1${_scopeId}><img src="https://loremflickr.com/600/335" width="600" height="335" alt="" data-v-3cefb1f1${_scopeId}><small data-v-3cefb1f1${_scopeId}>Subscript for image</small></div><p data-v-3cefb1f1${_scopeId}>${ssrInterpolate(unref(data).ending_description)}</p><button class="to-website" data-v-3cefb1f1${_scopeId}>`);
              _push2(ssrRenderComponent(_component_nuxt_link, {
                to: unref(data).link,
                target: "_blank"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Visit website `);
                  } else {
                    return [
                      createTextVNode(" Visit website ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</button><button class="back-to-projects" data-v-3cefb1f1${_scopeId}>`);
              _push2(ssrRenderComponent(_component_nuxt_link, { to: "/#project-grid" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Back to projects `);
                  } else {
                    return [
                      createTextVNode(" Back to projects ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              return [
                createVNode("h1", null, toDisplayString(unref(data).title), 1),
                createVNode("p", null, toDisplayString(unref(data).introduction), 1),
                createVNode("div", { class: "img-container" }, [
                  createVNode("img", {
                    src: "https://loremflickr.com/600/335",
                    width: "600",
                    height: "335",
                    alt: ""
                  }),
                  createVNode("small", null, "Subscript for image")
                ]),
                createVNode("p", null, toDisplayString(unref(data).further_description), 1),
                createVNode("div", { class: "img-container container-large" }, [
                  createVNode("img", {
                    src: "https://loremflickr.com/600/335",
                    width: "600",
                    height: "335",
                    alt: ""
                  }),
                  createVNode("small", null, "Subscript for image")
                ]),
                createVNode("p", null, toDisplayString(unref(data).ending_description), 1),
                createVNode("button", { class: "to-website" }, [
                  createVNode(_component_nuxt_link, {
                    to: unref(data).link,
                    target: "_blank"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Visit website ")
                    ]),
                    _: 1
                  }, 8, ["to"])
                ]),
                createVNode("button", { class: "back-to-projects" }, [
                  createVNode(_component_nuxt_link, { to: "/#project-grid" }, {
                    default: withCtx(() => [
                      createTextVNode(" Back to projects ")
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/[[slug]].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __slug__ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3cefb1f1"]]);

export { __slug__ as default };
//# sourceMappingURL=_slug_.460df019.mjs.map
