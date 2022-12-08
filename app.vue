<template>
  <NuxtLayout>
      <NuxtPage/>
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue';

const counter = useState('counter', () => Math.round(Math.random() * 1000))
const sameCounter = useState('counter')

const nuxtApp = useNuxtApp()

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0)
})
</script>