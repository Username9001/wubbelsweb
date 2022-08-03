<template>
  <li class="project-item">
    <div class="project-header">
        <h2 class="project-title">
          {{ project.title}}
        </h2>
    </div>
    <p>
      {{ project.description }}
    </p>
      <small>Technologies used: </small>
      <small v-for="item in project.stack" :key="item">
        <i>{{ item }}</i>
      </small>
      <br>
      <button v-if="project.link">
          <nuxt-link :to="`${ project.link }`" target="#">
            Visit {{ project.title }}
          </nuxt-link>
      </button>
  </li>
</template>

<script>
export default {
  props: ['project']
}
</script>

<style>
</style>