<template>
  <div v-if="projectData" class="project-item" :id="`p-${projectData.id}`">
    <!-- MARKDOWN -->
    <div class="project-header">
      <ContentDoc :path="`projects/${ projectData.slug }`"></ContentDoc>
      
      <nuxt-link class="read-more-link" :to="{ path: 'projects/' + projectData.slug }">
        Read more
      </nuxt-link>
    </div>
    <div v-if="projectData.img" class="img-container">
      <!-- <img :src="projectData.img ? projectData.img : 'https://via.placeholder.com/600x335'" alt="Project Image" /> -->
      <img :src="'/img/' + projectData.img" alt="Project Image" />
      <!-- <img src="~/assets/img/tomstech.jpg" alt="Project Image" /> -->
    </div>
      <br>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "WubbelsWeb"    
    }
  },
  props: ['projectData'],
}
</script>

<style lang="scss">
.project-item {
  font-family: 'Manrope';
  // font-weight: 700;
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  list-style-type: none;
  text-align: left;
  padding: 24px;
  background: $grey-gradient;
  color: white;
  border-radius: 15px;
  // min-height: 320px;
  margin: 0;
  transition: .3s ease;
  @media (max-width: 840px) {
    width: 80%;
  }
  @media (max-width: 480px) {
      margin: auto;
      width: 100%;
  }
  @media (max-width: 300px) {
      margin: auto;
      width: 90%;
  }
   // Add a neon effect to the text
  .project-header {
      min-height: 340px;
      height: auto;
      position: relative;
      font-weight: 300;
      display: block;
      margin-bottom: -24px;
      h1 {
          color: $light-blue;
          font-weight: 700;
          font-size: 1.4rem;
          text-transform: uppercase;
          margin: 0;
          padding-bottom: 12px;
          display: block;
          font-family: 'Manrope';
      }
      p {
        font-family: 'Manrope';
        max-width: 90%;
        opacity: 0.95;
      }
      .read-more-link {
        border-radius: 10px;
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
        font-weight: 700;
        padding: 12px 24px;
        border: none;
        transition: .5s ease-out;
        color: $grey;
        text-decoration: none;
        &:hover {
            opacity: 0.8;
            color: #fff;
            background: $grey;
            transition: .5s ease-out;
            animation: AnimationName 3s infinite;
        }
      }
  }
  .img-container {
    display: block;
    object-fit: cover;
    height: 196px;
    width: 100%;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 0 0 15px 15px;
    img {
      height: 180px;
      width: 100%;
      object-fit: cover;
    }
    @media (max-width: 420px) {
      height: auto;
    }
  }
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