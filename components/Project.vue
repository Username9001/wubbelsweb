<template>
  <div v-if="project" class="project-item" @click="projectHighlight">
    <!-- MARKDOWN -->
    <div class="project-header">
      <ContentDoc :path="`projects/${ project.slug }`"></ContentDoc>
      <!-- END OF MARKDOWN -->
      <!-- <div class="used-tech">
        <small>Technologies used: </small>
        <ul class="stack-list">
          <li v-for="item in project.stack" :key="item">
            <i>{{ item }}&nbsp;</i>
          </li>
        </ul>
      </div> -->
      <nuxt-link v-if="project" :to="{ path: 'projects/' + project.slug }">
        <button class="read-more-link">
          Read more
        </button>
      </nuxt-link>
    </div>
    <div class="img-container">
      <img :src="`${ project.img }`" alt="" />
      <!-- <img src="http://192.168.1.25:3000/img/test.jpg" /> -->
    </div>
      <br>
      <!-- <button v-if="project.link">
          <nuxt-link :to="`${ project.link }`" target="#">
            Visit {{ project.name }}
          </nuxt-link>
      </button> -->
  </div>
</template>

<script>
export default {
  props: ['project'],
  methods: {
    projectHighlight() {
      // console.log( "Hello" )
    }
  }
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
  padding: 48px;
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
      border-right: 12px solid $lightest-blue;
      position: relative;
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
      button {
        position: absolute;
        height: auto;
        background: $light-blue;
        font-weight: 700;
        padding: 12px 24px;
        border: none;
        transition: .5s ease-out;
        a {
            color: #fff;
            text-shadow: 0 0 5px #000;
            text-decoration: none;
        }
        &:hover {
            color: #fff;
            // animation
            transition: .5s ease-out;
            transform: scale(1.05);
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