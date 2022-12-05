<template lang="">
    <Transition>
        <div>
            <div class="search-wrapper">
                <h2 class="grid-title">
                  Portfolio
                </h2>
                <!-- STACK OPTIONS SEARCH -->
                <SearchFilterButtons v-model="stack_search" @update-stack-search="(stack_search = $event)" :stack_options="stack_options" />
                <!-- TEXT SEARCH -->
                <SearchTextSearch v-model="search" @update-text-search="(search = $event)" :combinedFilter="combinedFilter" />
                <!-- RESULT DISPLAY -->
                <h3 class="counter" v-if="(combinedFilter.length)">
                  {{ combinedFilter.length }} Project<ins v-if="(combinedFilter.length > 1)">s</ins>
                </h3>
              </div>
    
              <div class="project-grid">
                <TransitionGroup name="list">
                  <Project v-for="project in combinedFilter" :key="project.name" :project="project" />
                </TransitionGroup>
              </div>
        </div>
    </Transition>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>