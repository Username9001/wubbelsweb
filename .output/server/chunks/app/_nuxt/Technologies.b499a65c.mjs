import { ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper.a1a6add7.mjs';

const _sfc_main = {
  data() {
    return {
      technologies: {
        front_end: {
          title: "Front-end",
          list: [
            "HTML/CSS/JS",
            "Bootstrap",
            "VueJS/NuxtJS",
            "SASS",
            "Typescript"
          ]
        },
        back_end: {
          title: "Back-end",
          list: [
            "Wordpress",
            "PHP",
            "Laravel",
            "MySQL",
            "MongoDB",
            "GraphQL",
            "Docker"
          ]
        },
        other: {
          title: "Other",
          list: [
            "Ubuntu/Linux",
            "DigitalOcean",
            "Arduino",
            "Raspberry Pi",
            "Git",
            "Terminal/CLI"
          ]
        }
      }
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><h2 class="tech-title"> I have worked with the following technologies </h2><div class="technologies"><!--[-->`);
  ssrRenderList($data.technologies, (stack) => {
    _push(`<div class="tech"><h3 class="tech-title">${ssrInterpolate(stack.title)}</h3><div class="tech-list"><!--[-->`);
    ssrRenderList(stack.list, (tech) => {
      _push(`<div class="tech-item">${ssrInterpolate(tech)}</div>`);
    });
    _push(`<!--]--></div></div>`);
  });
  _push(`<!--]--></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Technologies.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_0 as default };
//# sourceMappingURL=Technologies.b499a65c.mjs.map
