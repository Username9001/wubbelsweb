<template>
<!-- <div class="quote-description">
  Well done, scrolling this far! Have some inspirational quotes (press to refresh)
</div> -->
  <footer id="footer">
    <!-- <Tegeltje /> -->
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
img {
  min-width: 30px;
  height: 30px;
  padding-top: 6px;
}
footer {
  position: relative;
  display: flex;
  color: #fff;
  line-height: 1.5em;
  overflow: hidden;
  vertical-align: text-bottom;
  justify-content: center;
  text-align: center;
  z-index: 1;
  min-height: 320px;
  .socials {
    list-style-type: none;
    position: absolute;
    bottom: 0;
    margin: 12px 0;
    overflow: hidden;
    border-radius: 5px;
    width: 100%;
    li {
      a {
        display: block;
        color: white;
        text-align: center;
        padding: 4px 16px;
        text-decoration: none;
        }
    }
  }
  // BACKGROUND VIDEO
  video {
    width: 100%;
    position: absolute;
    height: inherit;
    object-fit: cover;
    z-index: 0;
  }
}

</style>