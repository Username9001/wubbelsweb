<template>
  <Transition>
    <div id="portfolio" v-if="projectStore">
      <Header :personalia="personaliaStore.personalia" />
      <div id="main" class="main">
        <!-- PROJECT LOOKUP -->
        <div class="search-wrapper" id="projects">
            <h1 class="grid-title">
              Portfolio
              <!-- {{ projects }} -->
            </h1>
            <!-- STACK OPTIONS SEARCH -->
            <div class="filter" v-if="projectsFilter">
              <button @click="projectsFilter = 'all'">All</button>
              <button @click="projectsFilter = 'favs'">Favs</button>
              <button @click="projectsFilter = 'toggledTechs'">toggledTechs</button>
            </div>
            <SearchSelectTech />
          </div>
          {{ projectStore.toggledTechs }}
          <hr>
          {{ projectStore.toggledTechs.length }}
          <hr>
          {{ projectStore.projectsFiltered }}
          <hr>
          {{ techFilterStore.showSelectedTechs }}
          <hr>
          {{ projectStore.toggledTechs }}
          <button @click="projectStore.getFilteredProjects">Filtered Projects</button>
          <!-- {{ projectStore.projects }} -->
          <div id="project-grid">
            <transition-group name="list">
                <Project v-if="projectsFilter === 'all'" v-for="project in projectStore.projects" :key="project.slug" :projectData="project" />
                <Project v-if="projectsFilter === 'favs'" v-for="project in projectStore.favs" :key="project.slug" :projectData="project" />
                <Project v-if="projectsFilter === 'toggledTechs'" v-for="project in projectStore.projectsFiltered" :key="project.slug" :projectData="project" />
            </transition-group>
          </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { useProjectStore } from "~~/stores/projects"
import { useTechFilterStore } from "~~/stores/techFilter"
import { usePersonaliaStore } from "~~/stores/personalia"

export default {
  setup () {
    const projectStore = useProjectStore()
    const techFilterStore = useTechFilterStore()
    const personaliaStore = usePersonaliaStore()
    
    const projectsFilter = ref('all')
    // const wordpressFilter = projectStore.getProjectByTech("Wordpress")
    // const filterActiveTech = projectStore.getProjectByTechFilter()
    // const filterToggledTech = projectStore.toggledTechs

    return { projectStore, projectsFilter, personaliaStore, techFilterStore }
  },
}
</script>

<style lang="scss">
// FILTER 
.search-wrapper {
  max-width: 840px;
  margin: 220px auto 0 auto;
  position: relative;
  z-index: 2;
  font-size: 1.2rem;
  border-right: 32px solid $grey;
  @media (max-width: 840px) {
    width: 70%;
    border-right: 12px solid $grey;
  }
  @media (max-width: 480px) {
    width: 90%;
    border-right: none;
    // border-bottom: 2px solid $light-blue;
  }
  h4 {
    margin: 12px auto;
  }
  button {
    display: block;
    padding: 8px;
    font-family: 'Montserrat';
    border: none;
    color: $accent-color;
  }
  .stack-list {
    width: 100%;
    text-align: left;
    margin-top: 24px;
    // LABEL
    .stack-option {
      display: inline-block;
      margin: 12px 12px 24px 0;
      width: auto;
      span {
        padding: 12px;
        background: $grey;
        color: white;
        // border-radius: 12px;
        &:hover {
          cursor: pointer;        
        }
      }
      input[type="radio"] {
        display: none;
      }
      input[type="radio"]:checked ~ *{
        opacity: .5;
        color: #fff;
      }
    }
  }
  // SEARCH TEXT INPUT
  input[type="search"].text-search {
    margin: 24px 4px;
    padding: 12px;
    display: block;
    background: $accent-color;
    color: #fff;
    font-weight: 700;
    border: none;
    outline: 4px solid $accent-color;
    transition: .3s ease;
    &:focus-visible {
      border: none;
      box-shadow: 0 0 25px $accent-color;
      padding: 12px;
      transition: .25s ease;
    }
  }
  ::placeholder {
    color: #fff;
    opacity: 1;
    text-shadow: 0 0 5px #fff;
  }
}

.grid-title {
  color: $grey;
  opacity: 0.8;
  font-size: 3em;
  font-weight: 700;
  font-family: 'Montserrat';
  // padding-bottom: 116px;
}
.tech-title {
  @media (max-width: 840px) {
    max-width: 80%;
    margin: auto;
  }
}
#project-grid {
  max-width: 840px;
  margin: 128px auto;
  z-index: 3;
  position: relative;
  padding: 0;
  text-align: left;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-column-gap: 128px;
  grid-row-gap: 128px;
  grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
  min-height : 100vh;
  justify-items: center;
  @media (max-width: 840px) {
      grid-template-columns: auto;
      margin: 32px;
    }
}
.counter {
  margin-top: 24px;
  color: $grey;
}
</style>