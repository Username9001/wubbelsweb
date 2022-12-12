<template lang="">
    <div class="stack-list">
        <!-- Frontend -->
        <div class="column">
            <h2>Frontend</h2>
            <div v-for="option in tech_options.filter(o => o.category == 'Frontend')" class="stack-option">
                <button @click="techFilterStore.toggleTech(option.title)" :class="{ isActive: option.toggled }">
                    {{ option.title }} 
                    <!-- IF INCLUDED -->
                    <div v-if="projectStore.projectsFiltered.filter(p => p.stack.includes(option.title)).length" style="display:inline">
                        ({{ projectStore.projectsFiltered.filter(p => p.stack.includes(option.title)).length }})
                    </div>
                    <!-- IF NOT INCLUDED -->
                    <div v-if="techFilterStore.toggledTechs" style="display:inline">
                        (0)
                        {{ techFilterStore.toggledTechs }}
                    </div>
                </button>
            </div>
        </div>
        <!-- Backend -->
        <div class="column">
            <h2>Backend</h2>
            <div v-for="option in tech_options.filter(o => o.category == 'Backend')" class="stack-option">
                <button @click="techFilterStore.toggleTech(option.title)" :class="{ isActive: option.toggled }">
                    {{ option.title }}
                    <!-- IF INCLUDED -->
                    <div v-if="projectStore.projectsFiltered.filter(p => p.stack.includes(option.title)).length" style="display:inline">
                        ({{ projectStore.projectsFiltered.filter(p => p.stack.includes(option.title)).length }})
                    </div>
                    <!-- IF NOT INCLUDED -->
                    <div v-if="techFilterStore.toggledTechs" style="display:inline">
                        (0)
                        {{ techFilterStore.toggledTechs }}
                    </div>
                </button>
            </div>
        </div>
        <!-- Other -->
        <div class="column">
            <h2>Other</h2>
            <div v-for="option in tech_options.filter(o => o.category == 'Other')" class="stack-option">
                <button @click="techFilterStore.toggleTech(option.title)" :class="{ isActive: option.toggled }">
                    <!-- title -->
                    {{ option.title }}
                    <!-- IF INCLUDED -->
                    <div v-if="projectStore.projectsFiltered.filter(p => p.stack.includes(option.title)).length" style="display:inline">
                        ({{ projectStore.projectsFiltered.filter(p => p.stack.includes(option.title)).length }})
                    </div>
                    <!-- IF NOT INCLUDED -->
                    <div v-if="techFilterStore.toggledTechs" style="display:inline">
                        (0)
                        {{ techFilterStore.toggledTechs }}
                    </div>
                    <!-- counter -->
                    <!-- {{ }} -->
                </button>
            </div>
        </div>
        <br>
        <div class="column">
            Filtered Projects: {{ projectStore.projectsFiltered.length }}
        </div>
    </div>
</template>
<script>
import { useTechFilterStore } from "~~/stores/techFilter"
import { useProjectStore } from "~~/stores/projects"

export default {
    setup () {
        const techFilterStore = useTechFilterStore()
        const tech_options = techFilterStore.showAllTechs
        const selected_techs = techFilterStore.showSelectedTechs

        const projectStore = useProjectStore()

        return { techFilterStore, tech_options, selected_techs, projectStore }
  },
}
</script>
<style lang="scss">
.isActive {
    background: $grey;
}
.stack-list {
    width: 100%;
    text-align: left;
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    .stack-option {
      display: inline-block;
      margin: 12px 12px 0 0;
      width: auto;
      button {
        padding: 12px;
        background: $grey;
        color: white;
        opacity: .75;
        transition: .2s ease-out;
        font-family: 'Karrik';
        font-size: 1.2rem;
        &:hover {
          cursor: pointer;        
        }
      }
      .isActive {
        opacity: 1;
        color: #fff;
        transition: .2s ease-out;
      }
    }
  }
</style>