import { defineStore } from 'pinia'
import { useTechFilterStore } from './techFilter'
const techFilter = useTechFilterStore()

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    projects: [
      {
        // WEBDEV
        id: 1,
        isFav: false,
        name: 'Misty Fields 2022',
        slug: 'misty-fields-2022',
        link: 'https://mistyfields.com',
        stack: ['Wordpress', 'SASS'],
        img: 'https://loremflickr.com/600/335'
      },
      {
        id: 2,
        isFav: false,
        name: 'Misty Fields 2019',
        slug: 'misty-fields-2019',
        link: 'https://mistyfields.com',
        stack: ['Wordpress', 'SASS'],
        img: 'https://loremflickr.com/600/337'
      },
      {
        id: 3,
        isFav: false,
        name: 'TomsTech',
        slug: 'tomstech',
        link: 'https://tomstech.nl',
        stack: ['Wordpress', 'SASS'],
        img: 'https://loremflickr.com/600/339'
      },
      {
        id: 4,
        isFav: false,
        name: 'Pineapple Productions',
        slug: 'pineapple-productions',
        link: 'https://pp.wubbelsweb.com',
        stack: ['Wordpress', 'SASS'],
        img: 'https://loremflickr.com/600/331'
      },
      {
        id: 5,
        isFav: true,
        name: 'Bootleg Breathing',
        slug: 'bootleg-breathing',
        link: 'https://bb.wubbelsweb.com',
        stack: ['VueJS/NuxtJS', 'Bootstrap', 'SASS'],
        img: '/img/test.jpg'
      },
      {
        id: 6,
        isFav: true,
        name: 'Plant DB',
        slug: 'plant-db',
        link: 'https://plantnet.wubbelsweb.com/species',
        stack: ['VueJS/NuxtJS', 'Bootstrap', 'SASS', 'Laravel', 'GraphQL', 'MongoDB', 'Docker'],
        img: 'https://loremflickr.com/600/334'
      },
      {
        id: 7,
        isFav: false,
        name: 'Bits of Freedom',
        slug: 'bits-of-freedom',
        stack: ['Bootstrap', 'Vanilla JS', 'SASS'],
        img: 'https://loremflickr.com/600/332'
      },
      {
        id: 8,
        isFav: false,
        name: 'DAGDice',
        slug: 'dagdice',
        stack: ['Adobe XD', 'VueJS/NuxtJS', 'GraphQL', 'TypeScript',  'Docker'],
        img: 'https://loremflickr.com/600/333'
      },
      {
        id: 9,
        isFav: true,
        name: 'Erik Wubbels Fotografie',
        slug: 'erik-wubbels-fotografie',
        link: 'https://erikwubbels.nl',
        stack: ['Wordpress', 'SASS', 'WooCommerce', 'Docker'],
        img: 'https://loremflickr.com/600/338'
      },
      // OTHER
      {
        id: 10,
        isFav: false,
        name: 'Holdie',
        slug: 'holdie',
        link: '',
        stack: ['Arduino'],
        img: 'https://loremflickr.com/600/338'
      },
      {
        id: 11,
        isFav: false,
        name: 'Mugen',
        slug: 'mugen',
        link: '',
        stack: ['Arduino'],
        img: 'https://loremflickr.com/600/338'
      },
      {
        id: 12,
        isFav: false,
        name: 'Flowerscape',
        slug: 'flowerscape',
        link: '',
        stack: ['Processing'],
        img: 'https://loremflickr.com/600/338'
      },
    ],
  }),
  persist: true,
  getters: {
    favs() {
      return this.projects.filter(p => p.isFav)
    },
    toggledTechs() {
      this.tech_titles = []
      const selected = techFilter.showSelectedTechs

      // cycle through selected techs
      for ( let i = 0; i < selected.length; i++ ) {
        this.tech_titles.push(selected[i].title)
      }

      return this.tech_titles
    },
    projectsFiltered() {
      this.filtered_projects = []
      // console.log(this.toggledTechs.length)
      if ( this.toggledTechs.length > 0 ) {
        this.filtered_projects = this.projects.filter(p => 
          p.stack.includes(this.toggledTechs[0])
        )
        for ( let i = 0; i < this.toggledTechs.length; i++ ) {
          this.filtered_projects = this.filtered_projects.filter(p =>
            p.stack.includes(this.toggledTechs[i])
          )
        }
        // console.log(this.filtered_projects)
        return this.filtered_projects
      } 
      else {
        return this.projects
      }

    },
    getProjectsLeft: (state) => {
      return (input) => state.projects.filter((p) => p.stack.includes(input))
    },

    favCount() {
      return this.projects.reduce((p, c) => {
        return c.isFav ? p + 1 : p
      }, 0)
    },
    totalCount: (state) => {
      return state.projects.length
    },
    filteredCount: (state) => {

    },
    // getProjectById: (state) => {
    //   return (projectId) => state.projects.find((project) => project.id === projectId)
    // },
  },
  actions: {

  }

})

