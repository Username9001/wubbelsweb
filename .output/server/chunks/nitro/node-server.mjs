globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createError, getQuery, getCookie, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase, kebabCase, pascalCase, camelCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, joinURL, withLeadingSlash, withoutTrailingSlash, isRelative } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import overlay from 'unstorage/drivers/overlay';
import memory$1 from 'unstorage/drivers/memory';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, extname, join } from 'pathe';
import { unified } from 'unified';
import { toString } from 'mdast-util-to-string';
import { preprocess } from 'micromark/lib/preprocess.js';
import { postprocess } from 'micromark/lib/postprocess.js';
import { stringifyPosition } from 'unist-util-stringify-position';
import { markdownLineEnding, markdownSpace } from 'micromark-util-character';
import { push, splice } from 'micromark-util-chunked';
import { resolveAll } from 'micromark-util-resolve-all';
import remarkEmoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import rehypeSortAttributeValues from 'rehype-sort-attribute-values';
import rehypeSortAttributes from 'rehype-sort-attributes';
import rehypeRaw from 'rehype-raw';
import remarkMDC, { parseFrontMatter } from 'remark-mdc';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { all } from 'mdast-util-to-hast';
import { detab } from 'detab';
import { u } from 'unist-builder';
import { encode } from 'mdurl';
import slugify from 'slugify';
import { position } from 'unist-util-position';
import htmlTags from 'html-tags';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{"baseURL":"/","content":{"clientDB":{"isSPA":false,"integrity":1670857520837},"navigation":{"fields":[]},"base":"_content","tags":{"p":"prose-p","a":"prose-a","blockquote":"prose-blockquote","code-inline":"prose-code-inline","code":"prose-code","em":"prose-em","h1":"prose-h1","h2":"prose-h2","h3":"prose-h3","h4":"prose-h4","h5":"prose-h5","h6":"prose-h6","hr":"prose-hr","img":"prose-img","ul":"prose-ul","ol":"prose-ol","li":"prose-li","strong":"prose-strong","table":"prose-table","thead":"prose-thead","tbody":"prose-tbody","td":"prose-td","th":"prose-th","tr":"prose-tr"},"highlight":false,"wsUrl":"","documentDriven":false,"anchorLinks":{"depth":4,"exclude":[1]}}},"content":{"cacheVersion":2,"cacheIntegrity":"kc4UzpZUjI","transformers":[],"base":"_content","watch":{"ws":{"port":4000,"hostname":"localhost","showURL":false}},"sources":{},"ignores":["\\.","-"],"locales":[],"highlight":false,"markdown":{"tags":{"p":"prose-p","a":"prose-a","blockquote":"prose-blockquote","code-inline":"prose-code-inline","code":"prose-code","em":"prose-em","h1":"prose-h1","h2":"prose-h2","h3":"prose-h3","h4":"prose-h4","h5":"prose-h5","h6":"prose-h6","hr":"prose-hr","img":"prose-img","ul":"prose-ul","ol":"prose-ol","li":"prose-li","strong":"prose-strong","table":"prose-table","thead":"prose-thead","tbody":"prose-tbody","td":"prose-td","th":"prose-th","tr":"prose-tr"},"anchorLinks":{"depth":4,"exclude":[1]},"remarkPlugins":{},"rehypePlugins":{}},"yaml":{},"csv":{"delimeter":",","json":true},"navigation":{"fields":[]},"documentDriven":false,"experimental":{"clientDB":false}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject$1(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject$1(obj[key])) {
      if (isObject$1(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const _assets = {
  ["nitro:bundled:cache:content:content-index.json"]: {
    import: () => import('../raw/content-index.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"354-/4WUgB+P4yNxb5EnoDokRcg1ZnQ\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:content-navigation.json"]: {
    import: () => import('../raw/content-navigation.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"3a2-paEIOFn7bgPBhVS7UYi6t/MHu78\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:about.md"]: {
    import: () => import('../raw/about.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"a2d-QzLgm2iOeJmQQVAgWKvIZVa6IY8\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:contact.md"]: {
    import: () => import('../raw/contact.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"a1a-eQxN6xhIRjPOZ23XtISq761czkM\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:index.md"]: {
    import: () => import('../raw/index.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"854-ZL+88bo4ItefrMvFdH4IGVZWe/w\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:test.md"]: {
    import: () => import('../raw/test.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"bcd-IA5jsG55GKTLPTX56ey4SBQnBIU\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:projects:bits-of-freedom.md"]: {
    import: () => import('../raw/bits-of-freedom.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"a08-OjCYsYpN0JJUDtM9Ab401VaW5Ic\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:projects:bootleg-breathing.md"]: {
    import: () => import('../raw/bootleg-breathing.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"a14-wXUjQRmOQdLIpH2kiYNk/vG0XDY\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:projects:dagdice.md"]: {
    import: () => import('../raw/dagdice.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"9d8-vl1JW2cfv0RwZrTMwFgW6Qv9dQ8\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:projects:erik-wubbels-fotografie.md"]: {
    import: () => import('../raw/erik-wubbels-fotografie.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"a38-9s8JXX2opKyTNYp5/7a7LIVyz5U\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:projects:flowerscape.md"]: {
    import: () => import('../raw/flowerscape.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"9f0-dnRO0MCqGf6aY2NLd4Nns4cA+r4\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:projects:holdie.md"]: {
    import: () => import('../raw/holdie.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"9d2-lPVtuuJKOIpSWVzBmMJsY5bNcMA\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:projects:misty-fields-2019.md"]: {
    import: () => import('../raw/misty-fields-2019.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"b13-CmdfjWgTRgAXIsGWsGgq7Or8rXg\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:projects:misty-fields-2022.md"]: {
    import: () => import('../raw/misty-fields-2022.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"a0d-mLAgp2arDihHKdyovNLos3S8UI4\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:projects:mugen.md"]: {
    import: () => import('../raw/mugen.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"9cc-nauj+2vxCtY1qqmQj+0D1dZJ9Gs\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:projects:pineapple-productions.md"]: {
    import: () => import('../raw/pineapple-productions.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"a2c-0m94CdhLzfySY6F923KGc7MN6+E\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:projects:plant-db.md"]: {
    import: () => import('../raw/plant-db.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"9de-QHFA5XiUyxFbhQzyLYD8KaKIQlQ\"","mtime":"2022-12-12T15:05:41.478Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:projects:tomstech.md"]: {
    import: () => import('../raw/tomstech.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"9de-BOaSwIIlExuZB3GoHPfAkUB6814\"","mtime":"2022-12-12T15:05:41.478Z"}
  }
};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const bundledStorage = ["/cache/content"];
for (const base of bundledStorage) {
  storage.mount(base, overlay({
    layers: [
      memory$1(),
      // TODO
      // prefixStorage(storage, base),
      prefixStorage(storage, 'assets:nitro:bundled:' + base)
    ]
  }));
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter({ routes: config.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    let _resSendBody;
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/logo_x120.png": {
    "type": "image/png",
    "etag": "\"1a78-SWMFxHEaYFyWLZUwxPmU/V208rk\"",
    "mtime": "2022-12-12T15:05:33.822Z",
    "size": 6776,
    "path": "../public/logo_x120.png"
  },
  "/logo_x120.png.br": {
    "type": "image/png",
    "encoding": "br",
    "etag": "\"1a20-tPV2LjiA9XCb4auv5IKBGqDqekk\"",
    "mtime": "2022-12-12T15:05:33.958Z",
    "size": 6688,
    "path": "../public/logo_x120.png.br"
  },
  "/logo_x120.png.gz": {
    "type": "image/png",
    "encoding": "gzip",
    "etag": "\"1a64-tsIjxSMGIagACQVXn6O+X9l1GtI\"",
    "mtime": "2022-12-12T15:05:33.894Z",
    "size": 6756,
    "path": "../public/logo_x120.png.gz"
  },
  "/logo_x128.png": {
    "type": "image/png",
    "etag": "\"1468-djN4JfJhEec8wD4gc4YaUZVdyf8\"",
    "mtime": "2022-12-12T15:05:33.818Z",
    "size": 5224,
    "path": "../public/logo_x128.png"
  },
  "/logo_x128.png.br": {
    "type": "image/png",
    "encoding": "br",
    "etag": "\"1397-r4SCz+Tb2Lr3r0j92KUH10AMncA\"",
    "mtime": "2022-12-12T15:05:33.970Z",
    "size": 5015,
    "path": "../public/logo_x128.png.br"
  },
  "/logo_x128.png.gz": {
    "type": "image/png",
    "encoding": "gzip",
    "etag": "\"13bb-4GV1dGFWfI7GVrutyBGNVaLsHbw\"",
    "mtime": "2022-12-12T15:05:33.958Z",
    "size": 5051,
    "path": "../public/logo_x128.png.gz"
  },
  "/logo_x180.png": {
    "type": "image/png",
    "etag": "\"29d6-6+THnK+5wUX5Q2SBzM+86UcMH1Y\"",
    "mtime": "2022-12-12T15:05:33.818Z",
    "size": 10710,
    "path": "../public/logo_x180.png"
  },
  "/logo_x180.png.br": {
    "type": "image/png",
    "encoding": "br",
    "etag": "\"295e-8LPQW5OT2gQjmmuAsH50vK0jegY\"",
    "mtime": "2022-12-12T15:05:33.998Z",
    "size": 10590,
    "path": "../public/logo_x180.png.br"
  },
  "/logo_x180.png.gz": {
    "type": "image/png",
    "encoding": "gzip",
    "etag": "\"299d-7JVppYgb6R0nneedlp2oOZYt35c\"",
    "mtime": "2022-12-12T15:05:33.974Z",
    "size": 10653,
    "path": "../public/logo_x180.png.gz"
  },
  "/logo_x192.png": {
    "type": "image/png",
    "etag": "\"1ff2-rxxizfUXc1SiA9JyqY0Bysluvcg\"",
    "mtime": "2022-12-12T15:05:33.818Z",
    "size": 8178,
    "path": "../public/logo_x192.png"
  },
  "/logo_x192.png.br": {
    "type": "image/png",
    "encoding": "br",
    "etag": "\"1e35-nefiefSMe1kMSPlb4lkBNQmljEw\"",
    "mtime": "2022-12-12T15:05:34.018Z",
    "size": 7733,
    "path": "../public/logo_x192.png.br"
  },
  "/logo_x192.png.gz": {
    "type": "image/png",
    "encoding": "gzip",
    "etag": "\"1e4c-iUWmuigi/5UjrKbjVJCIPwavNUc\"",
    "mtime": "2022-12-12T15:05:34.002Z",
    "size": 7756,
    "path": "../public/logo_x192.png.gz"
  },
  "/logo_x32.png": {
    "type": "image/png",
    "etag": "\"64c-drF9ykuxbc9Qw1/yXo8ueLiRtx0\"",
    "mtime": "2022-12-12T15:05:33.818Z",
    "size": 1612,
    "path": "../public/logo_x32.png"
  },
  "/logo_x32.png.br": {
    "type": "image/png",
    "encoding": "br",
    "etag": "\"550-YPeVbAxZ98j0RABByNUvBIc1QHg\"",
    "mtime": "2022-12-12T15:05:34.026Z",
    "size": 1360,
    "path": "../public/logo_x32.png.br"
  },
  "/logo_x32.png.gz": {
    "type": "image/png",
    "encoding": "gzip",
    "etag": "\"5e5-1fePz9lRsqcWMSMd7df8yNOalqs\"",
    "mtime": "2022-12-12T15:05:34.022Z",
    "size": 1509,
    "path": "../public/logo_x32.png.gz"
  },
  "/logo_x384.png": {
    "type": "image/png",
    "etag": "\"4d60-fG5KxzhgFtuP4BF2hEZNWvqBSCM\"",
    "mtime": "2022-12-12T15:05:33.810Z",
    "size": 19808,
    "path": "../public/logo_x384.png"
  },
  "/logo_x384.png.br": {
    "type": "image/png",
    "encoding": "br",
    "etag": "\"4609-BgcJ3BVEdcODF8YudQb8mHgxLIQ\"",
    "mtime": "2022-12-12T15:05:34.070Z",
    "size": 17929,
    "path": "../public/logo_x384.png.br"
  },
  "/logo_x384.png.gz": {
    "type": "image/png",
    "encoding": "gzip",
    "etag": "\"4639-BVXDuedrFZNzLTg80fOzgWCIq3I\"",
    "mtime": "2022-12-12T15:05:34.030Z",
    "size": 17977,
    "path": "../public/logo_x384.png.gz"
  },
  "/logo_x48.png": {
    "type": "image/png",
    "etag": "\"609-0C7jxSvABDTZBDOuxtWvggfWRuU\"",
    "mtime": "2022-12-12T15:05:33.810Z",
    "size": 1545,
    "path": "../public/logo_x48.png"
  },
  "/logo_x48.png.br": {
    "type": "image/png",
    "encoding": "br",
    "etag": "\"60d-EAP8aojrPWXzuanzzsAFQkeULJI\"",
    "mtime": "2022-12-12T15:05:34.074Z",
    "size": 1549,
    "path": "../public/logo_x48.png.br"
  },
  "/logo_x48.png.gz": {
    "type": "image/png",
    "encoding": "gzip",
    "etag": "\"620-5TG6nC+NejeI7cBaijALD4yOJDY\"",
    "mtime": "2022-12-12T15:05:34.070Z",
    "size": 1568,
    "path": "../public/logo_x48.png.gz"
  },
  "/logo_x512.png": {
    "type": "image/png",
    "etag": "\"7145-iTeNjqDWjGV92BSndvg3dnJ48vw\"",
    "mtime": "2022-12-12T15:05:33.806Z",
    "size": 28997,
    "path": "../public/logo_x512.png"
  },
  "/logo_x512.png.br": {
    "type": "image/png",
    "encoding": "br",
    "etag": "\"63ac-cdVZMRdIG3BPFkb31a55Kmsdl+c\"",
    "mtime": "2022-12-12T15:05:34.162Z",
    "size": 25516,
    "path": "../public/logo_x512.png.br"
  },
  "/logo_x512.png.gz": {
    "type": "image/png",
    "encoding": "gzip",
    "etag": "\"63e1-TLHW0X2rhW50M/9+thACNQp1Fd4\"",
    "mtime": "2022-12-12T15:05:34.078Z",
    "size": 25569,
    "path": "../public/logo_x512.png.gz"
  },
  "/logo_x72.png": {
    "type": "image/png",
    "etag": "\"9c8-16pBDOm0idxWIxISpD6rtDVddw4\"",
    "mtime": "2022-12-12T15:05:33.806Z",
    "size": 2504,
    "path": "../public/logo_x72.png"
  },
  "/logo_x72.png.br": {
    "type": "image/png",
    "encoding": "br",
    "etag": "\"9c8-uhS+c7BKTinB3G61aWVftEMo7bY\"",
    "mtime": "2022-12-12T15:05:34.170Z",
    "size": 2504,
    "path": "../public/logo_x72.png.br"
  },
  "/logo_x72.png.gz": {
    "type": "image/png",
    "encoding": "gzip",
    "etag": "\"9df-cowzBYmvAuVnKcjD5t+6EvyTJ+w\"",
    "mtime": "2022-12-12T15:05:34.162Z",
    "size": 2527,
    "path": "../public/logo_x72.png.gz"
  },
  "/logo_x96.png": {
    "type": "image/png",
    "etag": "\"df7-F3LnF4SI+0YCZv1FMaHJ3/V37lk\"",
    "mtime": "2022-12-12T15:05:33.806Z",
    "size": 3575,
    "path": "../public/logo_x96.png"
  },
  "/logo_x96.png.br": {
    "type": "image/png",
    "encoding": "br",
    "etag": "\"dce-ThIh8pGRW31sLHfPP582VdNmNJg\"",
    "mtime": "2022-12-12T15:05:34.182Z",
    "size": 3534,
    "path": "../public/logo_x96.png.br"
  },
  "/logo_x96.png.gz": {
    "type": "image/png",
    "encoding": "gzip",
    "etag": "\"dee-IO2zoTRc3EMa3OSnWWUj532tw1s\"",
    "mtime": "2022-12-12T15:05:34.174Z",
    "size": 3566,
    "path": "../public/logo_x96.png.gz"
  },
  "/manifest.json": {
    "type": "application/json",
    "etag": "\"651-majUfLzHeXAT1p+wS3IANOe0tdQ\"",
    "mtime": "2022-12-12T15:05:33.806Z",
    "size": 1617,
    "path": "../public/manifest.json"
  },
  "/manifest.json.br": {
    "type": "application/json",
    "encoding": "br",
    "etag": "\"f9-V8TIsaw3EsCE15OIGVZ4EyAnLWI\"",
    "mtime": "2022-12-12T15:05:34.186Z",
    "size": 249,
    "path": "../public/manifest.json.br"
  },
  "/manifest.json.gz": {
    "type": "application/json",
    "encoding": "gzip",
    "etag": "\"126-NJmNNU71wqOGwY5rS7EQHHGWbfg\"",
    "mtime": "2022-12-12T15:05:34.182Z",
    "size": 294,
    "path": "../public/manifest.json.gz"
  },
  "/sw.js": {
    "type": "application/javascript",
    "etag": "\"5c2-jLTaNuASw2JVUrymvO6zAe7YSII\"",
    "mtime": "2022-12-12T15:05:33.806Z",
    "size": 1474,
    "path": "../public/sw.js"
  },
  "/sw.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"1b8-tUtHb+Q0YYXq68ITQBIOjjVAuEY\"",
    "mtime": "2022-12-12T15:05:34.194Z",
    "size": 440,
    "path": "../public/sw.js.br"
  },
  "/sw.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"230-qaYba68QNeYLtkjACQPG/MN4TeM\"",
    "mtime": "2022-12-12T15:05:34.190Z",
    "size": 560,
    "path": "../public/sw.js.gz"
  },
  "/fonts/ArchivoBlack-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"15c48-W2xEQy2i4TMK0wFT7d+YxzkBO4g\"",
    "mtime": "2022-12-12T15:05:33.830Z",
    "size": 89160,
    "path": "../public/fonts/ArchivoBlack-Regular.ttf"
  },
  "/fonts/ArchivoBlack-Regular.ttf.br": {
    "type": "font/ttf",
    "encoding": "br",
    "etag": "\"8e5c-byyG2okSCGoZr0MHRK+9IbSpvo8\"",
    "mtime": "2022-12-12T15:05:34.386Z",
    "size": 36444,
    "path": "../public/fonts/ArchivoBlack-Regular.ttf.br"
  },
  "/fonts/ArchivoBlack-Regular.ttf.gz": {
    "type": "font/ttf",
    "encoding": "gzip",
    "etag": "\"9c63-V7icklJoYOzTP1JnFm2Cb/CbXlY\"",
    "mtime": "2022-12-12T15:05:34.198Z",
    "size": 40035,
    "path": "../public/fonts/ArchivoBlack-Regular.ttf.gz"
  },
  "/fonts/BebasNeue-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"e14c-izquuXjzy19XWGB3S1DDMjOFY8E\"",
    "mtime": "2022-12-12T15:05:33.830Z",
    "size": 57676,
    "path": "../public/fonts/BebasNeue-Regular.ttf"
  },
  "/fonts/BebasNeue-Regular.ttf.br": {
    "type": "font/ttf",
    "encoding": "br",
    "etag": "\"5da8-HYQs1ZGB49sscJZBwpxY04VoC/4\"",
    "mtime": "2022-12-12T15:05:34.514Z",
    "size": 23976,
    "path": "../public/fonts/BebasNeue-Regular.ttf.br"
  },
  "/fonts/BebasNeue-Regular.ttf.gz": {
    "type": "font/ttf",
    "encoding": "gzip",
    "etag": "\"6b12-TSA5yeoPO54awZtdD/NMvYdU0MQ\"",
    "mtime": "2022-12-12T15:05:34.386Z",
    "size": 27410,
    "path": "../public/fonts/BebasNeue-Regular.ttf.gz"
  },
  "/fonts/Courgette-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"1d000-DmgmuS+PgP4uuAO9732BNVhF4oM\"",
    "mtime": "2022-12-12T15:05:33.826Z",
    "size": 118784,
    "path": "../public/fonts/Courgette-Regular.ttf"
  },
  "/fonts/Courgette-Regular.ttf.br": {
    "type": "font/ttf",
    "encoding": "br",
    "etag": "\"a956-DvZtkDhYN9tRUFditP2etTAHUOU\"",
    "mtime": "2022-12-12T15:05:34.758Z",
    "size": 43350,
    "path": "../public/fonts/Courgette-Regular.ttf.br"
  },
  "/fonts/Courgette-Regular.ttf.gz": {
    "type": "font/ttf",
    "encoding": "gzip",
    "etag": "\"d138-pZxu8vY8c345RCYo0NX/ZtVQRu8\"",
    "mtime": "2022-12-12T15:05:34.518Z",
    "size": 53560,
    "path": "../public/fonts/Courgette-Regular.ttf.gz"
  },
  "/fonts/Karrik-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"79cc-qxzsTOGJnq+b6FNlSLAfvl7YJYs\"",
    "mtime": "2022-12-12T15:05:33.826Z",
    "size": 31180,
    "path": "../public/fonts/Karrik-Regular.woff2"
  },
  "/fonts/Karrik-Regular.woff2.br": {
    "type": "font/woff2",
    "encoding": "br",
    "etag": "\"79d0-cYPw0ybrIxNlCfbmH4PbLpsrP1c\"",
    "mtime": "2022-12-12T15:05:34.786Z",
    "size": 31184,
    "path": "../public/fonts/Karrik-Regular.woff2.br"
  },
  "/fonts/Karrik-Regular.woff2.gz": {
    "type": "font/woff2",
    "encoding": "gzip",
    "etag": "\"79a5-ptP9Y41GTku38ElC5XelDVoOoUE\"",
    "mtime": "2022-12-12T15:05:34.762Z",
    "size": 31141,
    "path": "../public/fonts/Karrik-Regular.woff2.gz"
  },
  "/fonts/Montserrat-Medium.otf": {
    "type": "font/otf",
    "etag": "\"383d4-WVzwbCzYOrLgzNW3TiR/U00TmJk\"",
    "mtime": "2022-12-12T15:05:33.826Z",
    "size": 230356,
    "path": "../public/fonts/Montserrat-Medium.otf"
  },
  "/fonts/Montserrat-Medium.otf.br": {
    "type": "font/otf",
    "encoding": "br",
    "etag": "\"19061-Z7P2Lo+/nFxHqIHheVgD4Z2Ei0E\"",
    "mtime": "2022-12-12T15:05:35.666Z",
    "size": 102497,
    "path": "../public/fonts/Montserrat-Medium.otf.br"
  },
  "/fonts/Montserrat-Medium.otf.gz": {
    "type": "font/otf",
    "encoding": "gzip",
    "etag": "\"1ee9a-Ibrbs+ktS3+nIp4YlfqDpiydg+A\"",
    "mtime": "2022-12-12T15:05:34.818Z",
    "size": 126618,
    "path": "../public/fonts/Montserrat-Medium.otf.gz"
  },
  "/fonts/Montserrat.ttf": {
    "type": "font/ttf",
    "etag": "\"6039c-sw9jonvNxhwkWNDd+75zigHjlxQ\"",
    "mtime": "2022-12-12T15:05:33.826Z",
    "size": 394140,
    "path": "../public/fonts/Montserrat.ttf"
  },
  "/fonts/Montserrat.ttf.br": {
    "type": "font/ttf",
    "encoding": "br",
    "etag": "\"206ad-PNmY4b8rhm/y4n5laJjbCvnMdn8\"",
    "mtime": "2022-12-12T15:05:37.006Z",
    "size": 132781,
    "path": "../public/fonts/Montserrat.ttf.br"
  },
  "/fonts/Montserrat.ttf.gz": {
    "type": "font/ttf",
    "encoding": "gzip",
    "etag": "\"28258-7ooJYwlbOUuHDdC+cfNrUSCmNYI\"",
    "mtime": "2022-12-12T15:05:35.726Z",
    "size": 164440,
    "path": "../public/fonts/Montserrat.ttf.gz"
  },
  "/fonts/Saira-VariableFont_wdth,wght.ttf": {
    "type": "font/ttf",
    "etag": "\"75a78-BQJlpmOg1aZweXIdQmwW64wwh+0\"",
    "mtime": "2022-12-12T15:05:33.826Z",
    "size": 481912,
    "path": "../public/fonts/Saira-VariableFont_wdth,wght.ttf"
  },
  "/fonts/Saira-VariableFont_wdth,wght.ttf.br": {
    "type": "font/ttf",
    "encoding": "br",
    "etag": "\"2b1ba-6IA33EWBw6lhytPRIcVQyHBP/00\"",
    "mtime": "2022-12-12T15:05:38.562Z",
    "size": 176570,
    "path": "../public/fonts/Saira-VariableFont_wdth,wght.ttf.br"
  },
  "/fonts/Saira-VariableFont_wdth,wght.ttf.gz": {
    "type": "font/ttf",
    "encoding": "gzip",
    "etag": "\"35c7e-M07m4V6asuu9h3YUOK3iCrBePGI\"",
    "mtime": "2022-12-12T15:05:37.042Z",
    "size": 220286,
    "path": "../public/fonts/Saira-VariableFont_wdth,wght.ttf.gz"
  },
  "/_nuxt/AppSlot.6830705f.js": {
    "type": "application/javascript",
    "etag": "\"162-+D1RG63ix3ZSHMkvKdYLCHDUnac\"",
    "mtime": "2022-12-12T15:05:33.802Z",
    "size": 354,
    "path": "../public/_nuxt/AppSlot.6830705f.js"
  },
  "/_nuxt/ContentDoc.d70336fb.js": {
    "type": "application/javascript",
    "etag": "\"957-361H2uDxBE6a5gATK8t0svfMX5g\"",
    "mtime": "2022-12-12T15:05:33.802Z",
    "size": 2391,
    "path": "../public/_nuxt/ContentDoc.d70336fb.js"
  },
  "/_nuxt/ContentDoc.d70336fb.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"3c2-kv9k2Dk3CpCvNnZIUXGC9BIxIa8\"",
    "mtime": "2022-12-12T15:05:39.230Z",
    "size": 962,
    "path": "../public/_nuxt/ContentDoc.d70336fb.js.br"
  },
  "/_nuxt/ContentDoc.d70336fb.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"42e-tzqSbOzxtukd1b4NJwJvlC/+L8g\"",
    "mtime": "2022-12-12T15:05:39.226Z",
    "size": 1070,
    "path": "../public/_nuxt/ContentDoc.d70336fb.js.gz"
  },
  "/_nuxt/ContentList.cc68efee.js": {
    "type": "application/javascript",
    "etag": "\"3ad-YpNbZFDGrpY7NdzXnRwIAdtcXfs\"",
    "mtime": "2022-12-12T15:05:33.802Z",
    "size": 941,
    "path": "../public/_nuxt/ContentList.cc68efee.js"
  },
  "/_nuxt/ContentNavigation.31d3a191.js": {
    "type": "application/javascript",
    "etag": "\"5669-1Q94iJXs4nMJdHrv88ES1PW2vEI\"",
    "mtime": "2022-12-12T15:05:33.802Z",
    "size": 22121,
    "path": "../public/_nuxt/ContentNavigation.31d3a191.js"
  },
  "/_nuxt/ContentNavigation.31d3a191.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"f93-CTBmKs6YYf7QWZPGo/VJNwyEgv4\"",
    "mtime": "2022-12-12T15:05:39.270Z",
    "size": 3987,
    "path": "../public/_nuxt/ContentNavigation.31d3a191.js.br"
  },
  "/_nuxt/ContentNavigation.31d3a191.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"11b8-gjIcudBPqDfyMHWWTytEbyjxo3A\"",
    "mtime": "2022-12-12T15:05:39.234Z",
    "size": 4536,
    "path": "../public/_nuxt/ContentNavigation.31d3a191.js.gz"
  },
  "/_nuxt/ContentNavigation.a244f75e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2f5d-SctwtJFeYAxLtUU5vjZSue4eYR0\"",
    "mtime": "2022-12-12T15:05:33.802Z",
    "size": 12125,
    "path": "../public/_nuxt/ContentNavigation.a244f75e.css"
  },
  "/_nuxt/ContentNavigation.a244f75e.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"894-kMLFQ4snXyNuGKjtytcodWBBMtE\"",
    "mtime": "2022-12-12T15:05:39.290Z",
    "size": 2196,
    "path": "../public/_nuxt/ContentNavigation.a244f75e.css.br"
  },
  "/_nuxt/ContentNavigation.a244f75e.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"9a2-HJvpSl1e64MEYvVBeehuLTPiYGg\"",
    "mtime": "2022-12-12T15:05:39.270Z",
    "size": 2466,
    "path": "../public/_nuxt/ContentNavigation.a244f75e.css.gz"
  },
  "/_nuxt/ContentQuery.baed8608.js": {
    "type": "application/javascript",
    "etag": "\"8f5-x3wuNOROCsFKH7pPh26Cn5OP74I\"",
    "mtime": "2022-12-12T15:05:33.794Z",
    "size": 2293,
    "path": "../public/_nuxt/ContentQuery.baed8608.js"
  },
  "/_nuxt/ContentQuery.baed8608.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"33b-9RH8J0o6Lx7Nla7fGfTXRgyjoDY\"",
    "mtime": "2022-12-12T15:05:39.298Z",
    "size": 827,
    "path": "../public/_nuxt/ContentQuery.baed8608.js.br"
  },
  "/_nuxt/ContentQuery.baed8608.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"3b4-Va3w4bBt+khsvCKo47eW4A7qIso\"",
    "mtime": "2022-12-12T15:05:39.294Z",
    "size": 948,
    "path": "../public/_nuxt/ContentQuery.baed8608.js.gz"
  },
  "/_nuxt/ContentRenderer.7fdf5d6b.js": {
    "type": "application/javascript",
    "etag": "\"4f2-pY9tPr66+xZBvi50LLEyqDh2Y0A\"",
    "mtime": "2022-12-12T15:05:33.794Z",
    "size": 1266,
    "path": "../public/_nuxt/ContentRenderer.7fdf5d6b.js"
  },
  "/_nuxt/ContentRenderer.7fdf5d6b.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"21c-ex1CfgtO9B46EhcchWQhzNDaTzM\"",
    "mtime": "2022-12-12T15:05:39.302Z",
    "size": 540,
    "path": "../public/_nuxt/ContentRenderer.7fdf5d6b.js.br"
  },
  "/_nuxt/ContentRenderer.7fdf5d6b.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"27e-ndG+0Dbipx6cHNY742/M6gEnpsc\"",
    "mtime": "2022-12-12T15:05:39.302Z",
    "size": 638,
    "path": "../public/_nuxt/ContentRenderer.7fdf5d6b.js.gz"
  },
  "/_nuxt/ContentRendererMarkdown.ccf48d62.js": {
    "type": "application/javascript",
    "etag": "\"568b-RYAdnQ6xyItEGPIcamG9aq/JfIY\"",
    "mtime": "2022-12-12T15:05:33.794Z",
    "size": 22155,
    "path": "../public/_nuxt/ContentRendererMarkdown.ccf48d62.js"
  },
  "/_nuxt/ContentRendererMarkdown.ccf48d62.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"1b82-7yOlsxM4cQpnYa3QTPNb7dAH0OQ\"",
    "mtime": "2022-12-12T15:05:39.342Z",
    "size": 7042,
    "path": "../public/_nuxt/ContentRendererMarkdown.ccf48d62.js.br"
  },
  "/_nuxt/ContentRendererMarkdown.ccf48d62.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"1eac-emGAzB7ZwW3tN1EgKalTj6+3EyM\"",
    "mtime": "2022-12-12T15:05:39.306Z",
    "size": 7852,
    "path": "../public/_nuxt/ContentRendererMarkdown.ccf48d62.js.gz"
  },
  "/_nuxt/ContentSlot.68371b3b.js": {
    "type": "application/javascript",
    "etag": "\"3e8-XiHkCgQCMjE7To7SWSAmJ0txxGM\"",
    "mtime": "2022-12-12T15:05:33.790Z",
    "size": 1000,
    "path": "../public/_nuxt/ContentSlot.68371b3b.js"
  },
  "/_nuxt/Counter.b2af1467.js": {
    "type": "application/javascript",
    "etag": "\"43c-KiTBx0sFmxiF/+ShIV/36MuIeVY\"",
    "mtime": "2022-12-12T15:05:33.790Z",
    "size": 1084,
    "path": "../public/_nuxt/Counter.b2af1467.js"
  },
  "/_nuxt/Counter.b2af1467.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"199-Yc6lMX+xYfKERCu6RHr3/lX9XnA\"",
    "mtime": "2022-12-12T15:05:39.350Z",
    "size": 409,
    "path": "../public/_nuxt/Counter.b2af1467.js.br"
  },
  "/_nuxt/Counter.b2af1467.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"1ec-WDfDfqWqSBy+mcEjle8MvvFg5PM\"",
    "mtime": "2022-12-12T15:05:39.346Z",
    "size": 492,
    "path": "../public/_nuxt/Counter.b2af1467.js.gz"
  },
  "/_nuxt/Counter.c1bacb3c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"527-ybm2hHCDI7OEYcOG2J8vyWh+/mc\"",
    "mtime": "2022-12-12T15:05:33.790Z",
    "size": 1319,
    "path": "../public/_nuxt/Counter.c1bacb3c.css"
  },
  "/_nuxt/Counter.c1bacb3c.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"1a2-y5XdZxZ5HKGrRJYFEjzn9dbLIEA\"",
    "mtime": "2022-12-12T15:05:39.354Z",
    "size": 418,
    "path": "../public/_nuxt/Counter.c1bacb3c.css.br"
  },
  "/_nuxt/Counter.c1bacb3c.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1e3-Kp5saDgmIUNCCJ1BPzLFaazsgfY\"",
    "mtime": "2022-12-12T15:05:39.350Z",
    "size": 483,
    "path": "../public/_nuxt/Counter.c1bacb3c.css.gz"
  },
  "/_nuxt/DocumentDrivenEmpty.c4415bb0.js": {
    "type": "application/javascript",
    "etag": "\"120-G1FADLcpv7x3W9r/gAdA+HSbls4\"",
    "mtime": "2022-12-12T15:05:33.790Z",
    "size": 288,
    "path": "../public/_nuxt/DocumentDrivenEmpty.c4415bb0.js"
  },
  "/_nuxt/DocumentDrivenNotFound.95f5ab3b.js": {
    "type": "application/javascript",
    "etag": "\"9f-TVs09WSX5asFIl0yHQI5rNfjRig\"",
    "mtime": "2022-12-12T15:05:33.790Z",
    "size": 159,
    "path": "../public/_nuxt/DocumentDrivenNotFound.95f5ab3b.js"
  },
  "/_nuxt/EmailButton.bf64bb8d.js": {
    "type": "application/javascript",
    "etag": "\"15c-VnHqLUOrHTzrDYixYTfAFSzaqps\"",
    "mtime": "2022-12-12T15:05:33.790Z",
    "size": 348,
    "path": "../public/_nuxt/EmailButton.bf64bb8d.js"
  },
  "/_nuxt/Footer.81bfc688.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5bf-4EY9ozmPQybXuoRbi7ZF0rDeOms\"",
    "mtime": "2022-12-12T15:05:33.790Z",
    "size": 1471,
    "path": "../public/_nuxt/Footer.81bfc688.css"
  },
  "/_nuxt/Footer.81bfc688.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"1c2-99d9tKxFcx1UEEnZpVxoG62iV/g\"",
    "mtime": "2022-12-12T15:05:39.362Z",
    "size": 450,
    "path": "../public/_nuxt/Footer.81bfc688.css.br"
  },
  "/_nuxt/Footer.81bfc688.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"237-Q4DFCYpb/YMcJubm2C+mxG71AhE\"",
    "mtime": "2022-12-12T15:05:39.358Z",
    "size": 567,
    "path": "../public/_nuxt/Footer.81bfc688.css.gz"
  },
  "/_nuxt/Footer.ade8225f.js": {
    "type": "application/javascript",
    "etag": "\"1e7-ZQ9DRwFOQJebvfaN40YXIBOPLRk\"",
    "mtime": "2022-12-12T15:05:33.786Z",
    "size": 487,
    "path": "../public/_nuxt/Footer.ade8225f.js"
  },
  "/_nuxt/Header.3993a4e9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c20-zd7R2Q3OP3bANSp5z0tqd7Ehsew\"",
    "mtime": "2022-12-12T15:05:33.786Z",
    "size": 3104,
    "path": "../public/_nuxt/Header.3993a4e9.css"
  },
  "/_nuxt/Header.3993a4e9.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"328-gnXuiLBL7HUMdM4RgLDGbuPJeV4\"",
    "mtime": "2022-12-12T15:05:39.370Z",
    "size": 808,
    "path": "../public/_nuxt/Header.3993a4e9.css.br"
  },
  "/_nuxt/Header.3993a4e9.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"3bb-EkdH7sIL5A6dCn4hZSUDsyCSDbI\"",
    "mtime": "2022-12-12T15:05:39.362Z",
    "size": 955,
    "path": "../public/_nuxt/Header.3993a4e9.css.gz"
  },
  "/_nuxt/Header.423f89d1.js": {
    "type": "application/javascript",
    "etag": "\"29c-d2BnSPbDVX5jyGm5kTjo9G/xEJM\"",
    "mtime": "2022-12-12T15:05:33.786Z",
    "size": 668,
    "path": "../public/_nuxt/Header.423f89d1.js"
  },
  "/_nuxt/Listing.e142675a.js": {
    "type": "application/javascript",
    "etag": "\"d4-t05kiaI8DdHA8XgCB+/PnJ4oggI\"",
    "mtime": "2022-12-12T15:05:33.786Z",
    "size": 212,
    "path": "../public/_nuxt/Listing.e142675a.js"
  },
  "/_nuxt/Markdown.52313247.js": {
    "type": "application/javascript",
    "etag": "\"165-hQhHvDDdZr46BXCdWVN3wrkFG4A\"",
    "mtime": "2022-12-12T15:05:33.770Z",
    "size": 357,
    "path": "../public/_nuxt/Markdown.52313247.js"
  },
  "/_nuxt/Nav.533079e9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"910-ok7eUQ6KoCs0q5A14w2qmh9j5pU\"",
    "mtime": "2022-12-12T15:05:33.770Z",
    "size": 2320,
    "path": "../public/_nuxt/Nav.533079e9.css"
  },
  "/_nuxt/Nav.533079e9.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"281-dNjDcJVrVYzg+rx+LZyLZ0LBwTY\"",
    "mtime": "2022-12-12T15:05:39.378Z",
    "size": 641,
    "path": "../public/_nuxt/Nav.533079e9.css.br"
  },
  "/_nuxt/Nav.533079e9.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2ee-F+XKdPhipPLsO3G5AfbTwpqQG8o\"",
    "mtime": "2022-12-12T15:05:39.374Z",
    "size": 750,
    "path": "../public/_nuxt/Nav.533079e9.css.gz"
  },
  "/_nuxt/Nav.b3f4be5d.js": {
    "type": "application/javascript",
    "etag": "\"2e1-I4Jxjpth2CU0ZaUkIEFDvpqtf/o\"",
    "mtime": "2022-12-12T15:05:33.770Z",
    "size": 737,
    "path": "../public/_nuxt/Nav.b3f4be5d.js"
  },
  "/_nuxt/Project.a3adead7.js": {
    "type": "application/javascript",
    "etag": "\"441-0jvCP3VyqqdGB38UzyZNWgT0oRE\"",
    "mtime": "2022-12-12T15:05:33.770Z",
    "size": 1089,
    "path": "../public/_nuxt/Project.a3adead7.js"
  },
  "/_nuxt/Project.a3adead7.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"226-4JNjO/7eWwqL+ChRzP9ji2xIbY0\"",
    "mtime": "2022-12-12T15:05:39.382Z",
    "size": 550,
    "path": "../public/_nuxt/Project.a3adead7.js.br"
  },
  "/_nuxt/Project.a3adead7.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"25d-lTeX7RhH4O/GcwfmAD5NMGtfddM\"",
    "mtime": "2022-12-12T15:05:39.378Z",
    "size": 605,
    "path": "../public/_nuxt/Project.a3adead7.js.gz"
  },
  "/_nuxt/Project.a8cbdf78.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a0f-n/HbnnT0HvFuWJaoThJ0wICckpA\"",
    "mtime": "2022-12-12T15:05:33.770Z",
    "size": 2575,
    "path": "../public/_nuxt/Project.a8cbdf78.css"
  },
  "/_nuxt/Project.a8cbdf78.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"2e0-uYBzcDYo2GgqRCeMa2pPaAs9dqY\"",
    "mtime": "2022-12-12T15:05:39.390Z",
    "size": 736,
    "path": "../public/_nuxt/Project.a8cbdf78.css.br"
  },
  "/_nuxt/Project.a8cbdf78.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"37e-Rt25g0s3s3lwBo8gUwduM4KLmD8\"",
    "mtime": "2022-12-12T15:05:39.382Z",
    "size": 894,
    "path": "../public/_nuxt/Project.a8cbdf78.css.gz"
  },
  "/_nuxt/ProjectExtendedSlot.7b10ff08.js": {
    "type": "application/javascript",
    "etag": "\"115-MH1eLnmLAe0HppPw9UvWrwBN8cU\"",
    "mtime": "2022-12-12T15:05:33.770Z",
    "size": 277,
    "path": "../public/_nuxt/ProjectExtendedSlot.7b10ff08.js"
  },
  "/_nuxt/ProjectSlot.a0ef13b5.js": {
    "type": "application/javascript",
    "etag": "\"172-jzFDLxMArhkajqQP7ssSgvUwTJo\"",
    "mtime": "2022-12-12T15:05:33.770Z",
    "size": 370,
    "path": "../public/_nuxt/ProjectSlot.a0ef13b5.js"
  },
  "/_nuxt/ProjectSlot.c0a7b43c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"673-Gy1bgTnBPf6AWPYPiWMVLAlEs04\"",
    "mtime": "2022-12-12T15:05:33.766Z",
    "size": 1651,
    "path": "../public/_nuxt/ProjectSlot.c0a7b43c.css"
  },
  "/_nuxt/ProjectSlot.c0a7b43c.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"1d2-BIYUmzYlUgPLCDvwJfWRDqguvjQ\"",
    "mtime": "2022-12-12T15:05:39.394Z",
    "size": 466,
    "path": "../public/_nuxt/ProjectSlot.c0a7b43c.css.br"
  },
  "/_nuxt/ProjectSlot.c0a7b43c.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"221-YOs2uN6TRyLi41AJ0OpaaPW0ExM\"",
    "mtime": "2022-12-12T15:05:39.390Z",
    "size": 545,
    "path": "../public/_nuxt/ProjectSlot.c0a7b43c.css.gz"
  },
  "/_nuxt/ProseA.f6db7a15.js": {
    "type": "application/javascript",
    "etag": "\"13d-cuT7u6b9wyhCGi549s80nWb0QXI\"",
    "mtime": "2022-12-12T15:05:33.766Z",
    "size": 317,
    "path": "../public/_nuxt/ProseA.f6db7a15.js"
  },
  "/_nuxt/ProseBlockquote.5bab4a25.js": {
    "type": "application/javascript",
    "etag": "\"f7-HWSHmSEmn0h6dcSjsbhu5+KAIuQ\"",
    "mtime": "2022-12-12T15:05:33.766Z",
    "size": 247,
    "path": "../public/_nuxt/ProseBlockquote.5bab4a25.js"
  },
  "/_nuxt/ProseCode.1292765e.js": {
    "type": "application/javascript",
    "etag": "\"174-H1kg497VPFQLWcwyBoO160+3S8o\"",
    "mtime": "2022-12-12T15:05:33.766Z",
    "size": 372,
    "path": "../public/_nuxt/ProseCode.1292765e.js"
  },
  "/_nuxt/ProseCode.e63e49c6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2e-GbvrqT5j9gSWlpa8e36U/Kv6Zx0\"",
    "mtime": "2022-12-12T15:05:33.766Z",
    "size": 46,
    "path": "../public/_nuxt/ProseCode.e63e49c6.css"
  },
  "/_nuxt/ProseCodeInline.49de4e7f.js": {
    "type": "application/javascript",
    "etag": "\"f1-kUOmI3lEB9fhRoQeNQRtgMBXy98\"",
    "mtime": "2022-12-12T15:05:33.766Z",
    "size": 241,
    "path": "../public/_nuxt/ProseCodeInline.49de4e7f.js"
  },
  "/_nuxt/ProseEm.050b6729.js": {
    "type": "application/javascript",
    "etag": "\"ea-Tg03Q9WZGPbhuQrtAFoTMgxeo38\"",
    "mtime": "2022-12-12T15:05:33.762Z",
    "size": 234,
    "path": "../public/_nuxt/ProseEm.050b6729.js"
  },
  "/_nuxt/ProseH1.ee13b75e.js": {
    "type": "application/javascript",
    "etag": "\"1a0-M53vsFTUEXAI6UeNWUidfj3mu3s\"",
    "mtime": "2022-12-12T15:05:33.762Z",
    "size": 416,
    "path": "../public/_nuxt/ProseH1.ee13b75e.js"
  },
  "/_nuxt/ProseH2.4fb28f11.js": {
    "type": "application/javascript",
    "etag": "\"1a0-4TipvOdWQYmdETEu9saicYJA/Wg\"",
    "mtime": "2022-12-12T15:05:33.762Z",
    "size": 416,
    "path": "../public/_nuxt/ProseH2.4fb28f11.js"
  },
  "/_nuxt/ProseH3.f7b2055b.js": {
    "type": "application/javascript",
    "etag": "\"1a0-N6LaqDJmBhQXYYfDBT/utwzsLNs\"",
    "mtime": "2022-12-12T15:05:33.762Z",
    "size": 416,
    "path": "../public/_nuxt/ProseH3.f7b2055b.js"
  },
  "/_nuxt/ProseH4.140d85c3.js": {
    "type": "application/javascript",
    "etag": "\"1a0-mm/C1Z3gqNCSk9M1HvVMYE0g/8s\"",
    "mtime": "2022-12-12T15:05:33.762Z",
    "size": 416,
    "path": "../public/_nuxt/ProseH4.140d85c3.js"
  },
  "/_nuxt/ProseH5.725b34c7.js": {
    "type": "application/javascript",
    "etag": "\"1a0-m2HRhxT/sVEDalKPSRMxuY1aVsI\"",
    "mtime": "2022-12-12T15:05:33.750Z",
    "size": 416,
    "path": "../public/_nuxt/ProseH5.725b34c7.js"
  },
  "/_nuxt/ProseH6.97e78e09.js": {
    "type": "application/javascript",
    "etag": "\"1a0-cNIS8n3JssgX3MJOQrQm5oTc+h0\"",
    "mtime": "2022-12-12T15:05:33.746Z",
    "size": 416,
    "path": "../public/_nuxt/ProseH6.97e78e09.js"
  },
  "/_nuxt/ProseHr.0b4f9e2a.js": {
    "type": "application/javascript",
    "etag": "\"cb-HhdxvQsvMDSzP/udHKaYz4UQ39M\"",
    "mtime": "2022-12-12T15:05:33.746Z",
    "size": 203,
    "path": "../public/_nuxt/ProseHr.0b4f9e2a.js"
  },
  "/_nuxt/ProseImg.cf35da60.js": {
    "type": "application/javascript",
    "etag": "\"185-N+C6Kg8NdT3UrCvPYZcnwbrh0uI\"",
    "mtime": "2022-12-12T15:05:33.746Z",
    "size": 389,
    "path": "../public/_nuxt/ProseImg.cf35da60.js"
  },
  "/_nuxt/ProseLi.6e448af1.js": {
    "type": "application/javascript",
    "etag": "\"ea-RlosEJBxhPndYUDM2hvzPpwXXgM\"",
    "mtime": "2022-12-12T15:05:33.746Z",
    "size": 234,
    "path": "../public/_nuxt/ProseLi.6e448af1.js"
  },
  "/_nuxt/ProseOl.4cf0f5c0.js": {
    "type": "application/javascript",
    "etag": "\"ef-EDcttud6rPIKUzayxaeeKE4dzfk\"",
    "mtime": "2022-12-12T15:05:33.746Z",
    "size": 239,
    "path": "../public/_nuxt/ProseOl.4cf0f5c0.js"
  },
  "/_nuxt/ProseP.91b958a1.js": {
    "type": "application/javascript",
    "etag": "\"e9-nK1cU7NvSwByJrVd4/4vY+tlBTo\"",
    "mtime": "2022-12-12T15:05:33.746Z",
    "size": 233,
    "path": "../public/_nuxt/ProseP.91b958a1.js"
  },
  "/_nuxt/ProseStrong.d4cc2cc3.js": {
    "type": "application/javascript",
    "etag": "\"ee-/VWi0Y7ZTk5nFmHQLF2OJ0AhnVs\"",
    "mtime": "2022-12-12T15:05:33.746Z",
    "size": 238,
    "path": "../public/_nuxt/ProseStrong.d4cc2cc3.js"
  },
  "/_nuxt/ProseTable.889fafe3.js": {
    "type": "application/javascript",
    "etag": "\"ed-vdToTXJjYcEPAH6cllMlcgBV5rg\"",
    "mtime": "2022-12-12T15:05:33.742Z",
    "size": 237,
    "path": "../public/_nuxt/ProseTable.889fafe3.js"
  },
  "/_nuxt/ProseTbody.a5df168e.js": {
    "type": "application/javascript",
    "etag": "\"f2-ksV/cIUgJXclCHIfyRJSXy6W2Ds\"",
    "mtime": "2022-12-12T15:05:33.742Z",
    "size": 242,
    "path": "../public/_nuxt/ProseTbody.a5df168e.js"
  },
  "/_nuxt/ProseTd.0f2a8e77.js": {
    "type": "application/javascript",
    "etag": "\"ea-TcqjdC7bN9OjJGIu2cI1OKfTS0w\"",
    "mtime": "2022-12-12T15:05:33.742Z",
    "size": 234,
    "path": "../public/_nuxt/ProseTd.0f2a8e77.js"
  },
  "/_nuxt/ProseTh.a433402b.js": {
    "type": "application/javascript",
    "etag": "\"ea-7Ox4Xr++hCvmiSvE2P7hufH6guo\"",
    "mtime": "2022-12-12T15:05:33.742Z",
    "size": 234,
    "path": "../public/_nuxt/ProseTh.a433402b.js"
  },
  "/_nuxt/ProseThead.ee7b7024.js": {
    "type": "application/javascript",
    "etag": "\"ed-ab5n55s4HhvTADc1gyja/zZD5Jg\"",
    "mtime": "2022-12-12T15:05:33.722Z",
    "size": 237,
    "path": "../public/_nuxt/ProseThead.ee7b7024.js"
  },
  "/_nuxt/ProseTr.1bfcd45d.js": {
    "type": "application/javascript",
    "etag": "\"ea-as5+8wgMHL91zbpPH7xfHyJiSzY\"",
    "mtime": "2022-12-12T15:05:33.722Z",
    "size": 234,
    "path": "../public/_nuxt/ProseTr.1bfcd45d.js"
  },
  "/_nuxt/ProseUl.7c95995b.js": {
    "type": "application/javascript",
    "etag": "\"ea-4ktfdQ+I5pZi7bbZEZjoc33yhhE\"",
    "mtime": "2022-12-12T15:05:33.722Z",
    "size": 234,
    "path": "../public/_nuxt/ProseUl.7c95995b.js"
  },
  "/_nuxt/Technologies.a9076723.js": {
    "type": "application/javascript",
    "etag": "\"3f7-/hdTFPRdDJCokXGp72k8fhoQ3ko\"",
    "mtime": "2022-12-12T15:05:33.722Z",
    "size": 1015,
    "path": "../public/_nuxt/Technologies.a9076723.js"
  },
  "/_nuxt/Technologies.da7733ea.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"77b-VElER4CgFZRw9/Va3tqNm08OV48\"",
    "mtime": "2022-12-12T15:05:33.722Z",
    "size": 1915,
    "path": "../public/_nuxt/Technologies.da7733ea.css"
  },
  "/_nuxt/Technologies.da7733ea.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"23b-67EZJulwKi72zr5eWei0072r6Q8\"",
    "mtime": "2022-12-12T15:05:39.406Z",
    "size": 571,
    "path": "../public/_nuxt/Technologies.da7733ea.css.br"
  },
  "/_nuxt/Technologies.da7733ea.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"28a-LuzRsqO1OYWLREcElNXEpSw9MhA\"",
    "mtime": "2022-12-12T15:05:39.402Z",
    "size": 650,
    "path": "../public/_nuxt/Technologies.da7733ea.css.gz"
  },
  "/_nuxt/Tegeltje.0fc1c892.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"866-9PR04HrdtY9K6ajg+VyunrVdP9o\"",
    "mtime": "2022-12-12T15:05:33.718Z",
    "size": 2150,
    "path": "../public/_nuxt/Tegeltje.0fc1c892.css"
  },
  "/_nuxt/Tegeltje.0fc1c892.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"264-kPDBab4qSf5rgFQ5PQJlhL4cA2Y\"",
    "mtime": "2022-12-12T15:05:39.410Z",
    "size": 612,
    "path": "../public/_nuxt/Tegeltje.0fc1c892.css.br"
  },
  "/_nuxt/Tegeltje.0fc1c892.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2d5-2d0VKkowe7T9iNW5XAy5f2S4Ss8\"",
    "mtime": "2022-12-12T15:05:39.406Z",
    "size": 725,
    "path": "../public/_nuxt/Tegeltje.0fc1c892.css.gz"
  },
  "/_nuxt/Tegeltje.1c599f40.js": {
    "type": "application/javascript",
    "etag": "\"5c9-S/hSGGFKt7VhxFRa6hEbI4FGAyo\"",
    "mtime": "2022-12-12T15:05:33.718Z",
    "size": 1481,
    "path": "../public/_nuxt/Tegeltje.1c599f40.js"
  },
  "/_nuxt/Tegeltje.1c599f40.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"2d0-R4KGC3+y4KJbt3QzOPLjqmulIkE\"",
    "mtime": "2022-12-12T15:05:39.414Z",
    "size": 720,
    "path": "../public/_nuxt/Tegeltje.1c599f40.js.br"
  },
  "/_nuxt/Tegeltje.1c599f40.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"34c-2EmyUBv8hCKFZsgLW8BFD3lqQC8\"",
    "mtime": "2022-12-12T15:05:39.410Z",
    "size": 844,
    "path": "../public/_nuxt/Tegeltje.1c599f40.js.gz"
  },
  "/_nuxt/_commonjsHelpers.fed2a411.js": {
    "type": "application/javascript",
    "etag": "\"356-cjcz7M762T5P3OLRahC3n2cznPs\"",
    "mtime": "2022-12-12T15:05:33.718Z",
    "size": 854,
    "path": "../public/_nuxt/_commonjsHelpers.fed2a411.js"
  },
  "/_nuxt/_plugin-vue_export-helper.a1a6add7.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2022-12-12T15:05:33.718Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.a1a6add7.js"
  },
  "/_nuxt/_slug_.5be9e958.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"12bf-R9DbQnrAeQ6TOnGHlB6JAf1ucQI\"",
    "mtime": "2022-12-12T15:05:33.718Z",
    "size": 4799,
    "path": "../public/_nuxt/_slug_.5be9e958.css"
  },
  "/_nuxt/_slug_.5be9e958.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"43a-rKZZ1TCTKPjBvjFUNdzlaUGI9eI\"",
    "mtime": "2022-12-12T15:05:39.422Z",
    "size": 1082,
    "path": "../public/_nuxt/_slug_.5be9e958.css.br"
  },
  "/_nuxt/_slug_.5be9e958.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"4f2-4KDeH3L8A8n2IJqIspGrw3gcDY4\"",
    "mtime": "2022-12-12T15:05:39.414Z",
    "size": 1266,
    "path": "../public/_nuxt/_slug_.5be9e958.css.gz"
  },
  "/_nuxt/_slug_.d92f8c98.js": {
    "type": "application/javascript",
    "etag": "\"a1f-4rKqtZJj2ax3qk0/llmyI/SgOjI\"",
    "mtime": "2022-12-12T15:05:33.718Z",
    "size": 2591,
    "path": "../public/_nuxt/_slug_.d92f8c98.js"
  },
  "/_nuxt/_slug_.d92f8c98.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"3fd-U1krriW/j/LxFbtin5TOTpNfhek\"",
    "mtime": "2022-12-12T15:05:39.430Z",
    "size": 1021,
    "path": "../public/_nuxt/_slug_.d92f8c98.js.br"
  },
  "/_nuxt/_slug_.d92f8c98.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"47d-lloQuT2HNlS/FuAkEepSbr/mHOQ\"",
    "mtime": "2022-12-12T15:05:39.422Z",
    "size": 1149,
    "path": "../public/_nuxt/_slug_.d92f8c98.js.gz"
  },
  "/_nuxt/about.14d94868.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"aa6-iTFiPmFzFAQYOP663lCvakgY2Ms\"",
    "mtime": "2022-12-12T15:05:33.718Z",
    "size": 2726,
    "path": "../public/_nuxt/about.14d94868.css"
  },
  "/_nuxt/about.14d94868.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"2ea-7yMPibrKkAiZ9P7DtIphH1Vrv5Q\"",
    "mtime": "2022-12-12T15:05:39.434Z",
    "size": 746,
    "path": "../public/_nuxt/about.14d94868.css.br"
  },
  "/_nuxt/about.14d94868.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"36d-eI3Vnp+YSfn/szqrxjtkcs9Ano4\"",
    "mtime": "2022-12-12T15:05:39.430Z",
    "size": 877,
    "path": "../public/_nuxt/about.14d94868.css.gz"
  },
  "/_nuxt/about.9c6fb942.js": {
    "type": "application/javascript",
    "etag": "\"841-nlO16pjxU6Yno5snaWI+SgWb6T4\"",
    "mtime": "2022-12-12T15:05:33.686Z",
    "size": 2113,
    "path": "../public/_nuxt/about.9c6fb942.js"
  },
  "/_nuxt/about.9c6fb942.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"3a2-iJENZ9YHqEyO4JBjCTwmfjHJhPs\"",
    "mtime": "2022-12-12T15:05:39.438Z",
    "size": 930,
    "path": "../public/_nuxt/about.9c6fb942.js.br"
  },
  "/_nuxt/about.9c6fb942.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"423-bcd6bh1L8FR0manZUVWW/KaA5+o\"",
    "mtime": "2022-12-12T15:05:39.434Z",
    "size": 1059,
    "path": "../public/_nuxt/about.9c6fb942.js.gz"
  },
  "/_nuxt/asyncData.b2c73ef9.js": {
    "type": "application/javascript",
    "etag": "\"9a5-Zui51ONC2MS4ryjJ+OnipB/wKxs\"",
    "mtime": "2022-12-12T15:05:33.686Z",
    "size": 2469,
    "path": "../public/_nuxt/asyncData.b2c73ef9.js"
  },
  "/_nuxt/asyncData.b2c73ef9.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"3e1-8+xeQ7Hz0D1oLQTgXsOQyAT1MHw\"",
    "mtime": "2022-12-12T15:05:39.446Z",
    "size": 993,
    "path": "../public/_nuxt/asyncData.b2c73ef9.js.br"
  },
  "/_nuxt/asyncData.b2c73ef9.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"441-uhxkbClz6Ivq//njc70DfL6FmPc\"",
    "mtime": "2022-12-12T15:05:39.438Z",
    "size": 1089,
    "path": "../public/_nuxt/asyncData.b2c73ef9.js.gz"
  },
  "/_nuxt/client-db.36394a3e.js": {
    "type": "application/javascript",
    "etag": "\"4e52-w+oT99dzP5c21qp58ni5RcQDNLs\"",
    "mtime": "2022-12-12T15:05:33.686Z",
    "size": 20050,
    "path": "../public/_nuxt/client-db.36394a3e.js"
  },
  "/_nuxt/client-db.36394a3e.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"169d-ubVdqf1PPF8+PXDIthO7lQ+cjKg\"",
    "mtime": "2022-12-12T15:05:39.474Z",
    "size": 5789,
    "path": "../public/_nuxt/client-db.36394a3e.js.br"
  },
  "/_nuxt/client-db.36394a3e.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"1bfa-yv/3cgiRTUfV477rtO1pyYA1Pp4\"",
    "mtime": "2022-12-12T15:05:39.446Z",
    "size": 7162,
    "path": "../public/_nuxt/client-db.36394a3e.js.gz"
  },
  "/_nuxt/composables.1a3249f2.js": {
    "type": "application/javascript",
    "etag": "\"61-4OWZKW9VCYfticdvLm9NbCBLMNk\"",
    "mtime": "2022-12-12T15:05:33.686Z",
    "size": 97,
    "path": "../public/_nuxt/composables.1a3249f2.js"
  },
  "/_nuxt/contact.508bd81a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"aa6-lMLwriqHh7rJZ95Fj+0C8GY+bC0\"",
    "mtime": "2022-12-12T15:05:33.686Z",
    "size": 2726,
    "path": "../public/_nuxt/contact.508bd81a.css"
  },
  "/_nuxt/contact.508bd81a.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"2ee-pGY/8qNU+WdpAsWTQ+9KkN4p6+c\"",
    "mtime": "2022-12-12T15:05:39.478Z",
    "size": 750,
    "path": "../public/_nuxt/contact.508bd81a.css.br"
  },
  "/_nuxt/contact.508bd81a.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"36c-XWehg7SJz0wJ8j4BeuvkQg6KP/A\"",
    "mtime": "2022-12-12T15:05:39.474Z",
    "size": 876,
    "path": "../public/_nuxt/contact.508bd81a.css.gz"
  },
  "/_nuxt/contact.5f782a74.js": {
    "type": "application/javascript",
    "etag": "\"81a-Po7luIbwPreCVSdN7KZQLrwc8aU\"",
    "mtime": "2022-12-12T15:05:33.682Z",
    "size": 2074,
    "path": "../public/_nuxt/contact.5f782a74.js"
  },
  "/_nuxt/contact.5f782a74.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"397-LQ+dbj4poXEs9FcznNyEY1OFdNQ\"",
    "mtime": "2022-12-12T15:05:39.486Z",
    "size": 919,
    "path": "../public/_nuxt/contact.5f782a74.js.br"
  },
  "/_nuxt/contact.5f782a74.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"41a-hfX2nMnhj0mQVns2N245ffGnI78\"",
    "mtime": "2022-12-12T15:05:39.482Z",
    "size": 1050,
    "path": "../public/_nuxt/contact.5f782a74.js.gz"
  },
  "/_nuxt/default.db57d139.js": {
    "type": "application/javascript",
    "etag": "\"234-gp+ZaGoqhKoLKgJDgMm8lr9oSv8\"",
    "mtime": "2022-12-12T15:05:33.682Z",
    "size": 564,
    "path": "../public/_nuxt/default.db57d139.js"
  },
  "/_nuxt/entry.089d8caf.js": {
    "type": "application/javascript",
    "etag": "\"26d56-vnOkpdI+9I9E6nxnp+MHUebxLi0\"",
    "mtime": "2022-12-12T15:05:33.682Z",
    "size": 159062,
    "path": "../public/_nuxt/entry.089d8caf.js"
  },
  "/_nuxt/entry.089d8caf.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"c55f-Az9AKMJChRWDW6vl7p4+2w/fUiw\"",
    "mtime": "2022-12-12T15:05:39.758Z",
    "size": 50527,
    "path": "../public/_nuxt/entry.089d8caf.js.br"
  },
  "/_nuxt/entry.089d8caf.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"de5c-npc6ld3XEcHf2QIwweWNLXFkb2k\"",
    "mtime": "2022-12-12T15:05:39.490Z",
    "size": 56924,
    "path": "../public/_nuxt/entry.089d8caf.js.gz"
  },
  "/_nuxt/entry.34fba3ce.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9b4-eXMI0GZN+BYM9YREJ1B9rdxPodI\"",
    "mtime": "2022-12-12T15:05:33.682Z",
    "size": 2484,
    "path": "../public/_nuxt/entry.34fba3ce.css"
  },
  "/_nuxt/entry.34fba3ce.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"36d-R7n9gCsgUB8h93PEgPPSb/xpasY\"",
    "mtime": "2022-12-12T15:05:39.762Z",
    "size": 877,
    "path": "../public/_nuxt/entry.34fba3ce.css.br"
  },
  "/_nuxt/entry.34fba3ce.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"40f-bpJMyVIM59wTwIMMjX/YmUA+O0o\"",
    "mtime": "2022-12-12T15:05:39.758Z",
    "size": 1039,
    "path": "../public/_nuxt/entry.34fba3ce.css.gz"
  },
  "/_nuxt/error-404.20d61768.js": {
    "type": "application/javascript",
    "etag": "\"909-DEHmeme2Qsl79nVLEomUHWxOEQI\"",
    "mtime": "2022-12-12T15:05:33.682Z",
    "size": 2313,
    "path": "../public/_nuxt/error-404.20d61768.js"
  },
  "/_nuxt/error-404.20d61768.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"3fe-7KZJHMcqwaUQoiWqHgmXbb7WqZk\"",
    "mtime": "2022-12-12T15:05:39.766Z",
    "size": 1022,
    "path": "../public/_nuxt/error-404.20d61768.js.br"
  },
  "/_nuxt/error-404.20d61768.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"4a9-cSE1I0MyjRso0O9p/2hWpygDVGU\"",
    "mtime": "2022-12-12T15:05:39.762Z",
    "size": 1193,
    "path": "../public/_nuxt/error-404.20d61768.js.gz"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2022-12-12T15:05:33.682Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.23f2309d.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"3bc-+PtU7kusFUbB35un94ic6DnOJmo\"",
    "mtime": "2022-12-12T15:05:39.774Z",
    "size": 956,
    "path": "../public/_nuxt/error-404.23f2309d.css.br"
  },
  "/_nuxt/error-404.23f2309d.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"45c-z5oOZ+Gi6a2WxNDAE518vWyYoK8\"",
    "mtime": "2022-12-12T15:05:39.770Z",
    "size": 1116,
    "path": "../public/_nuxt/error-404.23f2309d.css.gz"
  },
  "/_nuxt/error-500.406f933a.js": {
    "type": "application/javascript",
    "etag": "\"7b2-xgzPZl7GD0ecyEIbFrd/Z6MHvqM\"",
    "mtime": "2022-12-12T15:05:33.682Z",
    "size": 1970,
    "path": "../public/_nuxt/error-500.406f933a.js"
  },
  "/_nuxt/error-500.406f933a.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"377-JmgJZ/6nmcP8QfUdbm/4Y6HBgG4\"",
    "mtime": "2022-12-12T15:05:39.778Z",
    "size": 887,
    "path": "../public/_nuxt/error-500.406f933a.js.br"
  },
  "/_nuxt/error-500.406f933a.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"40a-nrRcuDeAkGRYHgcqE3pBcnrX3Kc\"",
    "mtime": "2022-12-12T15:05:39.774Z",
    "size": 1034,
    "path": "../public/_nuxt/error-500.406f933a.js.gz"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2022-12-12T15:05:33.678Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-500.aa16ed4d.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"274-yZsjQ6WX4i4AD/3U8BrVJdDowoE\"",
    "mtime": "2022-12-12T15:05:39.782Z",
    "size": 628,
    "path": "../public/_nuxt/error-500.aa16ed4d.css.br"
  },
  "/_nuxt/error-500.aa16ed4d.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2df-eP+O3+itG2vSGIOvYf5NHQYP4H0\"",
    "mtime": "2022-12-12T15:05:39.778Z",
    "size": 735,
    "path": "../public/_nuxt/error-500.aa16ed4d.css.gz"
  },
  "/_nuxt/error-component.84e677b3.js": {
    "type": "application/javascript",
    "etag": "\"501-X6cgMeyuRRhlnOc/Pjd+4t3kP9g\"",
    "mtime": "2022-12-12T15:05:33.678Z",
    "size": 1281,
    "path": "../public/_nuxt/error-component.84e677b3.js"
  },
  "/_nuxt/error-component.84e677b3.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"244-SmbeamFwX2b4GJGeV22YhmHyx0s\"",
    "mtime": "2022-12-12T15:05:39.786Z",
    "size": 580,
    "path": "../public/_nuxt/error-component.84e677b3.js.br"
  },
  "/_nuxt/error-component.84e677b3.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"29d-zg3V+1QyKFW/MIPAzIuqhaW1jPU\"",
    "mtime": "2022-12-12T15:05:39.782Z",
    "size": 669,
    "path": "../public/_nuxt/error-component.84e677b3.js.gz"
  },
  "/_nuxt/filterButtons.58e51480.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6a4-vc4yTSBiL/d1ax7CaWjvJi82wr4\"",
    "mtime": "2022-12-12T15:05:33.678Z",
    "size": 1700,
    "path": "../public/_nuxt/filterButtons.58e51480.css"
  },
  "/_nuxt/filterButtons.58e51480.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"219-5zbAOCT0FjI9cGypF/hyc4eBzBs\"",
    "mtime": "2022-12-12T15:05:39.790Z",
    "size": 537,
    "path": "../public/_nuxt/filterButtons.58e51480.css.br"
  },
  "/_nuxt/filterButtons.58e51480.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"27e-U3ouvTBCGIcodL+MvKidgztvDmI\"",
    "mtime": "2022-12-12T15:05:39.786Z",
    "size": 638,
    "path": "../public/_nuxt/filterButtons.58e51480.css.gz"
  },
  "/_nuxt/filterButtons.f4e9a7ae.js": {
    "type": "application/javascript",
    "etag": "\"a7a-sXOzGJdF+2idpDdnGT2GsC5uFNI\"",
    "mtime": "2022-12-12T15:05:33.678Z",
    "size": 2682,
    "path": "../public/_nuxt/filterButtons.f4e9a7ae.js"
  },
  "/_nuxt/filterButtons.f4e9a7ae.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"34e-z5in72UCyxrAKkIdHpO+0qxqz6g\"",
    "mtime": "2022-12-12T15:05:39.798Z",
    "size": 846,
    "path": "../public/_nuxt/filterButtons.f4e9a7ae.js.br"
  },
  "/_nuxt/filterButtons.f4e9a7ae.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"3df-qZ3zgZn1OF5PjcpcpYTlUJvz6Us\"",
    "mtime": "2022-12-12T15:05:39.794Z",
    "size": 991,
    "path": "../public/_nuxt/filterButtons.f4e9a7ae.js.gz"
  },
  "/_nuxt/index.428d12e6.js": {
    "type": "application/javascript",
    "etag": "\"99e-xHTyeqXTS5dtDpfDlyvUmCSEY3w\"",
    "mtime": "2022-12-12T15:05:33.678Z",
    "size": 2462,
    "path": "../public/_nuxt/index.428d12e6.js"
  },
  "/_nuxt/index.428d12e6.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"3c8-IXfNjCzxYMnNGFjJQkMGb5iurs0\"",
    "mtime": "2022-12-12T15:05:39.810Z",
    "size": 968,
    "path": "../public/_nuxt/index.428d12e6.js.br"
  },
  "/_nuxt/index.428d12e6.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"44e-W9oRTCkg6TA2jeZxv9fjSa/U1PU\"",
    "mtime": "2022-12-12T15:05:39.802Z",
    "size": 1102,
    "path": "../public/_nuxt/index.428d12e6.js.gz"
  },
  "/_nuxt/index.fac1e57d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"952-eqIOcdDEWsPdDT1AWYwjlTC5wCw\"",
    "mtime": "2022-12-12T15:05:33.674Z",
    "size": 2386,
    "path": "../public/_nuxt/index.fac1e57d.css"
  },
  "/_nuxt/index.fac1e57d.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"2ca-tQM9B9u9XfFuwJuOFjEIrSKnDhY\"",
    "mtime": "2022-12-12T15:05:39.818Z",
    "size": 714,
    "path": "../public/_nuxt/index.fac1e57d.css.br"
  },
  "/_nuxt/index.fac1e57d.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"35e-28pttgLJ5hORGgSlLzIp2+ew3vg\"",
    "mtime": "2022-12-12T15:05:39.810Z",
    "size": 862,
    "path": "../public/_nuxt/index.fac1e57d.css.gz"
  },
  "/_nuxt/query.643cde77.js": {
    "type": "application/javascript",
    "etag": "\"2a07-RG9U62Pt50jfKwsbcT+OuDOzpwo\"",
    "mtime": "2022-12-12T15:05:33.626Z",
    "size": 10759,
    "path": "../public/_nuxt/query.643cde77.js"
  },
  "/_nuxt/query.643cde77.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"fb2-wFhYY1/9h+Bs30zgnxHco0BDySE\"",
    "mtime": "2022-12-12T15:05:39.838Z",
    "size": 4018,
    "path": "../public/_nuxt/query.643cde77.js.br"
  },
  "/_nuxt/query.643cde77.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"11cd-qXiA028E11vpFZPw1s1iovYW4Gc\"",
    "mtime": "2022-12-12T15:05:39.818Z",
    "size": 4557,
    "path": "../public/_nuxt/query.643cde77.js.gz"
  },
  "/_nuxt/selectTech.44f5e88d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6f3-GllPbTfgPG3CMAT+gQ2K9p7vTEc\"",
    "mtime": "2022-12-12T15:05:33.626Z",
    "size": 1779,
    "path": "../public/_nuxt/selectTech.44f5e88d.css"
  },
  "/_nuxt/selectTech.44f5e88d.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"222-rDBQHUB2YGBzwhdvMuCSUXI9g2A\"",
    "mtime": "2022-12-12T15:05:39.850Z",
    "size": 546,
    "path": "../public/_nuxt/selectTech.44f5e88d.css.br"
  },
  "/_nuxt/selectTech.44f5e88d.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"28e-fIcmvC65AwXvo/C2EcxWLDNEiIU\"",
    "mtime": "2022-12-12T15:05:39.842Z",
    "size": 654,
    "path": "../public/_nuxt/selectTech.44f5e88d.css.gz"
  },
  "/_nuxt/selectTech.9b7f6f11.js": {
    "type": "application/javascript",
    "etag": "\"a69-HmN2YT29kMtnXadFEt5+uo8vAbY\"",
    "mtime": "2022-12-12T15:05:33.626Z",
    "size": 2665,
    "path": "../public/_nuxt/selectTech.9b7f6f11.js"
  },
  "/_nuxt/selectTech.9b7f6f11.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"29d-faJmTPZd2FPVE3Z3zt0Gi0xgPHs\"",
    "mtime": "2022-12-12T15:05:39.862Z",
    "size": 669,
    "path": "../public/_nuxt/selectTech.9b7f6f11.js.br"
  },
  "/_nuxt/selectTech.9b7f6f11.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"30f-+iyAT13QY1XkKetlItP+XdfTxzQ\"",
    "mtime": "2022-12-12T15:05:39.850Z",
    "size": 783,
    "path": "../public/_nuxt/selectTech.9b7f6f11.js.gz"
  },
  "/_nuxt/selectTech.vue_vue_type_style_index_0_lang.46538cec.js": {
    "type": "application/javascript",
    "etag": "\"e2c-sjb6+VBOTDa0I8/j8KdXRJcUwHc\"",
    "mtime": "2022-12-12T15:05:33.626Z",
    "size": 3628,
    "path": "../public/_nuxt/selectTech.vue_vue_type_style_index_0_lang.46538cec.js"
  },
  "/_nuxt/selectTech.vue_vue_type_style_index_0_lang.46538cec.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"3f4-1vSzuADk17kBmPLzsHWoLDTsBiM\"",
    "mtime": "2022-12-12T15:05:39.874Z",
    "size": 1012,
    "path": "../public/_nuxt/selectTech.vue_vue_type_style_index_0_lang.46538cec.js.br"
  },
  "/_nuxt/selectTech.vue_vue_type_style_index_0_lang.46538cec.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"47b-+rE4PoklkuXLAmjpPICpaWJVuLc\"",
    "mtime": "2022-12-12T15:05:39.862Z",
    "size": 1147,
    "path": "../public/_nuxt/selectTech.vue_vue_type_style_index_0_lang.46538cec.js.gz"
  },
  "/_nuxt/textSearch.4ee5e333.js": {
    "type": "application/javascript",
    "etag": "\"255-SAKUXwEExDqnZAhEmdXei/NmbFc\"",
    "mtime": "2022-12-12T15:05:33.622Z",
    "size": 597,
    "path": "../public/_nuxt/textSearch.4ee5e333.js"
  },
  "/_nuxt/utils.68e78b26.js": {
    "type": "application/javascript",
    "etag": "\"90f-jZ8ReAavJ+aKqPjIKpUalHsljaI\"",
    "mtime": "2022-12-12T15:05:33.622Z",
    "size": 2319,
    "path": "../public/_nuxt/utils.68e78b26.js"
  },
  "/_nuxt/utils.68e78b26.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"3b1-LdPdWbEMR4ouLQtygPV3Uw87h2E\"",
    "mtime": "2022-12-12T15:05:39.878Z",
    "size": 945,
    "path": "../public/_nuxt/utils.68e78b26.js.br"
  },
  "/_nuxt/utils.68e78b26.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"423-YxEpXVpgqAIIt2W2YjC8NXbXTZk\"",
    "mtime": "2022-12-12T15:05:39.874Z",
    "size": 1059,
    "path": "../public/_nuxt/utils.68e78b26.js.gz"
  },
  "/_nuxt/web-socket.aca860e9.js": {
    "type": "application/javascript",
    "etag": "\"34e-MQSqFsXhC+XzZ4hRKXhKglAg6tI\"",
    "mtime": "2022-12-12T15:05:33.622Z",
    "size": 846,
    "path": "../public/_nuxt/web-socket.aca860e9.js"
  },
  "/_nuxt/welcome.00e98bee.js": {
    "type": "application/javascript",
    "etag": "\"17a18-EhVtp2Qj7rW2DEKV53VcWIsCqEI\"",
    "mtime": "2022-12-12T15:05:33.622Z",
    "size": 96792,
    "path": "../public/_nuxt/welcome.00e98bee.js"
  },
  "/_nuxt/welcome.00e98bee.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"2e5b-MYUyA/ds92r0gHOi7cAG78ObBk4\"",
    "mtime": "2022-12-12T15:05:40.010Z",
    "size": 11867,
    "path": "../public/_nuxt/welcome.00e98bee.js.br"
  },
  "/_nuxt/welcome.00e98bee.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"3ec9-tKxKECP/iRD8KfU1f8BV9kz8Ndg\"",
    "mtime": "2022-12-12T15:05:39.886Z",
    "size": 16073,
    "path": "../public/_nuxt/welcome.00e98bee.js.gz"
  },
  "/img/bootleg.JPG": {
    "type": "image/jpeg",
    "etag": "\"6ca1-vkyRAlGRyC72bl/o03MEnF67ug8\"",
    "mtime": "2022-12-12T15:05:33.822Z",
    "size": 27809,
    "path": "../public/img/bootleg.JPG"
  },
  "/img/bootleg.JPG.br": {
    "type": "image/jpeg",
    "encoding": "br",
    "etag": "\"2d51-ZQSToyTKK/jTVDAHsU5XRyOVBzc\"",
    "mtime": "2022-12-12T15:05:38.606Z",
    "size": 11601,
    "path": "../public/img/bootleg.JPG.br"
  },
  "/img/bootleg.JPG.gz": {
    "type": "image/jpeg",
    "encoding": "gzip",
    "etag": "\"2e1a-6P7dqKP9/jTsQ51+IrRAIe/twrU\"",
    "mtime": "2022-12-12T15:05:38.566Z",
    "size": 11802,
    "path": "../public/img/bootleg.JPG.gz"
  },
  "/img/bootleg.PNG": {
    "type": "image/png",
    "etag": "\"1b785-H5nwDVgZFYMGvvTkpikEf+dTsmE\"",
    "mtime": "2022-12-12T15:05:33.822Z",
    "size": 112517,
    "path": "../public/img/bootleg.PNG"
  },
  "/img/bootleg.PNG.br": {
    "type": "image/png",
    "encoding": "br",
    "etag": "\"17462-Jt71WKOjMpSnWlUiH3oG0ExIA8A\"",
    "mtime": "2022-12-12T15:05:38.958Z",
    "size": 95330,
    "path": "../public/img/bootleg.PNG.br"
  },
  "/img/bootleg.PNG.gz": {
    "type": "image/png",
    "encoding": "gzip",
    "etag": "\"1800d-yt7m1+zBu04RNA/djA5RwLZU98s\"",
    "mtime": "2022-12-12T15:05:38.614Z",
    "size": 98317,
    "path": "../public/img/bootleg.PNG.gz"
  },
  "/img/test.jpg": {
    "type": "image/jpeg",
    "etag": "\"1131f-2uj/DVpLJtXeK3iLEVYvEf/4uHA\"",
    "mtime": "2022-12-12T15:05:33.822Z",
    "size": 70431,
    "path": "../public/img/test.jpg"
  },
  "/img/test.jpg.br": {
    "type": "image/jpeg",
    "encoding": "br",
    "etag": "\"f959-eBlncqHjpxzzKjJMCTvd3tE5eyU\"",
    "mtime": "2022-12-12T15:05:39.226Z",
    "size": 63833,
    "path": "../public/img/test.jpg.br"
  },
  "/img/test.jpg.gz": {
    "type": "image/jpeg",
    "encoding": "gzip",
    "etag": "\"fae1-kHl17FB9I2N8CWsfV9XhYLclAyU\"",
    "mtime": "2022-12-12T15:05:38.962Z",
    "size": 64225,
    "path": "../public/img/test.jpg.gz"
  },
  "/api/_content/cache.json": {
    "type": "application/json",
    "etag": "\"a337-fr3eA5WFQHismMs3RhISS7+TN2E\"",
    "mtime": "2022-12-12T15:05:41.422Z",
    "size": 41783,
    "path": "../public/api/_content/cache.json"
  },
  "/api/_content/cache.json.br": {
    "type": "application/json",
    "encoding": "br",
    "etag": "\"636-GXv9SAZe556S/e7wrEH0gUae06c\"",
    "mtime": "2022-12-12T15:05:41.462Z",
    "size": 1590,
    "path": "../public/api/_content/cache.json.br"
  },
  "/api/_content/cache.json.gz": {
    "type": "application/json",
    "encoding": "gzip",
    "etag": "\"7f3-/+ik0/HVg+LguQWBHBOaBnWzYGA\"",
    "mtime": "2022-12-12T15:05:41.438Z",
    "size": 2035,
    "path": "../public/api/_content/cache.json.gz"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end();
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end();
      return;
    }
  }
  if (asset.type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.getHeader("ETag")) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.getHeader("Last-Modified")) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.res.getHeader("Content-Encoding")) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size && !event.res.getHeader("Content-Length")) {
    event.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const get = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj);
const _pick = (obj, condition) => Object.keys(obj).filter(condition).reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
const apply = (fn) => (data) => Array.isArray(data) ? data.map((item) => fn(item)) : fn(data);
const detectProperties = (keys) => {
  const prefixes = [];
  const properties = [];
  for (const key of keys) {
    if (["$", "_"].includes(key)) {
      prefixes.push(key);
    } else {
      properties.push(key);
    }
  }
  return { prefixes, properties };
};
const withoutKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => !properties.includes(key) && !prefixes.includes(key[0]));
};
const withKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => properties.includes(key) || prefixes.includes(key[0]));
};
const sortList = (data, params) => {
  const comperable = new Intl.Collator(params.$locale, {
    numeric: params.$numeric,
    caseFirst: params.$caseFirst,
    sensitivity: params.$sensitivity
  });
  const keys = Object.keys(params).filter((key) => !key.startsWith("$"));
  for (const key of keys) {
    data = data.sort((a, b) => {
      const values = [get(a, key), get(b, key)].map((value) => {
        if (value === null) {
          return void 0;
        }
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      });
      if (params[key] === -1) {
        values.reverse();
      }
      return comperable.compare(values[0], values[1]);
    });
  }
  return data;
};
const assertArray = (value, message = "Expected an array") => {
  if (!Array.isArray(value)) {
    throw new TypeError(message);
  }
};
const ensureArray = (value) => Array.isArray(value) ? value : value ? [value] : [];

const arrayParams = ["sort", "where", "only", "without"];
const createQuery = (fetcher, intitialParams) => {
  const queryParams = {
    ...intitialParams
  };
  for (const key of arrayParams) {
    if (queryParams[key]) {
      queryParams[key] = ensureArray(queryParams[key]);
    }
  }
  const $set = (key, fn = (v) => v) => {
    return (...values) => {
      queryParams[key] = fn(...values);
      return query;
    };
  };
  const query = {
    params: () => queryParams,
    only: $set("only", ensureArray),
    without: $set("without", ensureArray),
    where: $set("where", (q) => [...ensureArray(queryParams.where), q]),
    sort: $set("sort", (sort) => [...ensureArray(queryParams.sort), ...ensureArray(sort)]),
    limit: $set("limit", (v) => parseInt(String(v), 10)),
    skip: $set("skip", (v) => parseInt(String(v), 10)),
    find: () => fetcher(query),
    findOne: () => {
      queryParams.first = true;
      return fetcher(query);
    },
    findSurround: (surroundQuery, options) => {
      queryParams.surround = { query: surroundQuery, ...options };
      return fetcher(query);
    },
    locale: (_locale) => query.where({ _locale })
  };
  return query;
};

function createMatch(opts = {}) {
  const operators = createOperators(match, opts.operators);
  function match(item, conditions) {
    if (typeof conditions !== "object" || conditions instanceof RegExp) {
      return operators.$eq(item, conditions);
    }
    return Object.keys(conditions || {}).every((key) => {
      const condition = conditions[key];
      if (key.startsWith("$") && operators[key]) {
        const fn = operators[key];
        return typeof fn === "function" ? fn(item, condition) : false;
      }
      return match(get(item, key), condition);
    });
  }
  return match;
}
function createOperators(match, operators = {}) {
  return {
    $match: (item, condition) => match(item, condition),
    $eq: (item, condition) => condition instanceof RegExp ? condition.test(item) : item === condition,
    $ne: (item, condition) => condition instanceof RegExp ? !condition.test(item) : item !== condition,
    $not: (item, condition) => !match(item, condition),
    $and: (item, condition) => {
      assertArray(condition, "$and requires an array as condition");
      return condition.every((cond) => match(item, cond));
    },
    $or: (item, condition) => {
      assertArray(condition, "$or requires an array as condition");
      return condition.some((cond) => match(item, cond));
    },
    $in: (item, condition) => ensureArray(condition).some(
      (cond) => Array.isArray(item) ? match(item, { $contains: cond }) : match(item, cond)
    ),
    $contains: (item, condition) => {
      item = Array.isArray(item) ? item : String(item);
      return ensureArray(condition).every((i) => item.includes(i));
    },
    $icontains: (item, condition) => {
      if (typeof condition !== "string") {
        throw new TypeError("$icontains requires a string, use $contains instead");
      }
      item = String(item).toLocaleLowerCase();
      return ensureArray(condition).every((i) => item.includes(i.toLocaleLowerCase()));
    },
    $containsAny: (item, condition) => {
      assertArray(condition, "$containsAny requires an array as condition");
      item = Array.isArray(item) ? item : String(item);
      return condition.some((i) => item.includes(i));
    },
    $exists: (item, condition) => condition ? typeof item !== "undefined" : typeof item === "undefined",
    $type: (item, condition) => typeof item === String(condition),
    $regex: (item, condition) => {
      if (!(condition instanceof RegExp)) {
        const matched = String(condition).match(/\/(.*)\/([dgimsuy]*)$/);
        condition = matched ? new RegExp(matched[1], matched[2] || "") : new RegExp(condition);
      }
      return condition.test(String(item || ""));
    },
    $lt: (item, condition) => {
      return item < condition;
    },
    $lte: (item, condition) => {
      return item <= condition;
    },
    $gt: (item, condition) => {
      return item > condition;
    },
    $gte: (item, condition) => {
      return item >= condition;
    },
    ...operators || {}
  };
}

function createPipelineFetcher(getContentsList) {
  const match = createMatch();
  const surround = (data, { query, before, after }) => {
    const matchQuery = typeof query === "string" ? { _path: query } : query;
    const index = data.findIndex((item) => match(item, matchQuery));
    before = before || 1;
    after = after || 1;
    const slice = new Array(before + after).fill(null, 0);
    return index === -1 ? slice : slice.map((_, i) => data[index - before + i + Number(i >= before)] || null);
  };
  const pipelines = [
    (data, params) => data.filter((item) => ensureArray(params.where).every((matchQuery) => match(item, matchQuery))),
    (data, params) => ensureArray(params.sort).forEach((options) => sortList(data, options)),
    (data, params) => params.surround ? surround(data, params.surround) : data,
    (data, params) => params.skip ? data.slice(params.skip) : data,
    (data, params) => params.limit ? data.slice(0, params.limit) : data,
    (data, params) => apply(withoutKeys(params.without))(data),
    (data, params) => apply(withKeys(params.only))(data)
  ];
  return async (query) => {
    const data = await getContentsList();
    const params = query.params();
    const filteredData = pipelines.reduce(($data, pipe) => pipe($data, params) || $data, data);
    if (params.first) {
      return filteredData[0];
    }
    return filteredData;
  };
}

const defineTransformer = (transformer) => {
  return transformer;
};

function createTokenizer(parser, initialize, from) {
  let point = Object.assign(
    from ? Object.assign({}, from) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  const effects = {
    consume,
    enter,
    exit,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write
  };
  let state = initialize.tokenize.call(context, effects);
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  function now() {
    return Object.assign({}, point);
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }
  function main() {
    let chunkIndex;
    while (point._index < chunks.length) {
      const chunk = chunks[point._index];
      if (typeof chunk === "string") {
        chunkIndex = point._index;
        if (point._bufferIndex < 0) {
          point._bufferIndex = 0;
        }
        while (point._index === chunkIndex && point._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code) {
    state = state(code);
  }
  function consume(code) {
    if (markdownLineEnding(code)) {
      point.line++;
      point.column = 1;
      point.offset += code === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code !== -1) {
      point.column++;
      point.offset++;
    }
    if (point._bufferIndex < 0) {
      point._index++;
    } else {
      point._bufferIndex++;
      if (point._bufferIndex === chunks[point._index].length) {
        point._bufferIndex = -1;
        point._index++;
      }
    }
    context.previous = code;
  }
  function enter(type, fields) {
    const token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(["enter", token, context]);
    stack.push(token);
    return token;
  }
  function exit(type) {
    const token = stack.pop();
    token.end = now();
    context.events.push(["exit", token, context]);
    return token;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs) ? handleListOfConstructs(constructs) : "tokenize" in constructs ? handleListOfConstructs([constructs]) : handleMapOfConstructs(constructs);
      function handleMapOfConstructs(map) {
        return start;
        function start(code) {
          const def = code !== null && map[code];
          const all = code !== null && map.null;
          const list = [
            ...Array.isArray(def) ? def : def ? [def] : [],
            ...Array.isArray(all) ? all : all ? [all] : []
          ];
          return handleListOfConstructs(list)(code);
        }
      }
      function handleListOfConstructs(list) {
        listOfConstructs = list;
        constructIndex = 0;
        if (list.length === 0) {
          return bogusState;
        }
        return handleConstruct(list[constructIndex]);
      }
      function handleConstruct(construct) {
        return start;
        function start(code) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok();
          }
          return construct.tokenize.call(
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok,
            nok
          )(code);
        }
      }
      function ok(code) {
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code) {
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(
        context.events,
        from2,
        context.events.length - from2,
        construct.resolve(context.events.slice(from2), context)
      );
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      restore,
      from: startEventsIndex
    };
    function restore() {
      point = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    if (point.line in columnStart && point.column < 2) {
      point.column = columnStart[point.line];
      point.offset += columnStart[point.line] - 1;
    }
  }
}
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index = -1;
  const result = [];
  let atTab;
  while (++index < chunks.length) {
    const chunk = chunks[index];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else
      switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab)
            continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}

function initializeDocument(effects) {
  const self = this;
  const delimiter = (this.parser.delimiter || ",").charCodeAt(0);
  return enterRow;
  function enterRow(code) {
    return effects.attempt(
      { tokenize: attemptLastLine },
      (code2) => {
        effects.consume(code2);
        return enterRow;
      },
      (code2) => {
        effects.enter("row");
        return enterColumn(code2);
      }
    )(code);
  }
  function enterColumn(code) {
    effects.enter("column");
    return content(code);
  }
  function content(code) {
    if (code === null) {
      effects.exit("column");
      effects.exit("row");
      effects.consume(code);
      return content;
    }
    if (code === 34) {
      return quotedData(code);
    }
    if (code === delimiter) {
      if (self.previous === delimiter || markdownLineEnding(self.previous) || self.previous === null) {
        effects.enter("data");
        effects.exit("data");
      }
      effects.exit("column");
      effects.enter("columnSeparator");
      effects.consume(code);
      effects.exit("columnSeparator");
      effects.enter("column");
      return content;
    }
    if (markdownLineEnding(code)) {
      effects.exit("column");
      effects.enter("newline");
      effects.consume(code);
      effects.exit("newline");
      effects.exit("row");
      return enterRow;
    }
    return data(code);
  }
  function data(code) {
    effects.enter("data");
    return dataChunk(code);
  }
  function dataChunk(code) {
    if (code === null || markdownLineEnding(code) || code === delimiter) {
      effects.exit("data");
      return content(code);
    }
    if (code === 92) {
      return escapeCharacter(code);
    }
    effects.consume(code);
    return dataChunk;
  }
  function escapeCharacter(code) {
    effects.consume(code);
    return function(code2) {
      effects.consume(code2);
      return content;
    };
  }
  function quotedData(code) {
    effects.enter("quotedData");
    effects.enter("quotedDataChunk");
    effects.consume(code);
    return quotedDataChunk;
  }
  function quotedDataChunk(code) {
    if (code === 92) {
      return escapeCharacter(code);
    }
    if (code === 34) {
      return effects.attempt(
        { tokenize: attemptDoubleQuote },
        (code2) => {
          effects.exit("quotedDataChunk");
          effects.enter("quotedDataChunk");
          return quotedDataChunk(code2);
        },
        (code2) => {
          effects.consume(code2);
          effects.exit("quotedDataChunk");
          effects.exit("quotedData");
          return content;
        }
      )(code);
    }
    effects.consume(code);
    return quotedDataChunk;
  }
}
function attemptDoubleQuote(effects, ok, nok) {
  return startSequence;
  function startSequence(code) {
    if (code !== 34) {
      return nok(code);
    }
    effects.enter("quoteFence");
    effects.consume(code);
    return sequence;
  }
  function sequence(code) {
    if (code !== 34) {
      return nok(code);
    }
    effects.consume(code);
    effects.exit("quoteFence");
    return (code2) => ok(code2);
  }
}
function attemptLastLine(effects, ok, nok) {
  return enterLine;
  function enterLine(code) {
    if (!markdownSpace(code) && code !== null) {
      return nok(code);
    }
    effects.enter("emptyLine");
    return continueLine(code);
  }
  function continueLine(code) {
    if (markdownSpace(code)) {
      effects.consume(code);
      return continueLine;
    }
    if (code === null) {
      effects.exit("emptyLine");
      return ok(code);
    }
    return nok(code);
  }
}
const parse$1 = (options) => {
  return createTokenizer(
    { ...options },
    { tokenize: initializeDocument },
    void 0
  );
};

const own = {}.hasOwnProperty;
const initialPoint = {
  line: 1,
  column: 1,
  offset: 0
};
const fromCSV = function(value, encoding, options) {
  if (typeof encoding !== "string") {
    options = encoding;
    encoding = void 0;
  }
  return compiler$1()(
    postprocess(
      parse$1(options).write(preprocess()(value, encoding, true))
    )
  );
};
function compiler$1() {
  const config = {
    enter: {
      column: opener(openColumn),
      row: opener(openRow),
      data: onenterdata,
      quotedData: onenterdata
    },
    exit: {
      row: closer(),
      column: closer(),
      data: onexitdata,
      quotedData: onexitQuotedData
    }
  };
  return compile;
  function compile(events) {
    const tree = {
      type: "root",
      children: []
    };
    const stack = [tree];
    const tokenStack = [];
    const context = {
      stack,
      tokenStack,
      config,
      enter,
      exit,
      resume
    };
    let index = -1;
    while (++index < events.length) {
      const handler = config[events[index][0]];
      if (own.call(handler, events[index][1].type)) {
        handler[events[index][1].type].call(
          Object.assign(
            {
              sliceSerialize: events[index][2].sliceSerialize
            },
            context
          ),
          events[index][1]
        );
      }
    }
    if (tokenStack.length > 0) {
      const tail = tokenStack[tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point(
        events.length > 0 ? events[0][1].start : initialPoint
      ),
      end: point(
        events.length > 0 ? events[events.length - 2][1].end : initialPoint
      )
    };
    return tree;
  }
  function point(d) {
    return {
      line: d.line,
      column: d.column,
      offset: d.offset
    };
  }
  function opener(create, and) {
    return open;
    function open(token) {
      enter.call(this, create(token), token);
      if (and) {
        and.call(this, token);
      }
    }
  }
  function enter(node, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    parent.children.push(node);
    this.stack.push(node);
    this.tokenStack.push([token, errorHandler]);
    node.position = {
      start: point(token.start)
    };
    return node;
  }
  function closer(and) {
    return close;
    function close(token) {
      if (and) {
        and.call(this, token);
      }
      exit.call(this, token);
    }
  }
  function exit(token, onExitError) {
    const node = this.stack.pop();
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error(
        "Cannot close `" + token.type + "` (" + stringifyPosition({
          start: token.start,
          end: token.end
        }) + "): it\u2019s not open"
      );
    } else if (open[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open[0]);
      } else {
        const handler = open[1] || defaultOnError;
        handler.call(this, token, open[0]);
      }
    }
    node.position.end = point(token.end);
    return node;
  }
  function resume() {
    return toString(this.stack.pop());
  }
  function onenterdata(token) {
    const parent = this.stack[this.stack.length - 1];
    let tail = parent.children[parent.children.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text();
      tail.position = {
        start: point(token.start)
      };
      parent.children.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token).trim().replace(/""/g, '"');
    tail.position.end = point(token.end);
  }
  function onexitQuotedData(token) {
    const tail = this.stack.pop();
    const value = this.sliceSerialize(token);
    tail.value += this.sliceSerialize(token).trim().substring(1, value.length - 1).replace(/""/g, '"');
    tail.position.end = point(token.end);
  }
  function text() {
    return {
      type: "text",
      value: ""
    };
  }
  function openColumn() {
    return {
      type: "column",
      children: []
    };
  }
  function openRow() {
    return {
      type: "row",
      children: []
    };
  }
}
function defaultOnError(left, right) {
  if (left) {
    throw new Error(
      "Cannot close `" + left.type + "` (" + stringifyPosition({
        start: left.start,
        end: left.end
      }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is open"
    );
  } else {
    throw new Error(
      "Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is still open"
    );
  }
}

function csvParse(options) {
  const parser = (doc) => {
    return fromCSV(doc, options);
  };
  Object.assign(this, { Parser: parser });
  const toJsonObject = (tree) => {
    const [header, ...rows] = tree.children;
    const columns = header.children.map((col) => col.children[0].value);
    const data = rows.map((row) => {
      return row.children.reduce((acc, col, i) => {
        acc[String(columns[i])] = col.children[0]?.value;
        return acc;
      }, {});
    });
    return data;
  };
  const toJsonArray = (tree) => {
    const data = tree.children.map((row) => {
      return row.children.map((col) => col.children[0]?.value);
    });
    return data;
  };
  const compiler = (doc) => {
    if (options.json) {
      return toJsonObject(doc);
    }
    return toJsonArray(doc);
  };
  Object.assign(this, { Compiler: compiler });
}
const csv = defineTransformer({
  name: "csv",
  extensions: [".csv"],
  parse: async (_id, content, options = {}) => {
    const stream = unified().use(csvParse, {
      delimiter: ",",
      json: true,
      ...options
    });
    const { result } = await stream.process(content);
    return {
      _id,
      _type: "csv",
      body: result
    };
  }
});

function flattenNodeText(node) {
  if (node.type === "text") {
    return node.value || "";
  } else {
    return (node.children || []).reduce((text, child) => {
      return text.concat(flattenNodeText(child));
    }, "");
  }
}
function flattenNode(node, maxDepth = 2, _depth = 0) {
  if (!Array.isArray(node.children) || _depth === maxDepth) {
    return [node];
  }
  return [
    node,
    ...node.children.reduce((acc, child) => acc.concat(flattenNode(child, maxDepth, _depth + 1)), [])
  ];
}

const TOC_TAGS = ["h2", "h3", "h4", "h5", "h6"];
const TOC_TAGS_DEPTH = TOC_TAGS.reduce((tags, tag) => {
  tags[tag] = Number(tag.charAt(tag.length - 1));
  return tags;
}, {});
const getHeaderDepth = (node) => TOC_TAGS_DEPTH[node.tag];
const getTocTags = (depth) => {
  if (depth < 1 || depth > 5) {
    console.log(`\`toc.depth\` is set to ${depth}. It should be a number between 1 and 5. `);
    depth = 1;
  }
  return TOC_TAGS.slice(0, depth);
};
function nestHeaders(headers) {
  if (headers.length <= 1) {
    return headers;
  }
  const toc = [];
  let parent;
  headers.forEach((header) => {
    if (!parent || header.depth <= parent.depth) {
      header.children = [];
      parent = header;
      toc.push(header);
    } else {
      parent.children.push(header);
    }
  });
  toc.forEach((header) => {
    if (header.children?.length) {
      header.children = nestHeaders(header.children);
    } else {
      delete header.children;
    }
  });
  return toc;
}
function generateFlatToc(body, options) {
  const { searchDepth, depth, title = "" } = options;
  const tags = getTocTags(depth);
  const headers = flattenNode(body, searchDepth).filter((node) => tags.includes(node.tag || ""));
  const links = headers.map((node) => ({
    id: node.props?.id,
    depth: getHeaderDepth(node),
    text: flattenNodeText(node)
  }));
  return {
    title,
    searchDepth,
    depth,
    links
  };
}
function generateToc(body, options) {
  const toc = generateFlatToc(body, options);
  toc.links = nestHeaders(toc.links);
  return toc;
}

function emphasis(h, node) {
  return h(node, "em", node.attributes, all(h, node));
}

function parseThematicBlock(lang) {
  if (!lang) {
    return {
      language: void 0,
      highlights: void 0,
      fileName: void 0
    };
  }
  const language = lang.replace(/[{|[](.+)/, "").match(/^[^ \t]+(?=[ \t]|$)/);
  const highlightTokens = lang.match(/{([^}]+)}/);
  const filenameTokens = lang.match(/\[(.+)\]/);
  return {
    language: language ? language[0] : void 0,
    highlights: parseHighlightedLines(highlightTokens && highlightTokens[1]),
    filename: Array.isArray(filenameTokens) ? filenameTokens[1] : void 0
  };
}
function parseHighlightedLines(lines) {
  const lineArray = String(lines || "").split(",").filter(Boolean).flatMap((line) => {
    const [start, end] = line.trim().split("-").map((a) => Number(a.trim()));
    return Array.from({ length: (end || start) - start + 1 }).map((_, i) => start + i);
  });
  return lineArray.length ? lineArray : void 0;
}
const TAG_NAME_REGEXP = /^<\/?([A-Za-z0-9-_]+) ?[^>]*>/;
function getTagName(value) {
  const result = String(value).match(TAG_NAME_REGEXP);
  return result && result[1];
}
function wrap(nodes, loose = false) {
  const result = [];
  let index = -1;
  if (loose) {
    result.push(u("text", "\n"));
  }
  while (++index < nodes.length) {
    if (index) {
      result.push(u("text", "\n"));
    }
    result.push(nodes[index]);
  }
  if (loose && nodes.length > 0) {
    result.push(u("text", "\n"));
  }
  return result;
}

const code = (h, node) => {
  const lang = (node.lang || "") + " " + (node.meta || "");
  const { language, highlights, filename } = parseThematicBlock(lang);
  const code = node.value ? detab(node.value + "\n") : "";
  return h(
    node.position,
    "code",
    {
      language,
      filename,
      highlights,
      code
    },
    [h(node, "pre", {}, [h(node, "code", { __ignoreMap: "" }, [u("text", code)])])]
  );
};

function html(h, node) {
  const tagName = getTagName(node.value);
  if (tagName && /[A-Z]/.test(tagName)) {
    node.value = node.value.replace(tagName, kebabCase(tagName));
  }
  if (tagName === "code") {
    node.value = node.value.replace(tagName, "code-inline");
  }
  return h.dangerous ? h.augment(node, u("raw", node.value)) : null;
}

function heading(h, node) {
  return h(node, "h" + node.depth, all(h, node));
}

const SEMVER_REGEX = /^(\d+)(\.\d+)*(\.x)?$/;
const describeId = (_id) => {
  const [_source, ...parts] = _id.split(":");
  const [, filename, _extension] = parts[parts.length - 1].match(/(.*)\.([^.]+)$/);
  parts[parts.length - 1] = filename;
  const _path = parts.join("/");
  return {
    _source,
    _path,
    _extension,
    _file: _extension ? `${_path}.${_extension}` : _path
  };
};
const pathMeta = defineTransformer({
  name: "path-meta",
  extensions: [".*"],
  transform(content, options = {}) {
    const { locales = [], defaultLocale = "en" } = options;
    const { _source, _file, _path, _extension } = describeId(content._id);
    const parts = _path.split("/");
    const _locale = locales.includes(parts[0]) ? parts.shift() : defaultLocale;
    const filePath = generatePath(parts.join("/"));
    return {
      _path: filePath,
      _dir: filePath.split("/").slice(-2)[0],
      _draft: isDraft(_path),
      _partial: isPartial(_path),
      _locale,
      ...content,
      title: content.title || generateTitle(refineUrlPart(parts[parts.length - 1])),
      _source,
      _file,
      _extension
    };
  }
});
const isDraft = (path) => !!path.match(/\.draft(\/|\.|$)/);
const isPartial = (path) => path.split(/[:/]/).some((part) => part.match(/^_.*/));
const generatePath = (path, { forceLeadingSlash = true } = {}) => {
  path = path.split("/").map((part) => slugify(refineUrlPart(part), { lower: true })).join("/");
  return forceLeadingSlash ? withLeadingSlash(withoutTrailingSlash(path)) : path;
};
const generateTitle = (path) => path.split(/[\s-]/g).map(pascalCase).join(" ");
function refineUrlPart(name) {
  name = name.split(/[/:]/).pop();
  if (SEMVER_REGEX.test(name)) {
    return name;
  }
  return name.replace(/(\d+\.)?(.*)/, "$2").replace(/^index(\.draft)?$/, "").replace(/\.draft$/, "");
}

function link(h, node) {
  const props = {
    ...node.attributes || {},
    href: encode(normalizeLink(node.url))
  };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h(node, "a", props, all(h, node));
}
function normalizeLink(link2) {
  if (link2.endsWith(".md") && (isRelative(link2) || !/^https?/.test(link2) && !link2.startsWith("/"))) {
    return generatePath(link2.replace(/\.md$/, ""), { forceLeadingSlash: false });
  } else {
    return link2;
  }
}

function list(h, node) {
  const props = {};
  const name = `${node.ordered ? "ol" : "ul"}`;
  if (typeof node.start === "number" && node.start !== 1) {
    props.start = node.start;
  }
  if ((node.children || []).some((child) => typeof child.checked === "boolean")) {
    props.className = ["contains-task-list"];
  }
  return h(node, name, props, wrap(all(h, node), true));
}

function listItem(h, node, parent) {
  const result = all(h, node);
  const loose = parent ? listLoose(parent) : listItemLoose(node);
  const props = {};
  let wrapped = [];
  let index;
  let child;
  if (typeof node.checked === "boolean") {
    result.unshift(
      h({}, "input", {
        type: "checkbox",
        checked: node.checked,
        disabled: true
      })
    );
    props.className = ["task-list-item"];
  }
  const length = result.length;
  index = -1;
  while (++index < length) {
    child = result[index];
    if (child.tagName === "p" && !loose) {
      wrapped = wrapped.concat(child.children || []);
    } else {
      wrapped.push(child);
    }
  }
  return h(node, "li", props, wrapped);
}
function listLoose(node) {
  let loose = node.spread;
  const children = node.children;
  const length = children.length;
  let index = -1;
  while (!loose && ++index < length) {
    loose = listItemLoose(children[index]);
  }
  return loose;
}
function listItemLoose(node) {
  const spread = node.spread;
  const children = node.children || [];
  return spread === void 0 || spread === null ? children.length > 1 : spread;
}

function table(h, node) {
  const rows = node.children;
  const align = node.align || [];
  const result = rows.map((row, index) => {
    const childres = row.children;
    const name = index === 0 ? "th" : "td";
    let pos = node.align ? align.length : childres.length;
    const out = [];
    while (pos--) {
      const cell = childres[pos];
      out[pos] = h(cell, name, { align: align[pos] }, cell ? all(h, cell) : []);
    }
    return h(row, "tr", wrap(out, true));
  });
  const body = result[1] && h(
    {
      start: position(result[1]).start,
      end: position(result[result.length - 1]).end
    },
    "tbody",
    wrap(result.slice(1), true)
  );
  return h(node, "table", wrap([h(result[0].position, "thead", wrap([result[0]], true))].concat(body || []), true));
}

function paragraph(h, node) {
  if (node.children && node.children[0] && node.children[0].type === "html") {
    const tagName = kebabCase(getTagName(node.children[0].value) || "div");
    if (!htmlTags.includes(tagName)) {
      return all(h, node);
    }
  }
  return h(node, "p", all(h, node));
}

function image(h, node) {
  const props = {
    ...node.attributes,
    src: encode(node.url),
    alt: node.alt
  };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h(node, "img", props);
}

function blockquote(h, node) {
  return h(node, "blockquote", wrap(all(h, node), true));
}

function strong(h, node) {
  return h(node, "strong", node.attributes, all(h, node));
}

function inlineCode(h, node) {
  return h(node, "code-inline", node.attributes, [
    u("text", node.value.replace(/\r?\n|\r/g, " "))
  ]);
}

function thematicBreak(h, node) {
  return h(node, "hr");
}

function containerComponent(h, node) {
  const hast = h(node, node.tagName, node.attributes, all(h, node));
  hast.attributes = node.attributes;
  hast.fmAttributes = node.fmAttributes;
  return hast;
}

const handlers$1 = {
  emphasis,
  code,
  paragraph,
  html,
  link,
  list,
  listItem,
  heading,
  table,
  image,
  blockquote,
  strong,
  inlineCode,
  thematicBreak,
  containerComponent
};

function compiler(_options) {
  function parseAsJSON(node) {
    if (Array.isArray(node)) {
      return node.map(parseAsJSON).filter(Boolean);
    }
    if (node.type === "element") {
      if (node.tagName === "li") {
        let hasPreviousParagraph = false;
        node.children = node.children.flatMap((child) => {
          if (child.tagName === "p") {
            if (hasPreviousParagraph) {
              child.children.unshift({
                type: "element",
                tagName: "br",
                properties: {}
              });
            }
            hasPreviousParagraph = true;
            return child.children;
          }
          return child;
        });
      }
      if (node.tagName === "component-slot") {
        node.tagName = "template";
      }
      return {
        type: "element",
        tag: node.tagName,
        props: node.properties,
        children: parseAsJSON(node.children || [])
      };
    }
    if (node.type === "text") {
      if (node.value === "\n") {
        return null;
      }
      return {
        type: "text",
        value: node.value
      };
    }
    if (node.type === "comment") {
      return null;
    }
    node.children = parseAsJSON(node.children || []);
    return node;
  }
  this.Compiler = function(root) {
    return {
      type: "root",
      children: parseAsJSON(root.children || [])
    };
  };
}

function isTag(vnode, tag) {
  if (vnode.type === tag) {
    return true;
  }
  if (typeof vnode.type === "object" && vnode.type.tag === tag) {
    return true;
  }
  if (vnode.tag === tag) {
    return true;
  }
  return false;
}
function isText(vnode) {
  return isTag(vnode, "text") || typeof vnode.children === "string";
}
function nodeChildren(node) {
  if (Array.isArray(node.children) || typeof node.children === "string") {
    return node.children;
  }
  if (typeof node.children.default === "function") {
    return node.children.default();
  }
  return [];
}
function nodeTextContent(node) {
  if (!node) {
    return "";
  }
  if (Array.isArray(node)) {
    return node.map(nodeTextContent).join("");
  }
  if (isText(node)) {
    return node.children || node.value;
  }
  const children = nodeChildren(node);
  if (Array.isArray(children)) {
    return children.map(nodeTextContent).join("");
  }
  return "";
}

const usePlugins = (plugins, stream) => {
  for (const plugin of Object.values(plugins)) {
    if (plugin) {
      const { instance, ...options } = plugin;
      stream.use(instance, options);
    }
  }
};
function generateBody(content, options) {
  const rehypeOptions = {
    handlers: handlers$1,
    allowDangerousHtml: true
  };
  return new Promise((resolve, reject) => {
    const stream = unified().use(remarkParse);
    if (options.mdc) {
      stream.use(remarkMDC);
    }
    usePlugins(options.remarkPlugins, stream);
    stream.use(remark2rehype, rehypeOptions);
    usePlugins(options.rehypePlugins, stream);
    stream.use(compiler, options);
    stream.process(
      {
        value: content,
        data: options.data
      },
      (error, file) => {
        if (error) {
          return reject(error);
        }
        Object.assign(options.data, file?.data || {});
        resolve(file?.result);
      }
    );
  });
}
function contentHeading(body) {
  let title = "";
  let description = "";
  const children = body.children.filter((node) => node.type !== "text" && node.tag !== "hr");
  if (children.length && children[0].tag === "h1") {
    const node = children.shift();
    title = nodeTextContent(node);
  }
  if (children.length && children[0].tag === "p") {
    const node = children.shift();
    description = nodeTextContent(node);
  }
  return {
    title,
    description
  };
}

const useDefaultOptions = () => ({
  mdc: true,
  toc: {
    depth: 2,
    searchDepth: 2
  },
  tags: {},
  remarkPlugins: {
    "remark-emoji": {
      instance: remarkEmoji
    },
    "remark-squeeze-paragraphs": {
      instance: remarkSqueezeParagraphs
    },
    "remark-gfm": {
      instance: remarkGfm
    }
  },
  rehypePlugins: {
    "rehype-slug": {
      instance: rehypeSlug
    },
    "rehype-external-links": {
      instance: rehypeExternalLinks
    },
    "rehype-sort-attribute-values": {
      instance: rehypeSortAttributeValues
    },
    "rehype-sort-attributes": {
      instance: rehypeSortAttributes
    },
    "rehype-raw": {
      instance: rehypeRaw,
      passThrough: ["element"]
    }
  }
});
async function parse(file, userOptions = {}) {
  const options = defu(userOptions, useDefaultOptions());
  const { content, data } = await parseFrontMatter(file);
  const body = await generateBody(content, { ...options, data });
  let toc;
  if (data.toc !== false) {
    const tocOption = defu(data.toc || {}, options.toc);
    toc = generateToc(body, tocOption);
  }
  const excerptString = useExcerpt(content);
  const excerpt = excerptString ? await generateBody(excerptString, { ...options, data }) : void 0;
  const heading = contentHeading(body);
  return {
    body: {
      ...body,
      toc
    },
    meta: {
      _empty: content.trim().length === 0,
      title: heading.title,
      description: heading.description,
      excerpt,
      ...data
    }
  };
}
function useExcerpt(content, delimiter = /<!--\s*?more\s*?-->/i) {
  if (!delimiter) {
    return "";
  }
  let idx = -1;
  const match = delimiter.exec(content);
  if (match) {
    idx = match.index;
  }
  if (idx !== -1) {
    return content.slice(0, idx);
  }
  return content;
}

const markdown = defineTransformer({
  name: "markdown",
  extensions: [".md"],
  parse: async (_id, content, options = {}) => {
    const config = { ...options };
    config.rehypePlugins = await importPlugins(config.rehypePlugins);
    config.remarkPlugins = await importPlugins(config.remarkPlugins);
    const parsed = await parse(content, config);
    return {
      ...parsed.meta,
      body: parsed.body,
      _type: "markdown",
      _id
    };
  }
});
async function importPlugins(plugins = {}) {
  const resolvedPlugins = {};
  for (const [name, plugin] of Object.entries(plugins)) {
    if (plugin) {
      resolvedPlugins[name] = {
        instance: plugin.instance || await import(
          /* @vite-ignore */
          name
        ).then((m) => m.default || m),
        ...plugin
      };
    } else {
      resolvedPlugins[name] = false;
    }
  }
  return resolvedPlugins;
}

const yaml = defineTransformer({
  name: "Yaml",
  extensions: [".yml", ".yaml"],
  parse: async (_id, content) => {
    const { data } = await parseFrontMatter(`---
${content}
---`);
    let parsed = data;
    if (Array.isArray(data)) {
      console.warn(`YAML array is not supported in ${_id}, moving the array into the \`body\` key`);
      parsed = { body: data };
    }
    return {
      ...parsed,
      _id,
      _type: "yaml"
    };
  }
});

const json = defineTransformer({
  name: "Json",
  extensions: [".json", ".json5"],
  parse: async (_id, content) => {
    let parsed;
    if (typeof content === "string") {
      if (_id.endsWith("json5")) {
        parsed = (await import('json5').then((m) => m.default || m)).parse(content);
      } else if (_id.endsWith("json")) {
        parsed = destr(content);
      }
    } else {
      parsed = content;
    }
    if (Array.isArray(parsed)) {
      console.warn(`JSON array is not supported in ${_id}, moving the array into the \`body\` key`);
      parsed = {
        body: parsed
      };
    }
    return {
      ...parsed,
      _id,
      _type: "json"
    };
  }
});

const TRANSFORMERS = [
  csv,
  markdown,
  json,
  yaml,
  pathMeta
];
function getParser(ext, additionalTransformers = []) {
  let parser = additionalTransformers.find((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.parse);
  if (!parser) {
    parser = TRANSFORMERS.find((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.parse);
  }
  return parser;
}
function getTransformers(ext, additionalTransformers = []) {
  return [
    ...additionalTransformers.filter((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.transform),
    ...TRANSFORMERS.filter((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.transform)
  ];
}
async function transformContent(id, content, options = {}) {
  const { transformers = [] } = options;
  const file = { _id: id, body: content };
  const ext = extname(id);
  const parser = getParser(ext, transformers);
  if (!parser) {
    console.warn(`${ext} files are not supported, "${id}" falling back to raw content`);
    return file;
  }
  const parserOptions = options[camelCase(parser.name)] || {};
  const parsed = await parser.parse(file._id, file.body, parserOptions);
  const matchedTransformers = getTransformers(ext, transformers);
  const result = await matchedTransformers.reduce(async (prev, cur) => {
    const next = await prev || parsed;
    const transformOptions = options[camelCase(cur.name)] || {};
    return cur.transform(next, transformOptions);
  }, Promise.resolve(parsed));
  return result;
}

const isPreview = (event) => {
  const previewToken = getQuery(event).previewToken || getCookie(event, "previewToken");
  return !!previewToken;
};
const getPreview = (event) => {
  const key = getQuery(event).previewToken || getCookie(event, "previewToken");
  return { key };
};

async function getContentIndex(event) {
  let contentIndex = await cacheStorage.getItem("content-index.json");
  if (!contentIndex) {
    const data = await serverQueryContent(event).find();
    contentIndex = data.reduce((acc, item) => {
      if (!acc[item._path]) {
        acc[item._path] = item._id;
      } else if (item._id.startsWith("content:")) {
        acc[item._path] = item._id;
      }
      return acc;
    }, {});
    await cacheStorage.setItem("content-index.json", contentIndex);
  }
  return contentIndex;
}
async function getIndexedContentsList(event, query) {
  const params = query.params();
  const path = params?.where?.find((wh) => wh._path)?._path;
  if (!isPreview(event) && (typeof path === "string" || path instanceof RegExp)) {
    const index = await getContentIndex(event);
    const keys = Object.keys(index).filter((key) => path.test ? path.test(key) : key === String(path)).map((key) => index[key]);
    const contents = await Promise.all(keys.map((key) => getContent(event, key)));
    return contents;
  }
  return getContentsList(event);
}

const transformers = [];

const sourceStorage = prefixStorage(useStorage(), "content:source");
const cacheStorage = prefixStorage(useStorage(), "cache:content");
const cacheParsedStorage = prefixStorage(useStorage(), "cache:content:parsed");
const contentConfig = useRuntimeConfig().content;
const contentIgnores = contentConfig.ignores.map(
  (p) => typeof p === "string" ? new RegExp(`^${p}|:${p}`) : p
);
const invalidKeyCharacters = `'"?#/`.split("");
const contentIgnorePredicate = (key) => {
  if (key.startsWith("preview:") || contentIgnores.some((prefix) => prefix.test(key))) {
    return false;
  }
  if (invalidKeyCharacters.some((ik) => key.includes(ik))) {
    console.warn(`Ignoring [${key}]. File name should not contain any of the following characters: ${invalidKeyCharacters.join(", ")}`);
    return false;
  }
  return true;
};
const getContentsIds = async (event, prefix) => {
  let keys = [];
  {
    keys = await cacheParsedStorage.getKeys(prefix);
  }
  if (keys.length === 0) {
    keys = await sourceStorage.getKeys(prefix);
  }
  if (isPreview(event)) {
    const { key } = getPreview(event);
    const previewPrefix = `preview:${key}:${prefix || ""}`;
    const previewKeys = await sourceStorage.getKeys(previewPrefix);
    if (previewKeys.length) {
      const keysSet = new Set(keys);
      await Promise.all(
        previewKeys.map(async (key2) => {
          const meta = await sourceStorage.getMeta(key2);
          if (meta?.__deleted) {
            keysSet.delete(key2.substring(previewPrefix.length));
          } else {
            keysSet.add(key2.substring(previewPrefix.length));
          }
        })
      );
      keys = Array.from(keysSet);
    }
  }
  return keys.filter(contentIgnorePredicate);
};
const getContentsList = async (event, prefix) => {
  const keys = await getContentsIds(event, prefix);
  const contents = await Promise.all(keys.map((key) => getContent(event, key)));
  return contents;
};
const getContent = async (event, id) => {
  const contentId = id;
  if (!contentIgnorePredicate(id)) {
    return { _id: contentId, body: null };
  }
  if (isPreview(event)) {
    const { key } = getPreview(event);
    const previewId = `preview:${key}:${id}`;
    const draft = await sourceStorage.getItem(previewId);
    if (draft) {
      id = previewId;
    }
  }
  const cached = await cacheParsedStorage.getItem(id);
  if (cached) {
    return cached.parsed;
  }
  const meta = await sourceStorage.getMeta(id);
  const hash$1 = hash({
    meta,
    version: contentConfig.cacheVersion,
    integrity: contentConfig.cacheIntegrity
  });
  if (cached?.hash === hash$1) {
    return cached.parsed;
  }
  const body = await sourceStorage.getItem(id);
  if (body === null) {
    return { _id: contentId, body: null };
  }
  const parsed = await parseContent(contentId, body);
  await cacheParsedStorage.setItem(id, { parsed, hash: hash$1 }).catch(() => {
  });
  return parsed;
};
async function parseContent(id, content, opts = {}) {
  const nitroApp = useNitroApp();
  const options = defu(
    opts,
    {
      markdown: contentConfig.markdown,
      csv: contentConfig.csv,
      yaml: contentConfig.yaml,
      highlight: contentConfig.highlight,
      transformers: transformers,
      pathMeta: {
        defaultLocale: contentConfig.defaultLocale,
        locales: contentConfig.locales
      }
    }
  );
  const file = { _id: id, body: content };
  await nitroApp.hooks.callHook("content:file:beforeParse", file);
  const result = await transformContent(id, file.body, options);
  await nitroApp.hooks.callHook("content:file:afterParse", result);
  return result;
}
const createServerQueryFetch = (event, path) => (query) => {
  if (path) {
    if (query.params().first) {
      query.where({ _path: withoutTrailingSlash(path) });
    } else {
      query.where({ _path: new RegExp(`^${path.replace(/[-[\]{}()*+.,^$\s/]/g, "\\$&")}`) });
    }
  }
  if (!query.params().sort?.length) {
    query.sort({ _file: 1, $numeric: true });
  }
  return createPipelineFetcher(() => getIndexedContentsList(event, query))(query);
};
function serverQueryContent(event, path, ...pathParts) {
  if (typeof path === "string") {
    path = withLeadingSlash(joinURL(path, ...pathParts));
    return createQuery(createServerQueryFetch(event, path));
  }
  return createQuery(createServerQueryFetch(event), path || {});
}

function jsonParse(value) {
  return JSON.parse(value, regExpReviver);
}
function regExpReviver(_key, value) {
  const withOperator = typeof value === "string" && value.match(/^--([A-Z]+) (.+)$/) || [];
  if (withOperator[1] === "REGEX") {
    const regex = withOperator[2].match(/\/(.*)\/([dgimsuy]*)$/);
    return regex ? new RegExp(regex[1], regex[2] || "") : value;
  }
  return value;
}

const parseQueryParams = (body) => {
  try {
    return jsonParse(body);
  } catch (e) {
    throw createError({ statusCode: 400, message: "Invalid _params query" });
  }
};
const memory = {};
const getContentQuery = (event) => {
  const qid = event.context.params.qid?.replace(/.json$/, "");
  const query = getQuery(event) || {};
  if (qid && query._params) {
    memory[qid] = parseQueryParams(query._params);
    return memory[qid];
  }
  if (memory[qid]) {
    return memory[qid];
  }
  if (query._params) {
    return parseQueryParams(query._params);
  }
  if (typeof query.only === "string" && query.only.includes(",")) {
    query.only = query.only.split(",").map((s) => s.trim());
  }
  if (typeof query.without === "string" && query.without.includes(",")) {
    query.without = query.without.split(",").map((s) => s.trim());
  }
  const where = query.where || {};
  for (const key of ["draft", "partial", "empty"]) {
    if (query[key] && ["true", "false"].includes(query[key])) {
      where[key] = query[key] === "true";
      delete query[key];
    }
  }
  if (query.sort) {
    query.sort = query.sort.split(",").map((s) => {
      const [key, order] = s.split(":");
      return [key, +order];
    });
  }
  const reservedKeys = ["partial", "draft", "only", "without", "where", "sort", "limit", "skip"];
  for (const key of Object.keys(query)) {
    if (reservedKeys.includes(key)) {
      continue;
    }
    query.where = query.where || {};
    query.where[key] = query[key];
  }
  if (Object.keys(where).length > 0) {
    query.where = [where];
  } else {
    delete query.where;
  }
  return query;
};

const _j4Sr6f = defineEventHandler(async (event) => {
  const query = getContentQuery(event);
  if (query.first) {
    const content = await serverQueryContent(event, query).findOne();
    const path = content?._path || query.where?.find((w) => w._path)?._path;
    if (path) {
      const _dir = await serverQueryContent(event).where({ _path: join(path, "_dir") }).without("_").findOne();
      if (!Array.isArray(_dir)) {
        return {
          _path: path,
          ...content || {},
          _dir
        };
      }
    }
    if (!content) {
      throw createError({
        statusMessage: "Document not found!",
        statusCode: 404,
        data: {
          description: "Could not find document for the given query.",
          query
        }
      });
    }
    return content;
  }
  const contents = await serverQueryContent(event, query).find();
  return contents;
});

const _TUIRrH = defineEventHandler(async (event) => {
  const now = Date.now();
  const contents = await serverQueryContent(event).find();
  await getContentIndex(event);
  const navigation = await $fetch("/api/_content/navigation");
  await cacheStorage.setItem("content-navigation.json", navigation);
  return {
    generatedAt: now,
    generateTime: Date.now() - now,
    contents,
    navigation
  };
});

function createNav(contents, configs) {
  const { navigation } = useRuntimeConfig().content;
  const pickNavigationFields = (content) => ({
    ...pick(["title", ...navigation.fields])(content),
    ...isObject(content?.navigation) ? content.navigation : {}
  });
  const nav = contents.sort((a, b) => a._path.localeCompare(b._path)).reduce((nav2, content) => {
    const parts = content._path.substring(1).split("/");
    const idParts = content._id.split(":").slice(1);
    const isIndex = !!idParts[idParts.length - 1].match(/([1-9][0-9]*\.)?index.md/g);
    const getNavItem = (content2) => ({
      title: content2.title,
      _path: content2._path,
      _file: content2._file,
      children: [],
      ...pickNavigationFields(content2),
      ...content2._draft ? { _draft: true } : {}
    });
    const navItem = getNavItem(content);
    if (isIndex) {
      const dirConfig = configs[navItem._path];
      if (typeof dirConfig?.navigation !== "undefined" && !dirConfig?.navigation) {
        return nav2;
      }
      if (content._path !== "/") {
        const indexItem = getNavItem(content);
        navItem.children.push(indexItem);
      }
      Object.assign(
        navItem,
        pickNavigationFields(dirConfig)
      );
    }
    if (parts.length === 1) {
      nav2.push(navItem);
      return nav2;
    }
    const siblings = parts.slice(0, -1).reduce((nodes, part, i) => {
      const currentPathPart = "/" + parts.slice(0, i + 1).join("/");
      const conf = configs[currentPathPart];
      if (typeof conf?.navigation !== "undefined" && !conf.navigation) {
        return [];
      }
      let parent = nodes.find((n) => n._path === currentPathPart);
      if (!parent) {
        parent = {
          title: generateTitle(part),
          _path: currentPathPart,
          _file: content._file,
          children: [],
          ...pickNavigationFields(conf)
        };
        nodes.push(parent);
      }
      return parent.children;
    }, nav2);
    siblings.push(navItem);
    return nav2;
  }, []);
  return sortAndClear(nav);
}
const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
function sortAndClear(nav) {
  const sorted = nav.sort((a, b) => collator.compare(a._file, b._file));
  for (const item of sorted) {
    if (item.children.length) {
      sortAndClear(item.children);
    } else {
      delete item.children;
    }
    delete item._file;
  }
  return nav;
}
function pick(keys) {
  return (obj) => {
    obj = obj || {};
    if (keys && keys.length) {
      return keys.filter((key) => typeof obj[key] !== "undefined").reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
    }
    return obj;
  };
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

const _LdQPlq = defineEventHandler(async (event) => {
  const query = getContentQuery(event);
  if (!isPreview(event) && Object.keys(query).length === 0) {
    const cache = await cacheStorage.getItem("content-navigation.json");
    if (cache) {
      return cache;
    }
  }
  const contents = await serverQueryContent(event, query).where({
    _partial: false,
    navigation: {
      $ne: false
    }
  }).find();
  const dirConfigs = await serverQueryContent(event).where({ _path: /\/_dir$/i, _partial: true }).find();
  const configs = dirConfigs.reduce((configs2, conf) => {
    if (conf.title.toLowerCase() === "dir") {
      conf.title = void 0;
    }
    const key = conf._path.split("/").slice(0, -1).join("/") || "/";
    configs2[key] = {
      ...conf,
      ...conf.body
    };
    return configs2;
  }, {});
  return createNav(contents, configs);
});

const _lazy_Ofu0SN = () => import('../wuzzle.get.mjs');
const _lazy_Ez81ON = () => import('../word.get.mjs');
const _lazy_5fwYyI = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/wuzzle', handler: _lazy_Ofu0SN, lazy: true, middleware: false, method: "get" },
  { route: '/api/word', handler: _lazy_Ez81ON, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_5fwYyI, lazy: true, middleware: false, method: undefined },
  { route: '/api/_content/query/:qid', handler: _j4Sr6f, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query', handler: _j4Sr6f, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/cache.json', handler: _TUIRrH, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation/:qid', handler: _LdQPlq, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation', handler: _LdQPlq, lazy: false, middleware: false, method: "get" },
  { route: '/**', handler: _lazy_5fwYyI, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
