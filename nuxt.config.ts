// import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: { 
    name: 'Demo Site',
    description: "Some juicy description",
    charset: 'utf-8',
    meta: [
      { name: 'theme-color', content: '#ffdd67' }
    ],
  },
  runtimeConfig: {
    public: {
      baseURL: '/',
    },
  },
  app: {
    head: {
      title: 'WubbbelsWeb',
      description: 'Base description',
      htmlAttrs: {
        lang: "en",  // it sets the language English    
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          // development
          // href: '/_nuxt/assets/fonts/Montserrat.ttf',
          // production
          // rel: 'preload',
          href: 'https://pftest.wubbbelsweb.com/fonts/Montserrat.ttf',
          as: 'font',
          type: 'font/ttf',
          // importance: 'high',
          // crossorigin: 'anonymous'
        },
        {
          // development
          // href: '/_nuxt/assets/fonts/Karrik-Regular.woff2',
          // production
          // rel: 'preload',
          href: 'https://pftest.wubbbelsweb.com/fonts/Karrik-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
          // importance: 'high',
          // crossorigin: 'anonymous'
        },
        { rel: 'manifest', href: '/manifest.json' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: [
    '~/assets/css/main.scss',
    // '~/assets/style/global.scss'
  ],
  modules: [
    '@nuxt/content',
    // 'nuxt-vite'
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
    optimization: {
      minimize: true
    },
  },
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
  },
  pages: true,
  ssr: true,
})
