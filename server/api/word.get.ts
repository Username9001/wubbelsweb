import { word } from "../lib/word"

export default defineEventHandler((event) => {
    return {
      word: word
    }
  })
  