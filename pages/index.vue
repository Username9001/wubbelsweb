<template>
  <Transition>
    <div id="portfolio">
      <Header :personalia="personalia" />
      <div id="main" class="main">
          <h3 class="grid-title">
            Projects
            <hr>
          </h3>
          <!-- PROJECT LOOKUP -->
          <div class="search-wrapper">
            <!-- STACK OPTIONS SEARCH -->
            <div class="stack-list">
              <label v-for="stack in stack_options" class="stack-options">
                <input :value="`${ stack }`" v-model="stack_search" type="radio" name="radio-button" id="">
                {{ stack }}
              </label>
            </div>
            <!-- TEXT SEARCH -->
            <h4>Enter search text</h4>
            <input type="text" v-model="search" placeholder="Search title.."/>
            <h4>Select technology</h4>
          </div>
          <h3 v-if="combinedFilter.length">
            Used in {{ combinedFilter.length }} Project(s)
          </h3>

          <div class="project-grid">
            <TransitionGroup name="list">
              <Project v-for="project in combinedFilter" :key="project.title" :project="project" />
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
      stack_search: [],
      search_method: 'title',
      // compareArray: [],
      stack_options: [
        'All Projects',
        'Wordpress',
        'VueJS/NuxtJS',
        'Laravel',
        'SASS',
        'TypeScript',
        'WooCommerce'
      ],
      personalia: {
        name: 'Erik Wubbels',
        description: 'My name is Erik Wubbels, and I’m a web developer from Eindhoven, The Netherlands. I specialize in interactive design, and am currently open for new projects and opportunities. Feel free to check out my previous endeavors down below, and be sure to reach out if you want to know more about me or my work.',
        email: 'erik.wubbels@gmail.com',
      },
      all_projects: [
        {
          title: 'Erik Wubbels Fotografie',
          link: ' https://erikwubbels.nl',
          stack: ['Wordpress', 'SASS', 'WooCommerce'],
          description: 'Web design and development for festival in the Netherlands, made with Wordpress and SASS.'
        },
        {
          title: 'Misty Fields 2022',
          link: ' https://mistyfields.com',
          stack: ['Wordpress', 'SASS'],
          description: 'Web design and development for festival in the Netherlands, made with Wordpress and SASS.'
        },
        {
          title: 'Misty Fields 2019',
          link: ' https://mistyfields.com',
          stack: ['Wordpress', 'SASS'],
          description: 'Web design and development for festival in the Netherlands, made with Wordpress and SASS.'
        },
        {
          title: 'TomsTech',
          link: ' https://tomstech.nl',
          stack: ['Wordpress', 'SASS'],
          description: 'Web development for a technology journalist. The design was made through co-designing sessions. Made with Wordpress and SASS.'
        },
        {
          title: 'Pineapple Productions',
          link: ' https://pp.wubbelsweb.com',
          stack: ['Wordpress', 'SASS'],
          description: 'Web development for a technology journalist. The design was made through co-designing sessions. Made with Wordpress and SASS.'
        },
        {
          title: 'Bootleg Breathing',
          link: ' https://bb.wubbelsweb.com',
          stack: ['VueJS/NuxtJS', 'Bootstrap', 'SASS'],
          description: 'A free alternative to the Wim Hof Method app for guided breathing. Made in NuxtJS.'
        },
        {
          title: 'Plant DB',
          link: ' https://plantnet.wubbelsweb.com/species',
          stack: ['VueJS/NuxtJS', 'Bootstrap', 'SASS', 'Laravel', 'GraphQL', 'MongoDB'],
          description: 'A planning app for plants in the garden. Early development. Frontend in NuxtJS/VueJS, backend in Laravel and a MongoDB database, interfaced with GraphQL.'
        },
        {
          title: 'Bits of Freedom',
          stack: ['Bootstrap', 'Vanilla JS', 'SASS'],
          description: 'New design and development for a campaign page relating to privacy restrictions.'
        },
        {
          title: 'DAGDice',
          stack: ['Adobe XD', 'VueJS/NuxtJS', 'GraphQL', 'TypeScript'],
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
  },
  // GRID FILTER
  // methods: {
  //   toggleStack(input) {
  //     if (this.stack_search.includes(input)) {
  //       this.stack_search = this.stack_search.filter(e => e !== input)
  //       console.log("input: ", input)
  //       console.log("search array: ", this.stack_search)
  //       return
  //     }
  //     this.stack_search.push(input)
  //     console.log("input: ", input)
  //     console.log("search array: ", this.stack_search)
  //     return
  //   }
  // },
  computed: {
    combinedFilter() {
      // First check whether input is text or button
      
      // Then compare strings to project array

      // Return final array of projects matching the filter
      if (this.search === '' && this.stack_search === 'All Projects') return this.all_projects
      if (this.search !== '' && this.stack_search === 'All Projects') return this.all_projects.filter(project => project.title.toLowerCase().includes(this.search.toLowerCase()) )
      return this.all_projects.filter(
        project => 
          project.stack.includes(this.stack_search) 
          && project.title.toLowerCase().includes(this.search.toLowerCase())
      )
      // // Show all products 
      // if (this.stack_search.includes('All Projects')) {
      //   return this.all_projects
      // } 
      // // All products but search is not empty
      // else if (!this.stack_search.includes('All Projects')) {
      //   var project_array = []
      //   var final_array = []
      //   // loop through stack_search array
      //   for ( let i = 0; i < this.stack_search.length; i++ ) {
      //     // filter projects
      //     var filtered_project = this.all_projects.filter( project =>
      //       project.stack.includes(this.stack_search[i])
      //     )
      //     console.log("filtered projects:", filtered_project)
      //     // compare projects to existing array
      //     if ( !project_array.includes(filtered_project) ) {
      //       project_array.push(filtered_project)
      //     }
      //     console.log("project array right now:", project_array)
      //     // push all projects
      //     for ( let j = 0; j < project_array[0].length; j++ ) {
      //       final_array.push(project_array[0][j])
      //     }
      //   }
      //   // return list
      //   console.log('final array:',final_array)
      //   return final_array
      // }
    },
    // alternate approach
    // using button values
    techFilter(tech) {
      if ( tech ) {
        console.log(tech)
      }
    }
  }
}
</script>
