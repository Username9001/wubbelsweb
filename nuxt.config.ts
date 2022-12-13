// import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: '/',
    },
  },
  app: {
    head: {
      title: 'WubbbelsWeb',
      // description: 'Base description',
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
          href: 'fonts/Montserrat.ttf',
          as: 'font',
          type: 'font/ttf',
          // importance: 'high',
          // crossorigin: 'anonymous',
          // display: 'swap'
        },
        {
          // development
          // href: '/_nuxt/assets/fonts/Karrik-Regular.woff2',
          // production
          // rel: 'preload',
          href: 'fonts/Karrik-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
          // importance: 'high',
          // crossorigin: 'anonymous',
          // display: 'swap'
        },
        // { rel: 'manifest', href: '/manifest.json' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: [
    '~/assets/css/main.scss',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@kevinmarrec/nuxt-pwa',
  ],
  pwa: {
    workbox: {
      enabled: true
    },
    manifest: {
      name: 'Portfolio Erik Wubbels',
      short_name: 'PF EW',
      theme_color: '#002b38',
      lang: 'en',
    },
    icon: {
      fileName: 'icon.png',
      // purpose: 'any'
    }
  },
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
    // optimization: {
    //   minimize: true
    // },
  },
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
  },
  pages: true,
  ssr: false,
  
})
