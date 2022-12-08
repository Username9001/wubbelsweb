import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper.a1a6add7.mjs';

const _sfc_main = {
  props: ["stack_options", "stack_search", "current_filter"],
  emits: ["update-stack-search"],
  watch: {
    stack_search(newSearch) {
      if (!newSearch.includes("All Projects")) {
        document.getElementById("all-projects").checked = false;
      }
      if (newSearch.includes("All Projects")) {
        let checkboxes = document.querySelectorAll("input[type='checkbox']");
        for (var i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked = false;
        }
        document.getElementById("all-projects").checked = true;
      }
    }
  },
  methods: {
    projectsRemaining(stack) {
      let counter = 0;
      stack.counter = 0;
      for (var i = 0; i < this.current_filter.length; i++) {
        if (this.current_filter[i].stack.includes(stack.title)) {
          counter += 1;
          stack.counter = counter;
        }
      }
    },
    checkAllStacks() {
      for (var j = 0; j < this.stack_options.length; j++) {
        this.projectsRemaining(this.stack_options[j]);
      }
    }
  },
  mounted() {
    this.checkAllStacks();
    this.loaded = true;
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "stack-list" }, _attrs))}><div class="row"><label class="stack-option"><input checked type="checkbox" value="All Projects" id="all-projects"><span> All Projects </span></label></div><br><div class="row"><h2> Frontend </h2><!--[-->`);
  ssrRenderList($props.stack_options.filter((stack) => stack.category == "Frontend"), (stack) => {
    _push(`<label class="stack-option"><input${ssrRenderAttr("value", `${stack}`)} type="checkbox" id="" class="stack-option-input"><span>${ssrInterpolate(stack.title)} (${ssrInterpolate(stack.counter)}) </span></label>`);
  });
  _push(`<!--]--></div><div class="row"><h2> Backend </h2><!--[-->`);
  ssrRenderList($props.stack_options.filter((stack) => stack.category == "Backend"), (stack) => {
    _push(`<label class="stack-option"><input${ssrRenderAttr("value", `${stack}`)} type="checkbox" id="" class="stack-option-input"><span>${ssrInterpolate(stack.title)} (${ssrInterpolate(stack.counter)}) </span></label>`);
  });
  _push(`<!--]--></div><div class="row"><h2> Other </h2><!--[-->`);
  ssrRenderList($props.stack_options.filter((stack) => stack.category == "Other"), (stack) => {
    _push(`<label class="stack-option"><input${ssrRenderAttr("value", `${stack}`)} type="checkbox" id="" class="stack-option-input"><span>${ssrInterpolate(stack.title)} (${ssrInterpolate(stack.counter)}) </span></label>`);
  });
  _push(`<!--]--></div><div class="row"><h3> TESTING </h3><button class="test-button"> Update Counters </button></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/search/filterButtons.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_1 as default };
//# sourceMappingURL=filterButtons.18dbc31f.mjs.map
