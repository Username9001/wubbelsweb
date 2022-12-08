import { u as useState } from '../server.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
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

const useStackList = () => useState("stackList", () => ["All Projects"]);
const __default__ = {
  data() {
    return {
      stack_search: []
    };
  },
  methods: {
    addToStackList(newStack) {
      if (!this.stack_search.includes(newStack)) {
        this.stack_search.push(newStack);
        return;
      }
      return;
    },
    removeFromStackList(newStack) {
      if (this.stack_search.includes(newStack)) {
        this.stack_search.pop(newStack);
        return;
      }
      return;
    },
    toggleInStackList(stack) {
      if (this.stack_search.includes("All Projects") && stack.title !== "All Projects") {
        this.stack_search.splice(indexOf("All Projects"));
      }
      if (this.stack_search.includes(stack)) {
        this.stack_search.splice(indexOf(stack));
      } else if (!this.stack_search.includes(stack)) {
        this.stack_search.push(stack);
      }
      return;
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Counter",
  __ssrInlineRender: true,
  setup(__props) {
    useStackList();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><p>Current stack: ${ssrInterpolate(_ctx.stack_search)}</p><button>ADD HERE</button><button>REMOVE HERE</button><button>TOGGLE HERE</button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Counter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Counter.c0f3cf8b.mjs.map
