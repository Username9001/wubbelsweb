<template lang="">
    <div class="stack-list">
        <!-- Frontend -->
        <div class="column">
            <h2>Frontend</h2>
            <div v-for="option in frontEnd" class="stack-option">
                <button @click="techFilterStore.toggleTech(option.title)" :class="[{ isActive: option.toggled }, { noneLeft: andOr && projectStore.projectsFilteredAnd.filter(p => p.stack.includes(option.title)).length == 0 }]">
                    {{ option.title }} 
                    <!-- IF INCLUDED -->
                    <!-- <div v-if="andOr && projectStore.projectsFilteredAnd.filter(p => p.stack.includes(option.title)).length" style="display:inline">
                        ({{ projectStore.projectsFilteredAnd.filter(p => p.stack.includes(option.title)).length }})
                    </div> -->
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
            <div v-for="option in tech_options.filter(o => o.category == 'Backend').sort((a, b) => (a.title.length > b.title.length) ? -1 : 1)" class="stack-option">
                <button @click="techFilterStore.toggleTech(option.title)" :class="[{ isActive: option.toggled }, { noneLeft: andOr && projectStore.projectsFilteredAnd.filter(p => p.stack.includes(option.title)).length == 0 }]">
                    {{ option.title }}
                    <!-- IF INCLUDED -->
                    <!-- <div v-if="andOr && projectStore.projectsFilteredAnd.filter(p => p.stack.includes(option.title)).length" style="display:inline">
                        ({{ projectStore.projectsFilteredAnd.filter(p => p.stack.includes(option.title)).length }})
                    </div> -->
                    <!-- IF NOT INCLUDED -->
                    <div v-if="techFilterStore.toggledTechs" style="display:inline">
                        (0)
                        {{ }}
                        {{ techFilterStore.toggledTechs }}
                    </div>
                </button>
            </div>
        </div>
        <!-- Other -->
        <div class="column">
            <h2>Other</h2>
            <div v-for="option in tech_options.filter(o => o.category == 'Other').sort((a, b) => (a.title.length > b.title.length) ? -1 : 1)" class="stack-option">
                <button @click="techFilterStore.toggleTech(option.title)" :class="[{ isActive: option.toggled }, { noneLeft: andOr && projectStore.projectsFilteredAnd.filter(p => p.stack.includes(option.title)).length == 0 }]">
                    <!-- title -->
                    {{ option.title }}
                    <!-- IF INCLUDED -->
                    <!-- <div v-if="andOr && projectStore.projectsFilteredAnd.filter(p => p.stack.includes(option.title)).length" style="display:inline">
                        ({{ projectStore.projectsFilteredAnd.filter(p => p.stack.includes(option.title)).length }})
                    </div> -->
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
        <!-- <div class="column">
            Filtered Projects: {{ projectStore.projectsFilteredAnd.length }}
        </div> -->
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
        
        const frontEnd = tech_options.filter(o => o.category == 'Frontend').sort((a, b) => (a.title.length > b.title.length) ? -1 : 1)

        return { techFilterStore, tech_options, selected_techs, projectStore, frontEnd }
  },
  props: ['andOr']
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
    grid-template-columns: repeat(3, minmax(0, 1fr));
    .column {
        // display: grid;
        // grid-template-columns: repeat(2, minmax(0, 1fr));
        .stack-option {
          display: block;
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
            opacity: 1 !important;
            color: #fff;
            transition: .2s ease-out;
          }
          .noneLeft {
            opacity: .2;
          }
        }
    }
  }
</style>