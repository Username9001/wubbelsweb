import { tech_options } from './data/tech_options'

import { defineStore } from 'pinia'

export const useTechFilterStore = defineStore('techFilterStore', {
    state: () => ({
      tech_options
    }),
    persist: true,
    getters: {
      showAllTechs() {
        return this.tech_options
      },
      showSelectedTechs() {
        return this.tech_options.filter(p => p.toggled === true)
      },
    },
    actions: {
      toggleTech(title) {
        const selectedTech = this.tech_options.find(t => t.title === title)
        console.log("Selected:", selectedTech)
        selectedTech.toggled = !selectedTech.toggled
        console.log("Toggle state:", selectedTech.toggled)
      },
    }
  })
  
  