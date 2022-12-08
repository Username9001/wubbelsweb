import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper.a1a6add7.mjs';

const _sfc_main = {
  head() {
    return {
      title: "WubbelsWeb"
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-77d6e5cc><p data-v-77d6e5cc>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</p><small data-v-77d6e5cc>`);
  ssrRenderSlot(_ctx.$slots, "subtitle", {}, null, _push, _parent);
  _push(`</small>`);
  ssrRenderSlot(_ctx.$slots, "excerpt", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectSlot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProjectSlot = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-77d6e5cc"]]);

export { ProjectSlot as default };
//# sourceMappingURL=ProjectSlot.7cd6b962.mjs.map
