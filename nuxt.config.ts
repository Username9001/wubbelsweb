// import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    '~/assets/css/main.scss',
    // '~/assets/style/global.scss'
  ],
  modules: [
    '@nuxt/content',
  ],
  components: [{
    path: '~/components',
    global: true
  }],
  vite: {
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/style/variables.scss";',
            },
        },
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})
