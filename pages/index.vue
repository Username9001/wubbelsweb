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
          <div v-if="searchTab === 'toggledTechs'" @click="andOr = !andOr" class="">
            <!-- <small>Filters:</small> -->
            <button class="search-logic" :class="{ highlight: andOr }">
              Combine checked technologies
            </button>
            <button class="search-logic" :class="{ highlight: !andOr }">
              Include all checked technologies
            </button>
          </div>
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
// FILTER 
.search-wrapper {
  /* Positioning */
  position: relative;
  z-index: 2;
  /* Display & Box Model */
  max-width: $base-content-width;
  margin: 220px auto 0 auto;
  border-right: 32px solid $grey;
  /* Text */
  font-size: 1.2rem;
  /* Media Queries */
  @media (max-width: 840px) {
    width: 70%;
    border-right: 12px solid $grey;
  }

  @media (max-width: 480px) {
    width: 90%;
    border-right: none;
    // border-bottom: 2px solid $light-blue;
  }
  /* Nested Selectors */
  .search-logic {
    padding: 12px;
    background: #002b38;
    color: white;
    opacity: 0.75;
    transition: 0.2s ease-out;
    font-family: "Karrik";
    font-size: 1.2rem;
    margin-right: 12px;
    &.highlight {
      background: $grey;
      color: #fff;
      opacity: 1;
    }
  }
  .grid-title {
    color: $grey;
    opacity: 0.8;
    font-size: 3em;
    font-weight: 700;
    font-family: 'Montserrat';
  }
  h4 {
    margin: 12px auto;
  }

  .filter-button {
    /* Positioning */
    display: inline-block;
    /* Display & Box Model */
    padding: 12px;
    margin: 12px 12px 0 0;
    width: fit-content;
    /* Text */
    font-family: 'Karrik';
    font-size: 1.2rem;
    font-weight: 700;
    color: $grey;
    opacity: 0.6;
  }

  .activeFilter {
    /* Other */
    opacity: 1;
  }
}
// COUNTER
.counter {
  margin-top: 24px;
  color: $grey;
  margin: auto;
  width: $base-content-width;
  display: block;
}
// PROJECT GRID DISPLAY
#project-grid {
  /* Positioning */
  position: relative;
  z-index: 3;
  /* Display & Box Model */
  max-width: $base-content-width;
  margin: 128px auto;
  padding: 0;
  display: grid;
  /* Grid */
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-column-gap: 128px;
  grid-row-gap: 128px;
  grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
  justify-items: center;
  /* Text */
  text-align: left;
  /* Media Queries */
  @media (max-width: 840px) {
      grid-template-columns: auto;
      margin: 32px;
    }
}
</style>