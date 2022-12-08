<template lang="">
    <div v-if="$route.params.slug">
        <header class="header">
            <section class="text-box">
                <ContentDoc :path="`projects/${ $route.params.slug.toString() }`" class="project-header" />
            </section>
        </header>
        <div class="main">
            <div class="markdown-box">
                <ContentRenderer :value="data">      
                    <h1>{{ data.title }}</h1>      
                    <p>{{ data.description }}</p>
                    <div class="img-container">
                        <img src="https://loremflickr.com/600/335" alt="">
                        <small>Subscript for image</small>
                    </div>
                    <p>{{ data.further_description }}</p>
                    <div class="img-container container-large">
                        <img src="https://loremflickr.com/600/335" alt="">
                        <small>Subscript for image</small>
                    </div>
                    <p>{{ data.ending_description }}</p>
                    <button>
                        <nuxt-link :to="data.link" target="_blank">
                            Visit website
                        </nuxt-link>
                    </button>
                </ContentRenderer>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute()

const { data } = await useAsyncData('page-data', () => queryContent('/projects/'+ route.params.slug.toString()).findOne())

defineProps({
  title: {
    type: String,
    default: 'Default title'
  },
  description: {
    type: String,
    default: 'Default description'
  },
  further_description: {
    type: String,
    default: 'Default description'
  },
  ending_description: {
    type: String,
    default: 'Default description'
  },
//   icon: {
//     type: String,
//     default: 'IconMarkdown'
//   }
})

</script>

<style lang="scss">
.markdown-box {
    width: 100%;
    max-width: 840px;
    margin: 140px auto;
    * {
        display: block;
    }
    h1 {
        font-size: 6rem;
        color: $grey;
        // margin-bottom: 96px;
    }
    p {
        padding: 48px;
        margin: 120px auto;
        font-size: 1.2rem;
        max-width: 75%;
        letter-spacing: 1px;
        line-height: 1.6rem;
        opacity: 0.7;
        &:nth-of-type(2) {
            margin-right: 0;
            margin-left: auto;
            text-align: right;
        }
        &:nth-of-type(3) {
            margin: 82px auto;
            text-align: left;
        }
    }
    .img-container {
        display: block;
        width: 80%;
        margin: 24px 48px 24px auto;
    }
    .container-large {
        width: 120%;
        margin: 24px auto 24px -10%;
        img {
            width: 100%;
        }
    }
    button {
        height: auto;
        width: fit-content;
        background: $grey;
        color: $lightest-blue;
        font-size: 2rem;
        font-family: 'Karrik';
        margin-left: auto;
        margin-right: 0;
        padding: 12px 24px;
        border: none;
        transition: .5s ease-out;
        a {
            color: $lightest-blue;
            text-shadow: 0 0 5px #000;
            text-decoration: none;
            transition: .5s ease-out;
        }
        &:hover a {
            color: #fff;
            // animation
            transition: .5s ease-out;
            transform: scale(1.05);
            animation: AnimationName 3s infinite;
            cursor: pointer;
        }
      }
}
</style>