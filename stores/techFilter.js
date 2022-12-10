import { defineStore } from 'pinia'

export const useTechFilterStore = defineStore('techFilterStore', {
    state: () => ({
      tech_options: [
        { title: 'VueJS/NuxtJS', category: 'Frontend', toggled: true},
        { title: 'SASS', category: 'Frontend', toggled: false},
        { title: 'TypeScript', category: 'Frontend', toggled: false},
        { title: 'Wordpress', category: 'Backend', toggled: false},
        { title: 'Laravel', category: 'Backend', toggled: false},
        { title: 'WooCommerce', category: 'Backend', toggled: false},
        { title: 'Docker', category: 'Backend', toggled: false},
        { title: 'Processing', category: 'Other', toggled: false},
        { title: 'Arduino', category: 'Other', toggled: false},
      ]
    }),
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
      }
    }
  })
  
  