<template>
  <Transition>
    <div id="portfolio">
      <Header :personalia="personalia" />
      <div v-if="loaded" id="main" class="main">
        <!-- PROJECT LOOKUP -->
        <div class="search-wrapper" id="projects">
            <h2 class="grid-title">
              Portfolio
            </h2>
            <!-- STACK OPTIONS SEARCH -->
            <SearchFilterButtons v-model="stack_search" @update-stack-search="(stack_search = $event)" :stack_options="stack_options" />
            <!-- TEXT SEARCH -->
            <SearchTextSearch v-model="search" @update-text-search="(search = $event)" :combinedFilter="combinedFilter" />
            <!-- RESULT DISPLAY -->
            <h3 class="counter" v-if="(combinedFilter.length)">
              {{ combinedFilter.length }} Project<ins v-if="(combinedFilter.length > 1)">s</ins>
            </h3>
          </div>

          <div class="project-grid">
            <TransitionGroup name="list">
              <Project v-for="project in combinedFilter" :key="project.name" :project="project" />
            </TransitionGroup>
          </div>
          <Technologies :technologies="technologies" />
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  head() {
    return {
      title: "Index Header text"    
    };
  },
  data() {
    return {
      loaded: false,
      search: '',
      stack_search: 'All Projects',
      current_filter : [],
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
        description: 'I\'m a web developer based in Eindhoven, The Netherlands. I specialize in interactive design, and am currently open for new projects and opportunities. ',
        email: 'erik.wubbels@gmail.com',
      },
      all_projects: [
        {
          name: 'Erik Wubbels Fotografie',
          slug: 'erik-wubbels-fotografie',
          link: ' https://erikwubbels.nl',
          stack: ['Wordpress', 'SASS', 'WooCommerce'],
          img: 'https://loremflickr.com/600/338'
        },
        {
          name: 'Misty Fields 2022',
          slug: 'misty-fields-2022',
          link: ' https://mistyfields.com',
          stack: ['Wordpress', 'SASS'],
          img: 'https://loremflickr.com/600/335'
        },
        {
          name: 'Misty Fields 2019',
          slug: 'misty-fields-2019',
          link: ' https://mistyfields.com',
          stack: ['Wordpress', 'SASS'],
          img: 'https://loremflickr.com/600/337'
        },
        {
          name: 'TomsTech',
          slug: 'tomstech',
          link: ' https://tomstech.nl',
          stack: ['Wordpress', 'SASS'],
          img: 'https://loremflickr.com/600/339'
        },
        {
          name: 'Pineapple Productions',
          slug: 'pineapple-productions',
          link: ' https://pp.wubbelsweb.com',
          stack: ['Wordpress', 'SASS'],
          img: 'https://loremflickr.com/600/331'
        },
        {
          name: 'Bootleg Breathing',
          slug: 'bootleg-breathing',
          link: ' https://bb.wubbelsweb.com',
          stack: ['VueJS/NuxtJS', 'Bootstrap', 'SASS'],
          img: 'https://loremflickr.com/600/338'
        },
        {
          name: 'Plant DB',
          slug: 'plant-db',
          link: ' https://plantnet.wubbelsweb.com/species',
          stack: ['VueJS/NuxtJS', 'Bootstrap', 'SASS', 'Laravel', 'GraphQL', 'MongoDB'],
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
          stack: ['Adobe XD', 'VueJS/NuxtJS', 'GraphQL', 'TypeScript'],
          img: 'https://loremflickr.com/600/333'
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
  methods: {
    clearFilters() {
      this.search = ''
    }
  },
  computed: {
    combinedFilter() {
      // First check whether input is text or button
      
      // Then compare strings to project array

      // Return final array of projects matching the filter
      if (this.search === '' && this.stack_search === 'All Projects') this.current_filter = this.all_projects
      if (this.search !== '' && this.stack_search === 'All Projects') this.current_filter = this.all_projects.filter(project => project.name.toLowerCase().includes(this.search.toLowerCase()) )
      if (this.stack_search !== 'All Projects') {
        this.current_filter = this.all_projects.filter(
          project => 
            project.stack.includes(this.stack_search) 
            && project.name.toLowerCase().includes(this.search.toLowerCase())
        )
      }
      return this.current_filter
    },
  },
  created() {
    this.loaded = true;
  }
}
</script>

<style lang="scss">
// FILTER 
.search-wrapper {
  max-width: 840px;
  margin: auto;
  position: relative;
  z-index: 2;
  font-size: 1.2rem;
  @media (max-width: 840px) {
    width: 80%;
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
      margin: 14px 2px;
      text-align: left;
      width: auto;
      span {
        padding: 12px;
        background: $grey;
        color: white;
        // border-radius: 12px;
      }
      label {
        text-align: left;
      }
      input[type="radio"] {
        display: none;
      }
      input[type="radio"]:checked ~ *{
        background: $accent-color-gradient;
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

.grid-title, .tech-title {
  color: $grey;
  opacity: 0.8;
  font-size: 2.4em;
  font-weight: 700;
  font-family: 'Montserrat';
  padding-bottom: 116px;
}
.tech-title {
  @media (max-width: 840px) {
    max-width: 80%;
    margin: auto;
  }
}
.project-grid {
  max-width: 840px;
  margin: auto;
  z-index: 1;
  position: relative;
  // padding-left: 0;
  text-align: left;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-column-gap: 48px;
  grid-template-rows: auto;
  justify-items: center;
  @media (max-width: 840px) {
      grid-template-columns: auto;
      margin: 32px;
    }
    .project-item {
      display: block;
      position: relative;
      max-width: 100%;
      list-style-type: none;
      text-align: left;
      padding: 24px;
      background: $gradient2;
      color: white;
      // border-radius: 10px;
      height: 420px;
      margin: 48px auto;
      transition: .3s ease;
      @media (max-width: 840px) {
        width: 80%;
      }
      .project-header {
          margin-bottom: 24px;
          h1 {
              color: $light-blue;
              font-weight: 700;
              font-size: 1.4rem;
              text-transform: uppercase;
              height: 100%;
              margin: 0;
              padding-bottom: 24px;
              display: inline-block;
              font-family: 'Montserrat';
          }
      }
      // .img-container {
      img {
        height: auto;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      // }
      .used-tech {
        padding-top: 12px;
      }
      button {
        position: absolute;
        bottom: -20px;
        display: inline-block;
        width: 140px;
        background: linear-gradient(270deg, $accent-color 40%, rgba(55,135,255,0.7));
        color: #000;
        font-weight: 700;
        padding: 12px;
        // border-radius: 5px;
        border: none;
        box-shadow: 6px 6px 12px black;
        // animation
        transition: .5s ease-out;
        a {
            color: #fff;
            text-shadow: 0 0 5px #000;
            text-decoration: none;
        }
        &:hover {
            color: #fff;
            // animation
            transition: .5s ease-out;
            transform: scale(1.05);
            animation: AnimationName 3s infinite;
        }
      }
    }
}
.counter {
  margin-top: 24px;
  color: $grey;
}
</style>