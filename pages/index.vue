<template>
    <div class="main">
        <h1>Portfolio / CV Erik Wubbels</h1>
        <div class="about">
            <h2>About Erik</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum quos quisquam rem molestias tempore blanditiis nemo dicta dolore, aspernatur cum accusamus sit rerum ut assumenda. Tenetur, nobis quibusdam eligendi magnam excepturi assumenda, culpa ut vero, dolore rem quis facilis. Non!</p>
        </div>
        <h3 class="grid-title">Live websites</h3>
        <ul class="project-grid">
            <Project v-for="project in live_projects" :key="project.title" :project="project" />
        </ul>
        <h3 class="grid-title">Personal Projects</h3>
        <ul class="project-grid">
            <Project v-for="project in personal_projects" :key="project.title" :project="project" />
        </ul>
        <h3 class="grid-title">Past Projects</h3>
        <ul class="project-grid">
            <Project v-for="project in old_projects" :key="project.title" :project="project" />
        </ul>
        <br>
        <h3>Accustomed with the following technologies:</h3>
        <Technologies :technologies="technologies" />
    </div>
    <Footer />
</template>

<script>
export default {
  data() {
    return {
      live_projects: [
        {
          title: 'Misty Fields',
          link: ' https://mistyfields.com',
          stack: ['Wordpress, ', 'SASS'],
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi officia aliquam, nemo accusantium autem nam fugit magni dignissimos! Dignissimos, corrupti!'
        },
        {
          title: 'TomsTech',
          link: ' https://tomstech.nl',
          stack: ['Wordpress, ', 'SASS'],
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi officia aliquam, nemo accusantium autem nam fugit magni dignissimos! Dignissimos, corrupti!'
        },
      ],
      personal_projects: [
        {
          title: 'Bootleg Breathing',
          link: ' https://bb.wubbelsweb.com',
          stack: ['VueJS, ', 'NuxtJS, ', 'Bootstrap, ', 'SASS'],
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi officia aliquam, nemo accusantium autem nam fugit magni dignissimos! Dignissimos, corrupti!'
        },
        {
          title: 'Plant DB',
          link: ' https://plantnet.wubbelsweb.com/species',
          stack: ['VueJS, ', 'NuxtJS, ', 'Bootstrap, ', 'SASS, ', 'Laravel, ', 'GraphQL, ', 'MongoDB'],
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi officia aliquam, nemo accusantium autem nam fugit magni dignissimos! Dignissimos, corrupti!'
        },
      ],
      old_projects: [
        {
          title: 'Bits of Freedom',
          stack: ['Bootstrap, ', 'Vanilla JS, ', 'SASS'],
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi officia aliquam, nemo accusantium autem nam fugit magni dignissimos! Dignissimos, corrupti!'
        },
        {
          title: 'DAGDice',
          stack: ['Adobe XD, ', 'VueJS, ', 'NuxtJS, ', 'GraphQL, ', 'Typescript'],
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi officia aliquam, nemo accusantium autem nam fugit magni dignissimos! Dignissimos, corrupti!'
        },
      ],
      technologies: [
        'Wordpress',
        'VueJS/NuxtJS',
        'SASS',
        'Bootstrap',
        'MongoDB',
        'Ubuntu',
        ''
      ]
    }
  }
}
</script>
