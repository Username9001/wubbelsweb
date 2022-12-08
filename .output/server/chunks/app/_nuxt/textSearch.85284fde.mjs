import { ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper.a1a6add7.mjs';

const _sfc_main = {
  props: ["combinedFilter"],
  emits: ["update-text-search"]
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><input class="text-search" type="search" list="suggestions" placeholder="Search for project.."><datalist id="suggestions"><!--[-->`);
  ssrRenderList($props.combinedFilter, (project) => {
    _push(`<option>${ssrInterpolate(project.name)}</option>`);
  });
  _push(`<!--]--></datalist><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/search/textSearch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const textSearch = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { textSearch as default };
//# sourceMappingURL=textSearch.85284fde.mjs.map
