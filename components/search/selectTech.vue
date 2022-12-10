<template lang="">
    <div class="options">
        <div v-for="option in tech_options" style="display:inline-block;">
            {{ option.title }}
            <button @click="techFilterStore.toggleTech(option.title)" :class="{ isActive: option.toggled }">
            Toggle option
            </button>
        </div>
        <br>
    </div>
</template>
<script>
import { useTechFilterStore } from "~~/stores/techFilter"

export default {
    setup () {
        const techFilterStore = useTechFilterStore()
        const tech_options = techFilterStore.showAllTechs
        const selected_techs = techFilterStore.showSelectedTechs

        // const handleSubmit = (option) => {
            // if (newTask.value.length > 0) {
            //     techFilterStore.toggleTech(
            //         option
            //     )
            //     console.log( "toggling", option.title, option.toggled )
            // // }
        // }

        return { techFilterStore, tech_options, selected_techs }
  },
}
</script>
<style lang="scss">
.isActive {
    background: #000;
}
</style>