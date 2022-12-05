<template>
    <div>
        <slot />
        <slot name="namedSlot" />
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