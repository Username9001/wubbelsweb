<template lang="">
    <Transition>
        <div class="about">
            <header class="header">
                <section class="text-box">
                    <p>Looking to know more?</p>
                    <h1>A short story</h1>
                    <h1>About me</h1>
                    <p></p>
                    <NuxtLink to="#about" class="header-link">
                        <button>
                            Continue reading
                        </button>
                    </NuxtLink>
                </section>
            </header>
            <div class="main" id="about">
                <div class="markdown-box">
                    <ContentRenderer :value="data">      
                        <h1>{{ data.title }}</h1>
                        <div class="text-top">
                            <p>{{ data.description }}</p>
                            <p>{{ data.further_description }}</p>
                        </div>      
                        <div class="img-container">
                            <img src="https://loremflickr.com/600/335" alt="">
                            <small>Subscript for image</small>
                        </div>
                        <p>{{ data.ending_description }}</p>
                    </ContentRenderer>
                </div>
            </div>
            <!-- <div class="main" id="about">
                <div class="text-block">
                    <p>I started my journey as a programmer while studying Industrial Design. Making websites to showcase my progress and creating programs for microcontrollers.</p>
                    <p class="second-paragraph">From there on out I branched out into web development. Over the years I have gained experience working on both frontend and backend applications.</p>
                </div>
            </div> -->
        </div>
    </Transition>
</template>
<script setup lang="ts">
const { data } = await useAsyncData('page-data', () => queryContent('/about').findOne())

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

</script>
<style scoped lang="scss">
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
    }
    p {
        padding: 48px;
        margin: 120px auto;
        font-size: 1.2rem;
        grid-row: 1;
        letter-spacing: 1px;
        line-height: 1.6rem;
        opacity: 0.7;
    }
    .text-top {
        display: grid;
        grid-template-rows: auto auto;
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