<template>
  <h2 class="tech-title">
    I have worked with the following technologies
  </h2>
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
  data() {
    return {
      technologies: {
        front_end: {
          title: 'Front-end',
          list: [
            'HTML/CSS/JS',
            'Bootstrap',
            'VueJS/NuxtJS',
            'SASS',
            'Typescript',
          ],  
        },
        back_end: {
          title: 'Back-end',
          list: [
            'Wordpress',
            'PHP',
            'Laravel',
            'MySQL',
            'MongoDB',
            'GraphQL',
            'Docker',
          ],
        },
        other: {
          title: 'Other',
          list: [
            'Ubuntu/Linux',
            'DigitalOcean',
            'Arduino',
            'Raspberry Pi',
            'Git',
            'Terminal/CLI',
          ],
        }
      },
    }
  }
}
</script>

<style lang="scss">
.tech-title {
  color: #fff;
  max-width: $base-content-width;
  width: 100%;
  margin: 32px auto;
  font-size: 2rem;
}
.technologies {
  max-width: $base-content-width;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 24px;
  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
  .tech {
    // background: $gradient1;
    color: #fff;
    margin: 0 auto;
    padding: 12px;
    @media (max-width: 840px) {
      margin: 12px 32px;
    }
    .tech-title {
      text-align: left;
      margin: 12px;
      font-family: 'Montserrat';
      color: $light-blue;
    }
    .tech-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-bottom: 12px;
      .tech-item {
        text-align: left;
        padding: 3px 12px;
      }
    }
  }
}
</style>