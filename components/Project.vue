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
    <div class="used-tech">
      <small>Technologies used: </small>
      <div class="stack-list">
        <small v-for="item in project.stack" :key="item">
          <i>{{ item }}&nbsp;</i>
        </small>
      </div>
    </div>
    <div class="img-container">
      <img src="https://via.placeholder.com/600x338" alt="">
    </div>
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

<style lang="scss">
.stack-list {
  max-width: 100%;
  small {
    display: inline-block;
  }
}
</style>