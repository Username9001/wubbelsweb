<template>
  <Transition>
    <div id="portfolio">
      <div class="header">
        <h1>Portfolio / CV</h1>
        <h3>{{ personalia.name }}</h3>
        <div class="about">
            <h2>About Erik</h2>
            <p>{{ personalia.description }}</p>
        </div>
        <a href="#main" class="first-link">
          <button>
            <div>
              To Portfolio
              &darr;
            </div>
          </button>
        </a>
      </div>
      <div id="header-wave">
        <svg viewBox="0 0 2200 120" width="2200" height="120" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 68L21.5 69.2C43 70.3 86 72.7 129.2 74.2C172.3 75.7 215.7 76.3 258.8 73.5C302 70.7 345 64.3 388.2 62.8C431.3 61.3 474.7 64.7 517.8 61.2C561 57.7 604 47.3 647 48.2C690 49 733 61 776.2 65.2C819.3 69.3 862.7 65.7 905.8 63.7C949 61.7 992 61.3 1035.2 62.3C1078.3 63.3 1121.7 65.7 1164.8 67.7C1208 69.7 1251 71.3 1294.2 72.8C1337.3 74.3 1380.7 75.7 1423.8 77.5C1467 79.3 1510 81.7 1553 74.3C1596 67 1639 50 1682.2 46.2C1725.3 42.3 1768.7 51.7 1811.8 56C1855 60.3 1898 59.7 1941.2 56.5C1984.3 53.3 2027.7 47.7 2070.8 51.2C2114 54.7 2157 67.3 2178.5 73.7L2200 80L2200 0L2178.5 0C2157 0 2114 0 2070.8 0C2027.7 0 1984.3 0 1941.2 0C1898 0 1855 0 1811.8 0C1768.7 0 1725.3 0 1682.2 0C1639 0 1596 0 1553 0C1510 0 1467 0 1423.8 0C1380.7 0 1337.3 0 1294.2 0C1251 0 1208 0 1164.8 0C1121.7 0 1078.3 0 1035.2 0C992 0 949 0 905.8 0C862.7 0 819.3 0 776.2 0C733 0 690 0 647 0C604 0 561 0 517.8 0C474.7 0 431.3 0 388.2 0C345 0 302 0 258.8 0C215.7 0 172.3 0 129.2 0C86 0 43 0 21.5 0L0 0Z" stroke-linecap="round" stroke-linejoin="miter"></path></svg>
      </div>
      <div id="main" class="main">
          <h3 class="grid-title">
            Live websites
            <hr>
          </h3>
          <ul class="project-grid">
              <Project v-for="project in live_projects" :key="project.title" :project="project" />
          </ul>
          <h3 class="grid-title">
            Personal Projects
            <hr>
          </h3>
          <ul class="project-grid">
              <Project v-for="project in personal_projects" :key="project.title" :project="project" />
          </ul>
          <h3 class="grid-title">
            Past Projects
            <small>(no longer available)</small>
            <hr>
          </h3>
          <ul class="project-grid">
              <Project v-for="project in old_projects" :key="project.title" :project="project" />
          </ul>
          <br>
          <h3 class="grid-title">
            Accustomed with the following technologies:
            <hr>
          </h3>
          <Technologies :technologies="technologies" />
      </div>
      <Footer />
    </div>
  </Transition>
</template>

<script>
export default {
  data() {
    return {
      personalia: {
        name: 'Erik Wubbels',
        description: 'Hello and welcome to my portfolio website/CV. Here you can find several of my highlighted projects that I worked on the past few years. If you are intrigued and would like to know more, feel free to contact me.',
        email: 'erik.wubbels@gmail.com',
      },
      live_projects: [
        {
          title: 'Misty Fields',
          link: ' https://mistyfields.com',
          stack: ['Wordpress, ', 'SASS'],
          description: 'Web design and development for festival in the Netherlands, made with Wordpress and SASS.'
        },
        {
          title: 'TomsTech',
          link: ' https://tomstech.nl',
          stack: ['Wordpress, ', 'SASS'],
          description: 'Web development for a technology journalist. The design was made through co-designing sessions. Made with Wordpress and SASS.'
        },
      ],
      personal_projects: [
        {
          title: 'Bootleg Breathing',
          link: ' https://bb.wubbelsweb.com',
          stack: ['VueJS, ', 'NuxtJS, ', 'Bootstrap, ', 'SASS'],
          description: 'A free alternative to the Wim Hof Method app for guided breathing. Made in NuxtJS.'
        },
        {
          title: 'Plant DB',
          link: ' https://plantnet.wubbelsweb.com/species',
          stack: ['VueJS, ', 'NuxtJS, ', 'Bootstrap, ', 'SASS, ', 'Laravel, ', 'GraphQL, ', 'MongoDB'],
          description: 'A planning app for plants in the garden. Early development. Frontend in NuxtJS/VueJS, backend in Laravel and a MongoDB database, interfaced with GraphQL.'
        },
      ],
      old_projects: [
        {
          title: 'Bits of Freedom',
          stack: ['Bootstrap, ', 'Vanilla JS, ', 'SASS'],
          description: 'New design and development for a campaign page relating to privacy restrictions.'
        },
        {
          title: 'DAGDice',
          stack: ['Adobe XD, ', 'VueJS, ', 'NuxtJS, ', 'GraphQL, ', 'Typescript'],
          description: 'A betting side for cryptocurrencies. I made the frontend in NuxtJS, with GraphQL. As this was a fairly large project, also integrated Typescript.'
        },
      ],
      technologies: {
        front_end: {
          title: 'Front-end',
          list: [
            'HTML/CSS/JS',
            'Bootstrap',
            'VueJS/NuxtJS',
            'SASS',
            'Typescript',
          ],  
        },
        back_end: {
          title: 'Back-end',
          list: [
            'Wordpress',
            'PHP',
            'Laravel',
            'MySQL',
            'MongoDB',
            'GraphQL',
            'Docker',
          ],
        },
        other: {
          title: 'Other',
          list: [
            'Ubuntu/Linux',
            'DigitalOcean',
            'Arduino',
            'Raspberry Pi',
            'Git',
            'Terminal/CLI',
          ],
        }
      },
    }
  }
}
</script>
