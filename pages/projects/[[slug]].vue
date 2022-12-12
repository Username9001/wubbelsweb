<template lang="">
    <Transition>
        <div :key="$route.params.slug">
            <header v-if="$route.params.slug" class="header">
                <section class="text-box">
                    <!-- <ContentDoc :path="`projects/${ $route.params.slug.toString() }`" class="project-header" /> -->
                    <ContentRenderer :value="data" >
                        <h1 v-if="data.title">{{ data.title }}</h1>
                        <p v-if="data.subtitle">{{ data.subtitle }}</p>
                        <p v-if="data.excerpt">{{ data.excerpt }}</p>
                    </ContentRenderer>
                    <nuxt-link aria-label="Read more" to="#main" class="header-link read-more-link">
                        Continue
                    </nuxt-link>
                </section>
            </header>
            <div class="main" id="main">
                <!-- <button :disabled="refreshing" @click="refreshAll">      Refetch All Data    </button> -->
                <div class="markdown-box" v-if="refreshed">
                    <!-- <ContentDoc :path="`projects/${ $route.params.slug.toString() }`" /> -->
                    <ContentRenderer :value="data">      
                        <h1>{{ data.title }}</h1>      
                        <p>{{ data.introduction }}</p>
                        <div class="img-container">
                            <img src="https://loremflickr.com/600/335" width="600" height="335"  alt="">
                            <small>Subscript for image</small>
                        </div>
                        <p>{{ data.further_description }}</p>
                        <div class="img-container container-large">
                            <img src="https://loremflickr.com/600/335" width="600" height="335"  alt="">
                            <small>Subscript for image</small>
                        </div>
                        <p>{{ data.ending_description }}</p>
                            <button class="to-website">
                                <nuxt-link :to="data.link" target="_blank">
                                    Visit website
                                </nuxt-link>
                            </button>
                            <button class="back-to-projects">
                                <nuxt-link to="/#project-grid">
                                    Back to projects
                                </nuxt-link>
                            </button>
                    </ContentRenderer>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

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
})

const route = useRoute()

const { data } = await useAsyncData('page-data', () => queryContent('/projects/'+ route.params.slug.toString()).findOne())

const refreshing = ref(false)
const refreshed = ref(false)

const refreshAll = async () => {
  refreshing.value = true
  try {
    await refreshNuxtData()
  } finally {
    refreshing.value = false
    refreshed.value = true
  }
}

// refresh on mount
onMounted(() => {
    refreshAll()
});
// refreshAll()

</script>

<style scoped lang="scss">
header .text-box {
    padding-bottom: 96px !important;
    .header-link {
        &:hover {
            opacity: 0.5;
            transition: .5s ease-out;    
        }
    }
}
.read-more-link {
    position: absolute;
    bottom: 0;
    height: auto;
    margin: 0;
    padding: 12px 24px;
    display: block;
    width: fit-content;
    z-index: 55;
    background: $lightest-blue;
    color: $grey;
    a {
        position: absolute;
        height: auto;
        font-weight: 700;
        padding: 12px 24px;
        border: none;
        transition: .5s ease-out;
        color: $grey;
        text-decoration: none;
        &:hover {
            color: #fff;
            // animation
            transition: .5s ease-out;
            transform: scale(1.05);
            animation: AnimationName 3s infinite;
        }
    }
}
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
        border-right: 32px solid $grey;
    }
    p {
        padding: 48px;
        margin: 60px auto;
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
        @media (max-width: 480px) {
            margin: 0;
            padding: 24px;
            max-width: 100%;
            &:nth-of-type(2) {
            margin: 0;
            text-align: right;
            float: right;
            }
            &:nth-of-type(3) {
                margin: 0;
                text-align: left;
            }
        }
    }
    .img-container {
        display: block;
        width: 80%;
        margin: 24px 48px 24px auto;
        img {
            width: 100%;
            max-height: 300px;
            object-fit: cover;
        }
    }
    .container-large {
        width: 120%;
        margin: 24px auto 24px -10%;
    }
    button {
        height: auto;
        width: fit-content;
        background: $grey;
        color: #fff;
        font-size: 1.4rem;
        font-family: 'Karrik';
        margin-left: auto;
        margin-right: 0;
        padding: 18px 24px;
        border: none;
        transition: .5s ease-out;
        opacity: 0.8;
        @media (max-width: 840px) {
            font-size: 1.2rem;
        }
        a {
            color: #fff;
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
      .back-to-projects {
        margin: 0;
        margin-top: -60px;
        padding: 18px 24px;
        bottom: 24px;
        left: 0;
        text-align: left;
        justify-content: left;
      }
      .to-website {
        margin-top: -60px;
        padding: 18px 24px;
        bottom: 24px;
        text-align: right;
        justify-content: right;
        @media (max-width: 840px) {
            margin-top: 0;
        }
      }
}
</style>