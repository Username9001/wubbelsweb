<template>
  <div class="technologies">
    <div v-for="stack in technologies" :key="stack" class="tech">
      <h3 class="tech-title">{{ stack.title }}</h3>
      <div class="tech-list">
        <div v-for="tech in stack.list" :key="tech" class="tech-item">
          {{ tech }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['technologies']
}
</script>

<style>

</style>