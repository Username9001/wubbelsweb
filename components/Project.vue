<template>
  <div v-if="projectData" class="project-item">
    <!-- MARKDOWN -->
    <div class="project-header">
      <ContentDoc :path="`projects/${ projectData.slug }`"></ContentDoc>
        <nuxt-link class="read-more-link" :to="{ path: 'projects/' + projectData.slug }">
          Visit project page
        </nuxt-link>
    </div>
    <div class="img-container">
      <img :src="`${ projectData.img }`" alt="" />
    </div>
      <br>
  </div>
</template>

<script>
export default {
  props: ['projectData'],
}
</script>

<style lang="scss">
.project-item {
  display: block;
  position: relative;
  width: 100%;
  min-height: 720px;
  list-style-type: none;
  text-align: left;
  padding: 36px 48px;
  background: $grey;
  color: white;
  min-height: 300px;
  height: 100%;
  margin: 48px auto;
  transition: .3s ease;
  @media (max-width: 840px) {
    width: 80%;
  }
  .project-header {
      min-height: 180px;
      margin-bottom: 80px;
      // border-right: 12px solid $lightest-blue;
      position: relative;
      font-size: 1.2rem;
      font-weight: 300;
      h1 {
          color: $light-blue;
          font-weight: 700;
          font-size: 1.4rem;
          text-transform: uppercase;
          margin: 0;
          padding-bottom: 24px;
          display: block;
          font-family: 'Montserrat';
      }
      p {
        max-width: 90%;
        opacity: 0.95;
      }
      .read-more-link {
        position: absolute;
        bottom: 0;
        height: auto;
        margin: 0;
        display: block;
        width: fit-content;
        z-index: 55;
      }
      a.read-more-link {
        position: absolute;
        height: auto;
        background: $light-blue;
        // font-weight: 700;
        padding: 12px 24px;
        border: none;
        transition: .5s ease-out;
        color: $grey;
        text-decoration: none;
        &:hover {
            opacity: 0.5;
            transition: .5s ease-out;
            animation: AnimationName 3s infinite;
        }
      }
  }
  // .img-container {
  img {
    height: 180px;
    object-fit: cover;
    // height: auto;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    // border-top: 36px solid $lightest-blue;
  }
  // }
  .used-tech {
    ul {
      list-style-type: none;
    }
  }
}
.stack-list {
  max-width: 100%;
  small {
    display: inline-block;
  }
}
</style>