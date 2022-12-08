import __nuxt_component_0 from './Header.6c091648.mjs';
import __nuxt_component_1 from './filterButtons.18dbc31f.mjs';
import __nuxt_component_2 from './Project.037b57d6.mjs';
import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
import './ContentDoc.6b2d4b33.mjs';
import './ContentRenderer.0c2c14f2.mjs';
import './ContentRendererMarkdown.e895f1d8.mjs';
import 'property-information';
import './ContentQuery.395e90a5.mjs';
import './query.aea59c23.mjs';
import 'cookie-es';
import './utils.a66359ab.mjs';

const _sfc_main = {
  head() {
    return {
      title: "Index Header text",
      loaded: false
    };
  },
  data() {
    return {
      loaded: false,
      search: "",
      stack_search: [],
      current_filter: ["All Projects"],
      stack_options: [
        { title: "VueJS/NuxtJS", category: "Frontend", counter: 0 },
        { title: "SASS", category: "Frontend", counter: 0 },
        { title: "TypeScript", category: "Frontend", counter: 0 },
        { title: "Wordpress", category: "Backend", counter: 0 },
        { title: "Laravel", category: "Backend", counter: 0 },
        { title: "WooCommerce", category: "Backend", counter: 0 },
        { title: "Docker", category: "Backend", counter: 0 },
        { title: "Processing", category: "Other", counter: 0 },
        { title: "Arduino", category: "Other", counter: 0 }
      ],
      personalia: {
        name: "Erik Wubbels",
        description: "I'm a web developer based in Eindhoven, The Netherlands. I specialize in interactive design, and am currently open for new projects and opportunities. ",
        email: "erik.wubbels@gmail.com"
      },
      all_projects: [
        {
          name: "Misty Fields 2022",
          slug: "misty-fields-2022",
          link: "https://mistyfields.com",
          stack: ["Wordpress", "SASS"],
          img: "https://loremflickr.com/600/335"
        },
        {
          name: "Misty Fields 2019",
          slug: "misty-fields-2019",
          link: "https://mistyfields.com",
          stack: ["Wordpress", "SASS"],
          img: "https://loremflickr.com/600/337"
        },
        {
          name: "TomsTech",
          slug: "tomstech",
          link: "https://tomstech.nl",
          stack: ["Wordpress", "SASS"],
          img: "https://loremflickr.com/600/339"
        },
        {
          name: "Pineapple Productions",
          slug: "pineapple-productions",
          link: "https://pp.wubbelsweb.com",
          stack: ["Wordpress", "SASS"],
          img: "https://loremflickr.com/600/331"
        },
        {
          name: "Bootleg Breathing",
          slug: "bootleg-breathing",
          link: "https://bb.wubbelsweb.com",
          stack: ["VueJS/NuxtJS", "Bootstrap", "SASS"],
          img: "https://pftest.wubbelsweb.com/img/test.jpg"
        },
        {
          name: "Plant DB",
          slug: "plant-db",
          link: "https://plantnet.wubbelsweb.com/species",
          stack: ["VueJS/NuxtJS", "Bootstrap", "SASS", "Laravel", "GraphQL", "MongoDB", "Docker"],
          img: "https://loremflickr.com/600/334"
        },
        {
          name: "Bits of Freedom",
          slug: "bits-of-freedom",
          stack: ["Bootstrap", "Vanilla JS", "SASS"],
          img: "https://loremflickr.com/600/332"
        },
        {
          name: "DAGDice",
          slug: "dagdice",
          stack: ["Adobe XD", "VueJS/NuxtJS", "GraphQL", "TypeScript", "Docker"],
          img: "https://loremflickr.com/600/333"
        },
        {
          name: "Erik Wubbels Fotografie",
          slug: "erik-wubbels-fotografie",
          link: "https://erikwubbels.nl",
          stack: ["Wordpress", "SASS", "WooCommerce", "Docker"],
          img: "https://loremflickr.com/600/338"
        },
        {
          name: "Holdie",
          slug: "holdie",
          link: "",
          stack: ["Arduino"],
          img: "https://loremflickr.com/600/338"
        },
        {
          name: "Mugen",
          slug: "mugen",
          link: "",
          stack: ["Arduino"],
          img: "https://loremflickr.com/600/338"
        },
        {
          name: "Flowerscape",
          slug: "flowerscape",
          link: "",
          stack: ["Processing"],
          img: "https://loremflickr.com/600/338"
        }
      ]
    };
  },
  methods: {
    toggleInStackList(stack) {
      if (this.stack_search.includes("All Projects") && stack.title !== "All Projects") {
        this.stack_search = this.stack_search.filter((e) => e !== "All Projects");
      }
      if (stack.title == "All Projects" && this.stack_search.length > 0) {
        this.stack_search = ["All Projects"];
        return;
      }
      if (this.stack_search.includes(stack.title)) {
        this.stack_search = this.stack_search.filter((e) => e !== stack.title);
      } else if (!this.stack_search.includes(stack.title)) {
        this.stack_search.push(stack.title);
      }
      return;
    }
  },
  computed: {
    combinedFilter() {
      if (this.stack_search.includes("All Projects"))
        this.current_filter = this.all_projects;
      if (!this.stack_search.includes("All Projects")) {
        this.current_filter = this.all_projects;
        for (let i = 0; i < this.stack_search.length; i++) {
          this.current_filter = this.current_filter.filter(
            (project) => project.stack.includes(this.stack_search[i])
          );
        }
      }
      return this.current_filter;
    },
    projectsRemaining() {
      let remaining = [];
      return remaining;
    }
  },
  created() {
    this.loaded = true;
    this.stack_search = ["All Projects"];
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Header = __nuxt_component_0;
  const _component_SearchFilterButtons = __nuxt_component_1;
  const _component_Project = __nuxt_component_2;
  if ($data.loaded) {
    _push(`<div${ssrRenderAttrs(mergeProps({ id: "portfolio" }, _attrs))}>`);
    _push(ssrRenderComponent(_component_Header, { personalia: $data.personalia }, null, _parent));
    if ($data.loaded) {
      _push(`<div id="main" class="main"><div class="search-wrapper" id="projects"><h1 class="grid-title"> Portfolio </h1>`);
      _push(ssrRenderComponent(_component_SearchFilterButtons, {
        modelValue: $data.stack_search,
        "onUpdate:modelValue": ($event) => $data.stack_search = $event,
        onUpdateStackSearch: ($event) => $options.toggleInStackList($event),
        stack_options: $data.stack_options,
        stack_search: $data.stack_search,
        current_filter: $data.current_filter
      }, null, _parent));
      if ($options.combinedFilter.length) {
        _push(`<h3 class="counter">${ssrInterpolate($options.combinedFilter.length)} Project`);
        if ($options.combinedFilter.length > 1) {
          _push(`<ins>s</ins>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</h3>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div id="project-grid"><!--[-->`);
      ssrRenderList($options.combinedFilter, (project) => {
        _push(ssrRenderComponent(_component_Project, {
          key: project.name,
          project
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index.57b22416.mjs.map
