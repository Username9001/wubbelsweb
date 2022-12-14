<template>
  <Transition>
    <!-- <ContentDoc :path="`projects/${ projectData.slug }`"></ContentDoc> -->
    
      <!-- <ContentRenderer v-if="projectData" :value="projectData">      
        <h1>{{ projectData.title }}</h1>      
        <ContentRendererMarkdown :value="projectData" />    
      </ContentRenderer> -->

      <!-- <ContentRenderer :path="`projects/${ projectData.slug }`" :value="projectData">
        <h1>{{ projectData.title }}</h1>
        <ContentRendererMarkdown :value="projectData" />
      </ContentRenderer> -->

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
          <transition-group name="filters">
            <div v-if="searchTab === 'toggledTechs'" @click="andOr = !andOr" class="">
              <button class="search-logic" :class="{ highlight: andOr }">
                Combine checked technologies
              </button>
              <button class="search-logic" :class="{ highlight: !andOr }">
                Include all checked technologies
              </button>
            </div>
            <SearchSelectTech v-if="searchTab === 'toggledTechs'" :andOr="andOr" />
          </transition-group>
        </div>

        
        <div class="projects">
          <!-- Counter  -->
          <transition-group name="list">
            <h2 v-if="searchTab !== 'all'" class="counter">
              {{ projectStore.getProjectsLength }} Project<ins v-if="projectStore.getProjectsLength !== 1">s</ins>
            </h2>
            <h2 v-if="searchTab === 'all'" class="counter">
              {{ projectStore.projects.length }} Projects
            </h2>
          </transition-group>
          <div id="project-grid">
            <transition-group name="list">
                <Project v-if="searchTab === 'all'" v-for="project in projectStore.projectsFilteredAll" :key="project.slug" :projectData="project" />
                <Project v-if="searchTab === 'toggledTechs' && !andOr" v-for="project in projectStore.projectsFilteredOr" :key="project.slug" :projectData="project" />
                <Project v-if="searchTab === 'toggledTechs' && andOr" v-for="project in projectStore.projectsFilteredAnd" :key="project.slug" :projectData="project" />
            </transition-group>
          </div>
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
  head() {
    return {
      title: "WubbelsWeb"    
    };
  },
  setup () {
    const personaliaStore = usePersonaliaStore()
    const projectStore = useProjectStore()
    const techFilterStore = useTechFilterStore()
    
    const searchTab = ref('all')
    const andOr = ref(true)
    
    // const updateCounter = projectStore.updateProjectsLength()

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
    width: 80%;
    border-right: 12px solid $grey;
    // text-overflow: ellipsis;
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
    @media (max-width: 840px) {
      &:first-of-type {
        margin-bottom: 12px;
      }
    }
    @media (max-width: 420px) {
      width: 100%;
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
// PROJECT GRID DISPLAY
.projects {
  max-width: $base-content-width;
  margin: 128px auto;
  // COUNTER
  h2.counter {
    font-size: 1.6rem;
    margin-top: 24px;
    color: $grey;
    margin: auto;
    width: $base-content-width;
    display: block;
    grid-column: span 2;
    opacity: 0.9;
    @media (max-width: 840px) {
      margin: auto;
      max-width: 80%;
    }
  }
  #project-grid {
    /* Positioning */
    position: relative;
    z-index: 3;
    /* Display & Box Model */
    padding: 0;
    display: grid;
    /* Grid */
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-column-gap: 128px;
    grid-row-gap: 128px;
    grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
    justify-items: center;
    /* Text */
    text-align: left;
    // &:nth-child(2) {
    //   grid-row-gap: 12px;
    // }
    /* Media Queries */
    @media (max-width: 840px) {
        grid-template-columns: auto;
        margin: 32px;
      }
  }
}
</style>