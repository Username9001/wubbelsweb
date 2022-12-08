import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper.a1a6add7.mjs';

const _sfc_main = {
  data() {
    return {
      loaded: false,
      quotePressed: false,
      footerQuotes: [
        "A bird in the sky is a bird gone by.",
        "Once upon a time there was nature...",
        "Space is very big.",
        "An inspirational quote goes long way for uninspired goat.",
        '"Blah skippedie blah" - Sheep',
        "Live, Laugh, Eat gross amounts of frikandelbroodjes.",
        "To be is to die.",
        "Egg.",
        "Every day is a new challenge, you just have to eat the beans.",
        "Getting up is like burning your old clothes in a dishwasher.",
        "Most people will crash and burn some day. You just gotta know how to handle a fire extinguisher.",
        "Once a bandage, now a metallic hip replacement."
      ],
      usedQuote: ""
    };
  },
  methods: {
    changeQuote() {
      this.quotePressed = true;
      this.newQuote = false;
      setTimeout(
        () => {
          this.quotePressed = false;
          this.newQuote = true;
          this.usedQuote = this.footerQuotes[Math.floor(Math.random() * this.footerQuotes.length)];
        },
        3e3
      );
    }
  },
  created() {
    this.changeQuote();
    this.loaded = true;
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($data.loaded) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "tegel" }, _attrs))} data-v-277b2fa9><div class="tegel-vierkant" data-v-277b2fa9><div class="tegel-cirkel" data-v-277b2fa9><blockquote class="${ssrRenderClass([{ zoomout: $data.quotePressed, zoomin: _ctx.newQuote }, "quotes"])}" data-v-277b2fa9>${ssrInterpolate($data.usedQuote)}</blockquote></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tegeltje.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Tegeltje = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-277b2fa9"]]);

export { Tegeltje as default };
//# sourceMappingURL=Tegeltje.8d71baa7.mjs.map
