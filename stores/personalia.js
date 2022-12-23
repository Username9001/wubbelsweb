import { defineStore } from 'pinia'

export const usePersonaliaStore = defineStore('personaliaStore', {
  state: () => ({
    personalia: {
      name: 'WubbelsWeb',
      description: 'I\'m a web developer based in the Netherlands. I specialize in interactive design, and am currently open for new projects and opportunities. ',
      email: 'erik.wubbels@gmail.com',
    }
  }),
})
