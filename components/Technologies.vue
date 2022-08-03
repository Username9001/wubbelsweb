<template>
  <ul>
    <li v-for="tech in technologies" :key="tech">
      {{ tech }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </li>
  </ul>
</template>

<script>
export default {
  props: ['technologies']
}
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  li {
    display: inline-block;
  }
}
</style>