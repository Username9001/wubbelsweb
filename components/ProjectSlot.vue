<template>
    <div>
      <p>
        <slot />
      </p>
      <small>
        <slot name="subtitle" />
      </small>
      <slot name="excerpt" />
      <!-- <slot name="description" /> -->
    </div>
</template>
<script>
export default {
    head() {
      return {
        title: "WubbelsWeb"    
      };
    },
};
</script>
<style scoped lang="scss">
  img {
    max-width: 100%;
    max-height: 300px;
    object-fit: cover;
    &:nth-of-type(1) {
      margin-right: -80px;
    }
  }
</style>