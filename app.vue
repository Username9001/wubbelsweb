<template>
  <NuxtLayout>
      <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const counter = useState('counter', () => Math.round(Math.random() * 1000))
const sameCounter = useState('counter')

const nuxtApp = useNuxtApp()

nuxtApp.hook("page:finish", () => {
   window.scrollTo(0, 0)
})
</script>