import { wuzzle } from "../lib/wuzzle"

export default defineEventHandler((event) => {
    return {
      word: wuzzle
    }
  })
  