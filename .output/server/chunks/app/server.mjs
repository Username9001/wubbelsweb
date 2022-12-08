import { getCurrentInstance, toRef, isRef, inject, defineAsyncComponent, version, defineComponent, h, computed, unref, Suspense, nextTick, Transition, provide, reactive, ref, resolveComponent, shallowRef, createApp, onErrorCaptured, useSSRContext, withCtx, createVNode } from 'vue';
import { $fetch } from 'ohmyfetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { hasProtocol, isEqual, parseURL, joinURL } from 'ufo';
import { createError as createError$1, sendRedirect } from 'h3';
import { createHead as createHead$1, useHead as useHead$1 } from '@unhead/vue';
import { renderDOMHead, debouncedRenderDOMHead } from '@unhead/dom';
import { renderSSRHead } from '@unhead/ssr';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter } from 'vue-router';
import { ssrRenderSuspense, ssrRenderComponent } from 'vue/server-renderer';
import { defu } from 'defu';
import { a as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
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

var _a, _b, _c, _d, _e, _f, _g, _h;
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a2;
      if (prop === "public") {
        return target.public;
      }
      return (_a2 = target[prop]) != null ? _a2 : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a2;
  return (_a2 = useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      const prefetched = ref(false);
      const el = void 0;
      return () => {
        var _a2, _b2, _c2;
        if (!isExternal.value) {
          return h(
            resolveComponent("RouterLink"),
            {
              ref: void 0,
              to: to.value,
              ...prefetched.value && !props.custom ? { class: props.prefetchedClass || options.prefetchedClass } : {},
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b2 = (_a2 = router.resolve(to.value)) == null ? void 0 : _a2.href) != null ? _b2 : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_c2 = slots.default) == null ? void 0 : _c2.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = defineNuxtLink({ componentName: "NuxtLink" });
const nuxtLink = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defineNuxtLink,
  default: __nuxt_component_0$1
}, Symbol.toStringTag, { value: "Module" }));
function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defuFn = createDefu((object, key, currentValue, _namespace) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
const cfg0 = defineAppConfig({
  title: "Hello Nuxt",
  theme: {
    dark: true,
    colors: {
      primary: "#ff0000"
    }
  }
});
const inlineConfig = {};
defuFn(cfg0, inlineConfig);
function useHead(meta) {
  useNuxtApp()._useHead(meta);
}
const components = {
  AppSlot: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/app-slot" */
    './_nuxt/AppSlot.83a1c1b4.mjs'
  ).then((c) => c.default || c)),
  Counter: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/counter" */
    './_nuxt/Counter.6433acbe.mjs'
  ).then((c) => c.default || c)),
  EmailButton: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/email-button" */
    './_nuxt/EmailButton.4e21d8dd.mjs'
  ).then((c) => c.default || c)),
  Header: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/header" */
    './_nuxt/Header.5595b529.mjs'
  ).then((c) => c.default || c)),
  Project: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/project" */
    './_nuxt/Project.77255c2b.mjs'
  ).then((c) => c.default || c)),
  ProjectExtendedSlot: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/project-extended-slot" */
    './_nuxt/ProjectExtendedSlot.63c54f6a.mjs'
  ).then((c) => c.default || c)),
  ProjectSlot: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/project-slot" */
    './_nuxt/ProjectSlot.7cd6b962.mjs'
  ).then((c) => c.default || c)),
  Technologies: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/technologies" */
    './_nuxt/Technologies.b499a65c.mjs'
  ).then((c) => c.default || c)),
  Tegeltje: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/tegeltje" */
    './_nuxt/Tegeltje.8d71baa7.mjs'
  ).then((c) => c.default || c)),
  LayoutFooter: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/layout-footer" */
    './_nuxt/Footer.185c3b58.mjs'
  ).then((c) => c.default || c)),
  LayoutNav: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/layout-nav" */
    './_nuxt/Nav.40932711.mjs'
  ).then((c) => c.default || c)),
  ProjectsListing: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/projects-listing" */
    './_nuxt/Listing.c4e54090.mjs'
  ).then((c) => c.default || c)),
  SearchFilterButtons: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/search-filter-buttons" */
    './_nuxt/filterButtons.18dbc31f.mjs'
  ).then((c) => c.default || c)),
  SearchTextSearch: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/search-text-search" */
    './_nuxt/textSearch.85284fde.mjs'
  ).then((c) => c.default || c)),
  ContentDoc: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-doc" */
    './_nuxt/ContentDoc.0f552686.mjs'
  ).then((c) => c.default || c)),
  ContentList: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-list" */
    './_nuxt/ContentList.289e189c.mjs'
  ).then((c) => c.default || c)),
  ContentNavigation: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-navigation" */
    './_nuxt/ContentNavigation.cdf6d579.mjs'
  ).then((c) => c.default || c)),
  ContentQuery: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-query" */
    './_nuxt/ContentQuery.c38d3759.mjs'
  ).then((c) => c.default || c)),
  ContentRenderer: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-renderer" */
    './_nuxt/ContentRenderer.9bba7d77.mjs'
  ).then((c) => c.default || c)),
  ContentRendererMarkdown: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-renderer-markdown" */
    './_nuxt/ContentRendererMarkdown.810a6e78.mjs'
  ).then((c) => c.default || c)),
  ContentSlot: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-slot" */
    './_nuxt/ContentSlot.bad54e66.mjs'
  ).then((c) => c.default || c)),
  DocumentDrivenEmpty: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/document-driven-empty" */
    './_nuxt/DocumentDrivenEmpty.b1426f16.mjs'
  ).then((c) => c.default || c)),
  DocumentDrivenNotFound: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/document-driven-not-found" */
    './_nuxt/DocumentDrivenNotFound.b4d3af5a.mjs'
  ).then((c) => c.default || c)),
  Markdown: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/markdown" */
    './_nuxt/Markdown.d8e3835e.mjs'
  ).then((c) => c.default || c)),
  ProseA: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-a" */
    './_nuxt/ProseA.d2e87960.mjs'
  ).then((c) => c.default || c)),
  ProseBlockquote: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-blockquote" */
    './_nuxt/ProseBlockquote.4dda3441.mjs'
  ).then((c) => c.default || c)),
  ProseCode: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-code" */
    './_nuxt/ProseCode.98eb13f6.mjs'
  ).then((c) => c.default || c)),
  ProseCodeInline: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-code-inline" */
    './_nuxt/ProseCodeInline.114fa809.mjs'
  ).then((c) => c.default || c)),
  ProseEm: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-em" */
    './_nuxt/ProseEm.97d66c49.mjs'
  ).then((c) => c.default || c)),
  ProseH1: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-h1" */
    './_nuxt/ProseH1.fb201934.mjs'
  ).then((c) => c.default || c)),
  ProseH2: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-h2" */
    './_nuxt/ProseH2.28b27ce4.mjs'
  ).then((c) => c.default || c)),
  ProseH3: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-h3" */
    './_nuxt/ProseH3.cc234fec.mjs'
  ).then((c) => c.default || c)),
  ProseH4: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-h4" */
    './_nuxt/ProseH4.15108e36.mjs'
  ).then((c) => c.default || c)),
  ProseH5: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-h5" */
    './_nuxt/ProseH5.49d2dc90.mjs'
  ).then((c) => c.default || c)),
  ProseH6: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-h6" */
    './_nuxt/ProseH6.ca4e385a.mjs'
  ).then((c) => c.default || c)),
  ProseHr: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-hr" */
    './_nuxt/ProseHr.3fb3d58b.mjs'
  ).then((c) => c.default || c)),
  ProseImg: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-img" */
    './_nuxt/ProseImg.4debdb73.mjs'
  ).then((c) => c.default || c)),
  ProseLi: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-li" */
    './_nuxt/ProseLi.3b333fab.mjs'
  ).then((c) => c.default || c)),
  ProseOl: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-ol" */
    './_nuxt/ProseOl.c0724cf8.mjs'
  ).then((c) => c.default || c)),
  ProseP: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-p" */
    './_nuxt/ProseP.74cefe30.mjs'
  ).then((c) => c.default || c)),
  ProseStrong: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-strong" */
    './_nuxt/ProseStrong.6666462d.mjs'
  ).then((c) => c.default || c)),
  ProseTable: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-table" */
    './_nuxt/ProseTable.4d21c2b0.mjs'
  ).then((c) => c.default || c)),
  ProseTbody: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-tbody" */
    './_nuxt/ProseTbody.65148119.mjs'
  ).then((c) => c.default || c)),
  ProseTd: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-td" */
    './_nuxt/ProseTd.7eb88c6a.mjs'
  ).then((c) => c.default || c)),
  ProseTh: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-th" */
    './_nuxt/ProseTh.6761e184.mjs'
  ).then((c) => c.default || c)),
  ProseThead: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-thead" */
    './_nuxt/ProseThead.d680cc76.mjs'
  ).then((c) => c.default || c)),
  ProseTr: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-tr" */
    './_nuxt/ProseTr.675ebdc3.mjs'
  ).then((c) => c.default || c)),
  ProseUl: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-ul" */
    './_nuxt/ProseUl.46ff032a.mjs'
  ).then((c) => c.default || c))
};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
function createHead(initHeadObject) {
  const unhead = createHead$1();
  const legacyHead = {
    unhead,
    install(app) {
      if (version.startsWith("3")) {
        app.config.globalProperties.$head = unhead;
        app.provide("usehead", unhead);
      }
    },
    resolveTags() {
      return unhead.resolveTags();
    },
    headEntries() {
      return unhead.headEntries();
    },
    headTags() {
      return unhead.resolveTags();
    },
    push(input, options) {
      return unhead.push(input, options);
    },
    addEntry(input, options) {
      return unhead.push(input, options);
    },
    addHeadObjs(input, options) {
      return unhead.push(input, options);
    },
    addReactiveEntry(input, options) {
      const api = useHead$1(input, options);
      if (typeof api !== "undefined")
        return api.dispose;
      return () => {
      };
    },
    removeHeadObjs() {
    },
    updateDOM(document2, force) {
      if (force)
        renderDOMHead(unhead, { document: document2 });
      else
        debouncedRenderDOMHead(unhead, { delayFn: (fn) => setTimeout(() => fn(), 50), document: document2 });
    },
    internalHooks: unhead.hooks,
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    }
  };
  unhead.addHeadObjs = legacyHead.addHeadObjs;
  unhead.updateDOM = legacyHead.updateDOM;
  unhead.hooks.hook("dom:beforeRender", (ctx) => {
    for (const hook of legacyHead.hooks["before:dom"]) {
      if (hook() === false)
        ctx.shouldRender = false;
    }
  });
  if (initHeadObject)
    legacyHead.addHeadObjs(initHeadObject);
  return legacyHead;
}
const renderHeadToString = (head) => renderSSRHead(head.unhead);
version.startsWith("2.");
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [{ "rel": "icon", "type": "image/x-icon", "href": "/favicon.ico" }, { "rel": "preload", "href": "http://192.168.1.25:3000/fonts/Montserrat.ttf", "as": "font", "type": "font/ttf", "importance": "high", "crossorigin": "anonymous" }, { "rel": "preload", "href": "http://192.168.1.25:3000/fonts/Karrik-Regular.woff2", "as": "font", "type": "font/woff2", "importance": "high", "crossorigin": "anonymous" }, { "rel": "manifest", "href": "/manifest.json" }], "style": [], "script": [], "noscript": [], "title": "WubbbelsWeb", "description": "Base description", "htmlAttrs": { "lang": "en" } };
const appPageTransition = { "name": "page", "mode": "out-in" };
const appLayoutTransition = false;
const appKeepalive = false;
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.addEntry(appHead, { resolved: true });
  nuxtApp.vueApp.use(head);
  nuxtApp._useHead = (_meta, options) => {
    {
      head.addEntry(_meta, options);
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = async () => {
      const meta = await renderHeadToString(head);
      return {
        ...meta,
        bodyScripts: meta.bodyTags
      };
    };
  }
});
const metaMixin = {
  created() {
    const instance = getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? () => options.head(nuxtApp) : options.head;
    useHead(source);
  }
};
const node_modules_nuxt_dist_head_runtime_mixin_plugin_mjs_prWV5EzJWI = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin(metaMixin);
});
const _47home_47erik_47webdev_47wubbelsweb_47pages_47about_46vueMeta = {};
const _47home_47erik_47webdev_47wubbelsweb_47pages_47contact_46vueMeta = {};
const _47home_47erik_47webdev_47wubbelsweb_47pages_47index_46vueMeta = {};
const _47home_47erik_47webdev_47wubbelsweb_47pages_47projects_47_91_91slug_93_93_46vueMeta = {};
const _routes = [
  {
    name: (_a = _47home_47erik_47webdev_47wubbelsweb_47pages_47about_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47about_46vueMeta.name) != null ? _a : "about",
    path: (_b = _47home_47erik_47webdev_47wubbelsweb_47pages_47about_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47about_46vueMeta.path) != null ? _b : "/about",
    file: "/home/erik/webdev/wubbelsweb/pages/about.vue",
    children: [],
    meta: _47home_47erik_47webdev_47wubbelsweb_47pages_47about_46vueMeta,
    alias: (_47home_47erik_47webdev_47wubbelsweb_47pages_47about_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47about_46vueMeta.alias) || [],
    redirect: (_47home_47erik_47webdev_47wubbelsweb_47pages_47about_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47about_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/about.dcadbf50.mjs').then((m) => m.default || m)
  },
  {
    name: (_c = _47home_47erik_47webdev_47wubbelsweb_47pages_47contact_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47contact_46vueMeta.name) != null ? _c : "contact",
    path: (_d = _47home_47erik_47webdev_47wubbelsweb_47pages_47contact_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47contact_46vueMeta.path) != null ? _d : "/contact",
    file: "/home/erik/webdev/wubbelsweb/pages/contact.vue",
    children: [],
    meta: _47home_47erik_47webdev_47wubbelsweb_47pages_47contact_46vueMeta,
    alias: (_47home_47erik_47webdev_47wubbelsweb_47pages_47contact_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47contact_46vueMeta.alias) || [],
    redirect: (_47home_47erik_47webdev_47wubbelsweb_47pages_47contact_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47contact_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/contact.5e182131.mjs').then((m) => m.default || m)
  },
  {
    name: (_e = _47home_47erik_47webdev_47wubbelsweb_47pages_47index_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47index_46vueMeta.name) != null ? _e : "index",
    path: (_f = _47home_47erik_47webdev_47wubbelsweb_47pages_47index_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47index_46vueMeta.path) != null ? _f : "/",
    file: "/home/erik/webdev/wubbelsweb/pages/index.vue",
    children: [],
    meta: _47home_47erik_47webdev_47wubbelsweb_47pages_47index_46vueMeta,
    alias: (_47home_47erik_47webdev_47wubbelsweb_47pages_47index_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47index_46vueMeta.alias) || [],
    redirect: (_47home_47erik_47webdev_47wubbelsweb_47pages_47index_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47index_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/index.d44f7a63.mjs').then((m) => m.default || m)
  },
  {
    name: (_g = _47home_47erik_47webdev_47wubbelsweb_47pages_47projects_47_91_91slug_93_93_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47projects_47_91_91slug_93_93_46vueMeta.name) != null ? _g : "projects-slug",
    path: (_h = _47home_47erik_47webdev_47wubbelsweb_47pages_47projects_47_91_91slug_93_93_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47projects_47_91_91slug_93_93_46vueMeta.path) != null ? _h : "/projects/:slug?",
    file: "/home/erik/webdev/wubbelsweb/pages/projects/[[slug]].vue",
    children: [],
    meta: _47home_47erik_47webdev_47wubbelsweb_47pages_47projects_47_91_91slug_93_93_46vueMeta,
    alias: (_47home_47erik_47webdev_47wubbelsweb_47pages_47projects_47_91_91slug_93_93_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47projects_47_91_91slug_93_93_46vueMeta.alias) || [],
    redirect: (_47home_47erik_47webdev_47wubbelsweb_47pages_47projects_47_91_91slug_93_93_46vueMeta == null ? void 0 : _47home_47erik_47webdev_47wubbelsweb_47pages_47projects_47_91_91slug_93_93_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/_slug_.45c68be0.mjs').then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = to.meta.pageTransition !== false && from.meta.pageTransition !== false;
    const hookToWait = hasTransition ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  const elem = document.querySelector(selector);
  if (elem) {
    return parseFloat(getComputedStyle(elem).scrollMarginTop);
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (typeof result === "boolean") {
    return result;
  }
  return createError(result);
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a2, _b2, _c2, _d2;
  let __temp, __restore;
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = (_b2 = (_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) != null ? _b2 : createMemoryHistory(routerBase);
  const routes = (_d2 = (_c2 = routerOptions.routes) == null ? void 0 : _c2.call(routerOptions, _routes)) != null ? _d2 : _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a3, _b3, _c3, _d3;
    if (((_b3 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b3.default) === ((_d3 = (_c3 = from.matched[0]) == null ? void 0 : _c3.components) == null ? void 0 : _d3.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a3, _b3;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a3 = initialLayout.value) != null ? _a3 : to.meta.layout;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b3 = namedMiddleware[entry2]) == null ? void 0 : _b3.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusCode: 404,
            statusMessage: `Page Not Found: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, showError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.event.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const node_modules__64nuxt_content_dist_runtime_plugins_ws_mjs_JuoSZH52OQ = defineNuxtPlugin(() => {
  useRuntimeConfig().public;
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_head_runtime_mixin_plugin_mjs_prWV5EzJWI,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB,
  node_modules__64nuxt_content_dist_runtime_plugins_ws_mjs_JuoSZH52OQ
];
const _sfc_main$1 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import('./_nuxt/error-component.4bfeab43.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = resolveComponent("App");
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const layouts = {
  default: () => import('./_nuxt/default.675ae4c2.mjs').then((m) => m.default || m)
};
const LayoutLoader = defineComponent({
  props: {
    name: String,
    ...{}
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => {
      return h(LayoutComponent, {}, context.slots);
    };
  }
});
const __nuxt_component_0 = defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const injectedRoute = inject("_route");
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout2 = computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = unref(props.name)) != null ? _a2 : route.meta.layout) != null ? _b2 : "default";
    });
    return () => {
      var _a2;
      const hasLayout = layout2.value && layout2.value in layouts;
      const transitionProps = (_a2 = route.meta.layoutTransition) != null ? _a2 : appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && { key: layout2.value, name: layout2.value, hasTransition: void 0 }, context.slots).default()
      }).default();
    };
  }
});
const layout = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_0
}, Symbol.toStringTag, { value: "Module" }));
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a2;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a3;
    return ((_a3 = m.components) == null ? void 0 : _a3.default) === routeProps.Component.type;
  });
  const source = (_a2 = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a2 : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a2, _b2, _c2, _d2;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!((_b2 = (_a2 = props.transition) != null ? _a2 : routeProps.route.meta.pageTransition) != null ? _b2 : appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              (_d2 = (_c2 = props.keepalive) != null ? _c2 : routeProps.route.meta.keepalive) != null ? _d2 : appKeepalive,
              h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(Component, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const Component = defineComponent({
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    useState("counter", () => Math.round(Math.random() * 1e3));
    useState("counter");
    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:finish", () => {
      window.scrollTo(0, 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main$1);
    vueApp.component("App", _sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { __nuxt_component_0$1 as _, useRoute as a, useHead as b, useRuntimeConfig as c, useNuxtApp as d, entry$1 as default, createError as e, __nuxt_component_1 as f, layout as l, nuxtLink as n, page as p, useState as u };
//# sourceMappingURL=server.mjs.map
