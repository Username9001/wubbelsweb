import { defineStore } from 'pinia'
// import { useProjectStore } from './projects'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const useTechFilterStore = defineStore('techFilterStore', {
    state: () => ({
      tech_options: [
        { title: 'VueJS/NuxtJS', category: 'Frontend', toggled: false, counter: 0},
        { title: 'SASS', category: 'Frontend', toggled: false, counter: 0},
        { title: 'TypeScript', category: 'Frontend', toggled: false, counter: 0},
        { title: 'Wordpress', category: 'Backend', toggled: false, counter: 0},
        { title: 'Laravel', category: 'Backend', toggled: false, counter: 0},
        { title: 'WooCommerce', category: 'Backend', toggled: false, counter: 0},
        { title: 'Docker', category: 'Backend', toggled: false, counter: 0},
        { title: 'Processing', category: 'Other', toggled: false, counter: 0},
        { title: 'Arduino', category: 'Other', toggled: false, counter: 0},
      ]
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
        // update project counters
        for ( let i = 0; i < this.tech_options.length; i++ ) {
          let new_count = 4
          this.tech_options[i].counter = new_count
        }
      },
    }
  })
  
  