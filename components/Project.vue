<template>
  <li class="project-item" @click="projectHighlight">
    <!-- MARKDOWN -->
    <ContentDoc v-if="project" :path="`projects/${ project.slug }`" class="project-header" />
    <!-- END OF MARKDOWN -->
    <div class="used-tech">
      <small>Technologies used: </small>
      <div class="stack-list">
        <small v-for="item in project.stack" :key="item">
          <i>{{ item }}&nbsp;</i>
        </small>
      </div>
    </div>
    <div class="img-container">
      <img :src="`${ project.img }`" alt="">
    </div>
      <br>
      <button v-if="project.link">
          <nuxt-link :to="`${ project.link }`" target="#">
            Visit {{ project.name }}
          </nuxt-link>
      </button>
  </li>
</template>

<script>
export default {
  props: ['project'],
  methods: {
    projectHighlight() {
      console.log( "Hello" )
    }
  }
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