<template>
  <h3 class="tech-title">
    Worked with
  </h3>
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

<style lang="scss">
.tech-title {
  max-width: 840px;
  margin: auto;
}
.technologies {
  max-width: 840px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 24px;
  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
  .tech {
    background: $gradient1;
    color: #fff;
    // border-radius: 10px;
    margin: 0 auto;
    padding: 12px;
    @media (max-width: 840px) {
      margin: 12px 32px;
    }
    .tech-title {
      text-align: left;
      margin: 12px;
      font-family: 'Montserrat';
      color: $accent-color;
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