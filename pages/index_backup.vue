<template>
  <Transition>
    <div id="portfolio" v-if="loaded">
      <Header :personalia="personalia" />
      <div v-if="loaded" id="main" class="main">
        <!-- PROJECT LOOKUP -->
        <div class="search-wrapper" id="projects">
            <h1 class="grid-title">
              Portfolio
            </h1>
            <!-- STACK OPTIONS SEARCH -->
            <SearchFilterButtons v-model="stack_search" @update-stack-search="toggleInStackList($event)" :stack_options="stack_options" :stack_search="stack_search" :current_filter="current_filter" />
            <!-- RESULT DISPLAY -->
            <h3 class="counter" v-if="(combinedFilter.length)">
              {{ combinedFilter.length }} Project<ins v-if="(combinedFilter.length > 1)">s</ins>
            </h3>
          </div>

          <div id="project-grid">
            <TransitionGroup name="list">
              <Project v-for="project in combinedFilter" :key="project.name" :project="project" />
            </TransitionGroup>
          </div>
      </div>
    </div>
  </Transition>
</template>

<script>
// const config = useRuntimeConfig();
// console.log('base url is' , config.baseUrl)
// const intersection = this.all_projects.filter(stack => array2.includes(element));
export default {
  head() {
    return {
      title: "Index Header text",
      loaded: false,
    };
  },
  data() {
    return {
      loaded: false,
      search: '',
      stack_search: [],
      current_filter : ['All Projects'],
      stack_options: [
        // { title: 'All Projects', category: '', counter: 0},
        { title: 'VueJS/NuxtJS', category: 'Frontend', counter: 0},
        { title: 'SASS', category: 'Frontend', counter: 0},
        { title: 'TypeScript', category: 'Frontend', counter: 0},
        { title: 'Wordpress', category: 'Backend', counter: 0},
        { title: 'Laravel', category: 'Backend', counter: 0},
        { title: 'WooCommerce', category: 'Backend', counter: 0},
        { title: 'Docker', category: 'Backend', counter: 0},
        // { title: 'Raspberry Pi', category: 'Other', counter: 0},
        { title: 'Processing', category: 'Other', counter: 0},
        { title: 'Arduino', category: 'Other', counter: 0},
      ],
      personalia: {
        name: 'Erik Wubbels',
        description: 'I\'m a web developer based in Eindhoven, The Netherlands. I specialize in interactive design, and am currently open for new projects and opportunities. ',
        email: 'erik.wubbels@gmail.com',
      },
      all_projects: [
        {
          // WEBDEV
          name: 'Misty Fields 2022',
          slug: 'misty-fields-2022',
          link: 'https://mistyfields.com',
          stack: ['Wordpress', 'SASS'],
          img: 'https://loremflickr.com/600/335'
        },
        {
          name: 'Misty Fields 2019',
          slug: 'misty-fields-2019',
          link: 'https://mistyfields.com',
          stack: ['Wordpress', 'SASS'],
          img: 'https://loremflickr.com/600/337'
        },
        {
          name: 'TomsTech',
          slug: 'tomstech',
          link: 'https://tomstech.nl',
          stack: ['Wordpress', 'SASS'],
          img: 'https://loremflickr.com/600/339'
        },
        {
          name: 'Pineapple Productions',
          slug: 'pineapple-productions',
          link: 'https://pp.wubbelsweb.com',
          stack: ['Wordpress', 'SASS'],
          img: 'https://loremflickr.com/600/331'
        },
        {
          name: 'Bootleg Breathing',
          slug: 'bootleg-breathing',
          link: 'https://bb.wubbelsweb.com',
          stack: ['VueJS/NuxtJS', 'Bootstrap', 'SASS'],
          img: '/img/test.jpg'
        },
        {
          name: 'Plant DB',
          slug: 'plant-db',
          link: 'https://plantnet.wubbelsweb.com/species',
          stack: ['VueJS/NuxtJS', 'Bootstrap', 'SASS', 'Laravel', 'GraphQL', 'MongoDB', 'Docker'],
          img: 'https://loremflickr.com/600/334'
        },
        {
          name: 'Bits of Freedom',
          slug: 'bits-of-freedom',
          stack: ['Bootstrap', 'Vanilla JS', 'SASS'],
          img: 'https://loremflickr.com/600/332'
        },
        {
          name: 'DAGDice',
          slug: 'dagdice',
          stack: ['Adobe XD', 'VueJS/NuxtJS', 'GraphQL', 'TypeScript',  'Docker'],
          img: 'https://loremflickr.com/600/333'
        },
        {
          name: 'Erik Wubbels Fotografie',
          slug: 'erik-wubbels-fotografie',
          link: 'https://erikwubbels.nl',
          stack: ['Wordpress', 'SASS', 'WooCommerce', 'Docker'],
          img: 'https://loremflickr.com/600/338'
        },
        // OTHER
        {
          name: 'Holdie',
          slug: 'holdie',
          link: '',
          stack: ['Arduino'],
          img: 'https://loremflickr.com/600/338'
        },
        {
          name: 'Mugen',
          slug: 'mugen',
          link: '',
          stack: ['Arduino'],
          img: 'https://loremflickr.com/600/338'
        },
        {
          name: 'Flowerscape',
          slug: 'flowerscape',
          link: '',
          stack: ['Processing'],
          img: 'https://loremflickr.com/600/338'
        },
      ],
    }
  },
  methods: {
    toggleInStackList(stack) {
      // console.log(stack.toString())
      // unlist "all projects" if other options are selected
      if ( this.stack_search.includes('All Projects') && stack.title !== 'All Projects') {
        this.stack_search = this.stack_search.filter(e => e !== 'All Projects')
      }
      // unlist other options if "all projects" is selected
      if ( stack.title == 'All Projects' && this.stack_search.length > 0 ) {
        this.stack_search = ['All Projects']
        // console.log("HIER", this.stack_search)
        return
      }
      if ( this.stack_search.includes(stack.title) ) {
          this.stack_search = this.stack_search.filter(e => e !== stack.title)
          // console.log('test', this.stack_search)
      } else if ( !this.stack_search.includes(stack.title) ) {
          this.stack_search.push(stack.title)
          // console.log(stack.title)
      }
      return
    },
  },
  computed: {
    combinedFilter() {
      // Return final array of projects matching the filter
      if (this.stack_search.includes('All Projects')) this.current_filter = this.all_projects
      // if (this.search !== '' && this.stack_search === 'All Projects') this.current_filter = this.all_projects.filter(project => project.name.toLowerCase().includes(this.search.toLowerCase()) )
      if (!this.stack_search.includes('All Projects')) {
        this.current_filter = this.all_projects
        for ( let i = 0; i < this.stack_search.length; i++ ) {
          this.current_filter = this.current_filter.filter(
            project => 
              project.stack.includes(this.stack_search[i]) 
          )
        }
      }
      return this.current_filter
    },
    projectsRemaining() {
      let remaining = []

      return remaining
    },
  },
  created() {
    this.loaded = true;
    this.stack_search = ["All Projects"]
  }
}
</script>

<style lang="scss">
// FILTER 
.search-wrapper {
  max-width: 840px;
  margin: 220px auto 0 auto;
  position: relative;
  z-index: 2;
  font-size: 1.2rem;
  border-right: 32px solid $grey;
  @media (max-width: 840px) {
    width: 70%;
    border-right: 12px solid $grey;
  }
  @media (max-width: 480px) {
    width: 90%;
    border-right: none;
    // border-bottom: 2px solid $light-blue;
  }
  h4 {
    margin: 12px auto;
  }
  button {
    display: block;
    padding: 8px;
    font-family: 'Montserrat';
    border: none;
    color: $accent-color;
  }
  .stack-list {
    width: 100%;
    text-align: left;
    margin-top: 24px;
    // LABEL
    .stack-option {
      display: inline-block;
      margin: 12px 12px 24px 0;
      width: auto;
      span {
        padding: 12px;
        background: $grey;
        color: white;
        // border-radius: 12px;
        &:hover {
          cursor: pointer;        
        }
      }
      input[type="radio"] {
        display: none;
      }
      input[type="radio"]:checked ~ *{
        opacity: .5;
        color: #fff;
      }
    }
  }
  // SEARCH TEXT INPUT
  input[type="search"].text-search {
    margin: 24px 4px;
    padding: 12px;
    display: block;
    background: $accent-color;
    color: #fff;
    font-weight: 700;
    border: none;
    outline: 4px solid $accent-color;
    transition: .3s ease;
    &:focus-visible {
      border: none;
      box-shadow: 0 0 25px $accent-color;
      padding: 12px;
      transition: .25s ease;
    }
  }
  ::placeholder {
    color: #fff;
    opacity: 1;
    text-shadow: 0 0 5px #fff;
  }
}

.grid-title {
  color: $grey;
  opacity: 0.8;
  font-size: 3em;
  font-weight: 700;
  font-family: 'Montserrat';
  // padding-bottom: 116px;
}
.tech-title {
  @media (max-width: 840px) {
    max-width: 80%;
    margin: auto;
  }
}
#project-grid {
  max-width: 840px;
  margin: 128px auto;
  z-index: 3;
  position: relative;
  padding: 0;
  text-align: left;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-column-gap: 128px;
  grid-row-gap: 128px;
  grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
  min-height : 100vh;
  justify-items: center;
  @media (max-width: 840px) {
      grid-template-columns: auto;
      margin: 32px;
    }
}
.counter {
  margin-top: 24px;
  color: $grey;
}
</style>