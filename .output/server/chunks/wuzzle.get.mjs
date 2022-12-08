import { defineEventHandler } from 'h3';

const wuzzle = "wuzzle";

const wuzzle_get = defineEventHandler((event) => {
  return {
    word: wuzzle
  };
});

export { wuzzle_get as default };
//# sourceMappingURL=wuzzle.get.mjs.map
