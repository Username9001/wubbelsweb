<template>
    <header v-if="personalia" class="header" id="home-header">
        <div class="text-box">
            <p>Hello, and welcome at</p>
            <h1>{{ personalia.name }}</h1>
            <h1>I create websites</h1>
            <p class="about">
                {{ personalia.description }}
            </p>
            <nuxt-link to="#main" class="header-link">
                <button>
                    View projects
                </button>
            </nuxt-link>
        </div>
    </header>
</template>

<script>
export default {
    props: ['personalia'],
}
</script>

<style lang="scss">
header {
  position: relative;
  height: calc(100vh - 164px);
  background: $grey;
  margin: auto;
  min-height: 100vh;
  @media (max-width: 840px) {
    padding: 12px 0;
  }
  color: #fff;
  .text-box {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    width: $base-content-width;
    transform: translate(-50%, calc(-50% - 164px));
    // letter-spacing: 1px;
    border-right: 32px solid $lightest-blue;
    @media (max-width: 840px) {
      width: 70%;
      margin: auto;
      border-right: 12px solid $lightest-blue;
      transform: translate(-50%, calc(-50% - 100px));
    }
    @media (max-width: 480px) {
      width: 90%;
      border-right: none;
    }
    p:nth-child(1) {
      padding-top: 0;
      padding-left: 3px;
    }
    padding: 0;
      h1, h2, h3 {
        font-family: 'Karrik';
        font-size: 4rem;
        font-weight: 300;
        @media (max-width: 840px) {
            font-size: 3rem;
            font-weight: 300;
        }
        @media (max-width: 420px) {
            font-size: 2rem;
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
        font-family: 'Manrope';
        @media (max-width: 840px) {
            max-width: 90%;
        }
        @media (max-width: 840px) {
            font-size: 1.1rem;
        }
        padding: 48px 0;
        &:nth-of-type(1) {
            // font-family: 'Manrope';
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
            font-family: 'Manrope';
          }
        }
      }
  }
}
</style>