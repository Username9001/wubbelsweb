// import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  server: {
      host: '0.0.0.0',
      port: 3000
  },
  css: [
    '~/assets/css/main.scss'
  ],
  modules: [
    '@nuxt/content'
  ],
  // content: {
  //   base: './content'
  // }
  components: [{
    path: '~/components',
    global: true
  }]
})
