import { defineStore } from 'pinia'

export const usePersonaliaStore = defineStore('personaliaStore', {
  state: () => ({
    personalia: {
      name: 'Erik Wubbels',
      description: 'I\'m a web developer based in Eindhoven, The Netherlands. I specialize in interactive design, and am currently open for new projects and opportunities. ',
      email: 'erik.wubbels@gmail.com',
    }
  }),
})
