<template>
    <header class="header">
        <!-- <video ref="video" autoplay muted loop id="myVideo">
            <source src="~/assets/video/clouds.mp4" type="video/mp4">
        </video> -->
        <div class="text-box">
            <p>Hello, my name is</p>
            <h1>{{ personalia.name }}</h1>
            <h1>I create websites</h1>
            <p class="about">
                {{ personalia.description }}
            </p>
            <NuxtLink to="#main" class="header-link">
                <button>
                    View projects
                </button>
            </NuxtLink>
        </div>
    </header>
</template>

<script>
export default {
    props: ['personalia'],
    // mounted() {
    //     this.$refs.video.playbackRate = .5;
    // },
}
</script>

<style lang="scss">
header {
  position: relative;
  height: 100%;
  min-height: 90vh;
  background: $grey;
  margin: auto;
  padding: 72px 0;
  @media (max-width: 820px) {
    padding: 12px 0;
  }
  color: #fff;
  video {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .text-box {
    max-width: 820px;
    margin: 80px auto;
    letter-spacing: 1px;
    @media (max-width: 820px) {
        max-width: 70%;
    }
    @media (max-width: 480px) {
        max-width: 90%;
    }
    p:nth-child(1) {
      padding-top: 0;
    }
    padding: 0;
      h1, h2, h3 {
        font-family: 'Karrik';
        font-size: 4rem;
        font-weight: 300;
        @media (max-width: 820px) {
            font-size: 3rem;
            font-weight: 300;
        }
        &:nth-of-type(1) {
            opacity: 0.9;
        }
        &:nth-of-type(2) {
            opacity: 0.7;
            padding-top: 24px;
        }
      }
      p {
        font-size: 1.2rem;
        max-width: 50%;
        @media (max-width: 820px) {
            max-width: 100%;
        }
        padding: 48px 0;
        &:nth-of-type(1) {
            font-family: 'Montserrat';
            color: $light-blue;
        }
        &:nth-of-type(2) {
            opacity: 0.7;
        }
      }
      .header-link {
        text-decoration: none;
        display: block;
        width: fit-content;
        button {
            background: $grey;
            color: #fff;
            // opacity: 0.9;
            display: block;
            padding: 18px 24px;
            min-width: 120px;
            height: auto;
            font-size: 1.4em;
            text-decoration: none;
            border: 2px solid white;
            transition: .4s;
          &:hover {
            cursor: pointer;
            background: $light-blue;
            transition: .4s;
          }
          div {
            height: 100%;
            border-radius: 5px;
            padding: 8px;
            font-family: 'Montserrat';
          }
        }
      }
  }
}
</style>