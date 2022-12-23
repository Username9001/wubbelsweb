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
          href: 'fonts/Montserrat.ttf',
          as: 'font',
          type: 'font/ttf',
        },
        {
          href: 'fonts/Karrik-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
        },
        {
          href: 'fonts/Courgette-Regular.ttf',
          as: 'font',
          type: 'font/ttf',
        },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&&display=swap" }
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
    [
      '@nuxtjs/i18n',
      {
        defaultLocale: 'en',
        locales: [
          {
            code: 'en',
            name: 'English',
            file: 'en.js'
          },
        ]
      }
    ],
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@kevinmarrec/nuxt-pwa',
  ],
  pwa: {
    workbox: {
      enabled: true
    },
    manifest: {
      name: 'WubbelsWeb',
      short_name: 'WW',
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
