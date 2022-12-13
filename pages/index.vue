<template>
  <Transition>
    <div id="portfolio" v-if="projectStore">
      <Header :personalia="personaliaStore.personalia" />
      <div id="main" class="main">
        <!-- PROJECT LOOKUP -->
        <div class="search-wrapper" id="projects">
          <h1 class="grid-title">
            Portfolio
          </h1>
          <!-- STACK OPTIONS SEARCH -->
          <div class="filter" v-if="searchTab">
            <button class="filter-button" :class="{ activeFilter: searchTab === 'all' }" @click="searchTab = 'all'">All</button>
            <button class="filter-button" :class="{ activeFilter: searchTab === 'toggledTechs' }" @click="searchTab = 'toggledTechs'">Filter</button>
          </div>
          <button v-if="searchTab === 'toggledTechs'" @click="andOr = !andOr" class="">
            <small>Filters:</small>
            <div :class="{ highlight: andOr }">
              Combine checked technologies
            </div>
            <div :class="{ highlight: !andOr }">
              Include all checked technologies
            </div>
          </button>
          <SearchSelectTech v-if="searchTab === 'toggledTechs'" :andOr="andOr" />
        </div>

        <!-- Counter  -->
        <div class="counter">
          {{ projectStore.getProjects }} Projects
        </div>
        
        <div id="project-grid">
          <transition-group name="list">
              <Project v-if="searchTab === 'all'" v-for="project in projectStore.projects" :key="project.slug" :projectData="project" />
              <!-- <Project v-if="searchTab === 'favs'" v-for="project in projectStore.favs" :key="project.slug" :projectData="project" /> -->
              <Project v-if="searchTab === 'toggledTechs' && !andOr" v-for="project in projectStore.projectsFilteredOr" :key="project.slug" :projectData="project" />
              <Project v-if="searchTab === 'toggledTechs' && andOr" v-for="project in projectStore.projectsFilteredAnd" :key="project.slug" :projectData="project" />
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
    const personaliaStore = usePersonaliaStore()
    const projectStore = useProjectStore()
    const techFilterStore = useTechFilterStore()
    
    const searchTab = ref('all')
    const andOr = ref(true)

    return { personaliaStore, projectStore, techFilterStore, searchTab, andOr }
  },
}
</script>

<style lang="scss">
.highlight {
  background: $grey;
  color: #fff;
  opacity: 0.8;
}
.counter {
  margin: auto;
  width: $base-content-width;
  display: block;
}
// FILTER 
.search-wrapper {
  max-width: $base-content-width;
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
  .filter-button {
    display: inline-block;
    padding: 12px;
    margin: 12px 12px 0 0;
    width: fit-content;
    font-family: 'Karrik';
    font-size: 1.2rem;
    font-weight: 700;
    color: $grey;
    opacity: 0.6;
  }
  .activeFilter {
    opacity: 1;
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
  max-width: $base-content-width;
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