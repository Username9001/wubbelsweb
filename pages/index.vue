<template>
  <Transition>
    <div id="portfolio">
      <Header :personalia="personalia" />
      <div id="main" class="main">
          <h3 class="grid-title">
            Projects
          </h3>
          <!-- PROJECT LOOKUP -->
          <div class="search-wrapper">
            <!-- STACK OPTIONS SEARCH -->
            <!-- <h4>Select technology</h4> -->
            <div class="stack-list">
              <label class="stack-option">
                <input type="radio" value="All Projects" v-model="stack_search" name="radio-button" id="">
                <span>
                  All Projects
                </span>
              </label>
              <!-- <br> -->
              <label v-for="stack in stack_options" class="stack-option">
                <input :value="`${ stack }`" v-model="stack_search" type="radio" name="radio-button" id="">
                <span>
                  {{ stack }}
                </span>
              </label>
            </div>
            <!-- TEXT SEARCH -->
            <!-- <h4>Search for project</h4> -->
            <input class="text-search" type="search" v-model="search" placeholder="Search for project.."/>
          </div>
          <h3 class="counter" v-if="(combinedFilter.length)">
            {{ combinedFilter.length }} Project<ins v-if="(combinedFilter.length > 1)">s</ins>
          </h3>

          <div class="project-grid">
            <TransitionGroup name="list">
              <Project v-for="project in combinedFilter" :key="project.slug" :project="project" />
            </TransitionGroup>
          </div>
          <h3 class="grid-title">
            Accustomed with the following technologies
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
      search: '',
      stack_search: 'All Projects',
      search_method: 'title',
      // compareArray: [],
      stack_options: [
        'Wordpress',
        'VueJS/NuxtJS',
        'Laravel',
        'SASS',
        'TypeScript',
        'Docker',
        'WooCommerce',
        'Raspberry Pi',
        'Arduino',
        'Processing'
      ],
      personalia: {
        name: 'Erik Wubbels',
        description: 'My name is Erik Wubbels, and I’m a web developer from Eindhoven, The Netherlands. I specialize in interactive design, and am currently open for new projects and opportunities. Feel free to check out my previous endeavors down below, and be sure to reach out if you want to know more about me or my work.',
        email: 'erik.wubbels@gmail.com',
      },
      all_projects: [
        {
          slug: 'erik-wubbels-fotografie',
          link: ' https://erikwubbels.nl',
          stack: ['Wordpress', 'SASS', 'WooCommerce'],
        },
        {
          slug: 'misty-fields-2022',
          link: ' https://mistyfields.com',
          stack: ['Wordpress', 'SASS'],
        },
        {
          slug: 'misty-fields-2019',
          link: ' https://mistyfields.com',
          stack: ['Wordpress', 'SASS'],
        },
        {
          slug: 'tomstech',
          link: ' https://tomstech.nl',
          stack: ['Wordpress', 'SASS'],
        },
        {
          slug: 'pineapple-productions',
          link: ' https://pp.wubbelsweb.com',
          stack: ['Wordpress', 'SASS'],
        },
        {
          slug: 'bootleg-breathing',
          link: ' https://bb.wubbelsweb.com',
          stack: ['VueJS/NuxtJS', 'Bootstrap', 'SASS'],
        },
        {
          slug: 'plant-db',
          link: ' https://plantnet.wubbelsweb.com/species',
          stack: ['VueJS/NuxtJS', 'Bootstrap', 'SASS', 'Laravel', 'GraphQL', 'MongoDB'],
        },
        {
          slug: 'bits-of-freedom',
          stack: ['Bootstrap', 'Vanilla JS', 'SASS'],
        },
        {
          slug: 'dagdice',
          stack: ['Adobe XD', 'VueJS/NuxtJS', 'GraphQL', 'TypeScript'],
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
  },

  computed: {
    combinedFilter() {
      // First check whether input is text or button
      
      // Then compare strings to project array

      // Return final array of projects matching the filter
      if (this.search === '' && this.stack_search === 'All Projects') return this.all_projects
      if (this.search !== '' && this.stack_search === 'All Projects') return this.all_projects.filter(project => project.slug.toLowerCase().includes(this.search.toLowerCase()) )
      return this.all_projects.filter(
        project => 
          project.stack.includes(this.stack_search) 
          && project.slug.toLowerCase().includes(this.search.toLowerCase())
      )
    },
  }
}
</script>
