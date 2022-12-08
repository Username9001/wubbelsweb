// import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
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
          rel: 'preload',
          // development
          // href: '/_nuxt/assets/fonts/Montserrat.ttf',
          // production
          href: 'http://192.168.1.25:3000/fonts/Montserrat.ttf',
          as: 'font',
          type: 'font/ttf',
          importance: 'high',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          // development
          // href: '/_nuxt/assets/fonts/Karrik-Regular.woff2',
          // production
          href: 'http://192.168.1.25:3000/fonts/Karrik-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
          importance: 'high',
          crossorigin: 'anonymous'
        },
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
    // build: {
    //   ssr: true,
    // }
  },
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true
    }
  },
  pages: true,
  ssr: true,
  // build: {
  //   extractCSS: true,
  //   optimizeCSS: true,
  //   html:{
  //     minify:{
  //       collapseBooleanAttributes: true,
  //       decodeEntities: true,
  //       minifyCSS: true,
  //       minifyJS: true,
  //       processConditionalComments: true,
  //       removeEmptyAttributes: true,
  //       removeRedundantAttributes: true,
  //       trimCustomFragments: true,
  //       useShortDoctype: true,
  //       minifyURLs: true,
  //       removeComments: true,
  //       removeEmptyElements: true,
  //       preserveLineBreaks: false,
  //       collapseWhitespace: true    
  //     }
  //   }
  // }
})
