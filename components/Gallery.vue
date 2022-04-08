<template>
  <b-container class="gallery-container text-center">
    <!-- LIVE WEBSITES -->
      <h3>Live websites</h3>
      <b-row>
        <b-col v-for="site in websites" :key="site.id" cols="4">
          <b-card
            v-b-modal="`${site.title}`"
            :img-src="`${site.img}`"
            img-top
          >
            <h5>
              {{ site.title }}
            </h5>
          </b-card>
          <b-modal 
            :id="site.title" centered
            size="xl"
          >
            <b-img thumbnail :src="`${site.img}`" alt=""></b-img>
            <a :href="site.link">
              <h2 class="my-4 text-right">
                {{ site.title }}
              </h2>
            </a>
            <p class="my-0 text-right">{{ site.description }}</p>
            <b-list-group horizontal>
              Technologiën:
              <hr>
              <b-list-group-item v-for="tech in site.tech" :key="tech.name">
                <img :src="tech.img" :alt="tech.name" class="tech_logo">
              </b-list-group-item>
            </b-list-group>
          </b-modal>
        </b-col>
      </b-row>
    <!-- PROTOTYPES -->
      <h3>Prototypes</h3>
      <b-row>
        <b-col v-for="proto in prototypes" :key="proto.id" cols="4">
          <b-card 
            v-b-modal="`${proto.title}`"
            :img-src="`${proto.img}`"
            img-top
          >
            <h5>
              {{ proto.title }}
            </h5>
          </b-card>
          <b-modal 
            :id="proto.title" 
            centered
            size="xl"
          >
            <b-img thumbnail :src="`${proto.img}`" alt=""></b-img>
            <a :href="proto.link">
              <h2 class="my-4 text-right">{{ proto.title }}</h2>
            </a>
            <p class="my-0 text-right">{{ proto.description }}</p>
            <b-list-group horizontal>
              Technologiën:
              <hr>
              <b-list-group-item v-for="tech in proto.tech" :key="tech.name">
                <img :src="tech.img" :alt="tech.name" class="tech_logo">
              </b-list-group-item>
            </b-list-group>
          </b-modal>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      websites: [
        {
          id: 1,
          title: 'TomsTech',
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium quis sit impedit rerum quam blanditiis culpa fugit dolores ad quibusdam?',
          link: 'https://tomstech.nl',
          img: 'https://picsum.photos/820/420',
          tech: [
            {
              name: 'Wordpress',
              img: '/wp_logo.png',
            },
            {
              name: 'Sass',
              img: '/sass_logo.png',
            },
            {
              name: 'DigitalOcean',
              img: '/do_logo.png',
            },
          ]
        },
        {
          id: 2,
          title: 'MistyFields',
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium quis sit impedit rerum quam blanditiis culpa fugit dolores ad quibusdam?',
          link: 'https://mistyfields.com',
          img: 'https://picsum.photos/830/420',
          tech: [
            {
              name: 'Wordpress',
              img: '/wp_logo.png',
            },
            {
              name: 'Sass',
              img: '/sass_logo.png',
            },
          ]
        },
        {
          id: 3,
          title: 'WubbelsWeb',
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium quis sit impedit rerum quam blanditiis culpa fugit dolores ad quibusdam?',
          link: 'https://mistyfields.com',
          img: 'https://picsum.photos/830/450',
          tech: [
            {
              name: 'VueJS',
              img: '/vue_logo.png',
            },
            {
              name: 'NuxtJS',
              img: '/nuxt_logo.png',
            },
            {
              name: 'Sass',
              img: '/sass_logo.png',
            },
            {
              name: 'DigitalOcean',
              img: '/do_logo.png',
            },
          ]
        },
      ],
      prototypes: [
        {
          id: 1,
          title: 'PlantWeb',
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium quis sit impedit rerum quam blanditiis culpa fugit dolores ad quibusdam?',
          link: 'https://plantnet.wubbelsweb.com',
          img: 'https://picsum.photos/820/460',
          tech: [
            {
              name: 'VueJS',
              img: '/vue_logo.png',
            },
            {
              name: 'NuxtJS',
              img: '/nuxt_logo.png',
            },
            {
              name: 'Sass',
              img: '/sass_logo.png',
            },
            {
              name: 'Laravel',
              img: '/laravel_logo.png',
            },
            {
              name: 'GraphQL',
              img: '/graphql_logo.png',
            },
            {
              name: 'MongoDB',
              img: '/mongo_logo.png',
            },
          ]
        },
        {
          id: 2,
          title: 'Zaadbommen',
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium quis sit impedit rerum quam blanditiis culpa fugit dolores ad quibusdam?',
          link: 'https://zaadbommen.wubbelsweb.com',
          img: 'https://picsum.photos/810/420',
          tech: [
            {
              name: 'VueJS',
              img: '/vue_logo.png',
            },
            {
              name: 'NuxtJS',
              img: '/nuxt_logo.png',
            },
            {
              name: 'Sass',
              img: '/sass_logo.png',
            },
          ]
        },
        {
          id: 3,
          title: 'RaraRadio',
          description: 'PWA om lokaal radiostation snel aan te kunnen zetten',
          link: 'https://rararadio.wubbelsweb.com',
          img: 'https://picsum.photos/830/410',
          tech: [
            {
              name: 'VueJS',
              img: '/vue_logo.png',
            },
            {
              name: 'NuxtJS',
              img: '/nuxt_logo.png',
            },
          ]
        },
      ],
    }
  }
}
</script>

<style>

</style>