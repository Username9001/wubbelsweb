import { projects } from './data/projects'

import { defineStore } from 'pinia'
import { useTechFilterStore } from './techFilter'
const techFilter = useTechFilterStore()

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    projects
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
    projectsFilteredAnd() {
      this.filter_method = 'and'
      this.filtered_projects_and = []
      if ( this.toggledTechs.length > 0 ) {
        this.filtered_projects_and = this.projects.filter(p => 
          p.stack.includes(this.toggledTechs[0])
        )
        for ( let i = 0; i < this.toggledTechs.length; i++ ) {
          this.filtered_projects_and = this.filtered_projects_and.filter(p =>
            p.stack.includes(this.toggledTechs[i])
          )
        }
      } 
      else {
        this.filtered_projects_and = this.projects
      }
      return this.filtered_projects_and
    },
    projectsFilteredOr() {
      this.filter_method = 'or'
      this.filtered_projects_or = []
      if (this.toggledTechs.length > 0) {
        console.log("toggledTechs.length:", this.toggledTechs.length)
        for (let j = 0; j < this.toggledTechs.length; j++) {
          this.filtered_projects_or = this.filtered_projects_or.concat(
            this.projects.filter(p => 
              p.stack.includes(this.toggledTechs[j]) 
              && !this.filtered_projects_or.includes(p)
              )
            )
          console.log("After OR logic:", j)
        }
      } else {
        this.filtered_projects_or = this.projects
      }
      return this.filtered_projects_or
    },
    projectsFilteredAll() {
      this.filter_method = 'all'
      // uncheck filters
      return this.projects
    },
    getProjectsLength() {
      let current_projects = 0

      if ( this.filter_method === 'and' ) {
        current_projects = this.filtered_projects_and.length
      }
      if ( this.filter_method === 'or' ) {
        current_projects = this.filtered_projects_or.length
      }
      if ( this.filter_method === 'all') {
        current_projects = this.projects.length
      }

      return current_projects
    },
    getFilterMethod() {
      return this.filter_method
    },

    favCount() {
      return this.projects.reduce((p, c) => {
        return c.isFav ? p + 1 : p
      }, 0)
    },
    totalCount: (state) => {
      return state.projects.length
    },
    // getProjectById: (state) => {
    //   return (projectId) => state.projects.find((project) => project.id === projectId)
    // },
  },
  actions: {
    updateProjectsLength() {
      if (this.searchTab === 'all') {
        this.projectStore.getProjectsLength = this.projectStore.projectsFilteredAll.length;
      } else if (this.searchTab === 'toggledTechs' && !this.andOr) {
        this.projectStore.getProjectsLength = this.projectStore.projectsFilteredOr.length;
      } else if (this.searchTab === 'toggledTechs' && this.andOr) {
        this.projectStore.getProjectsLength = this.projectStore.projectsFilteredAnd.length;
      }
    }
  }

})

