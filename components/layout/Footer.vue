<template>
  <footer id="footer">
    <Technologies />
  </footer>
</template>

<script>
export default {
  data() {
    return {
      contactInfo: {
        email: 'erik.wubbels@gmail.com',
      },
    }
  },
}
</script>

<style lang="scss">
footer {
  position: relative;
  color: #fff;
  opacity: 0.7;
  line-height: 1.5em;
  overflow: hidden;
  vertical-align: text-bottom;
  justify-content: center;
  text-align: center;
  z-index: 1;
  padding-top: 120px;
  padding-bottom: 24px;
}
</style>