import { defineEventHandler } from 'h3';

const word = "nuxt";

const word_get = defineEventHandler((event) => {
  return {
    word
  };
});

export { word_get as default };
//# sourceMappingURL=word.get.mjs.map
