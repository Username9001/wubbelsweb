<template lang="">
    <div class="stack-list">
        <div class="row">
            <label class="stack-option">
            <input checked ref="rolesSelected" type="checkbox" value="All Projects" @change="$emit('update-stack-search', {title: 'All Projects'})"  id="all-projects">
            <span>
                All Projects
            </span>
        </label>
        <!-- {{ current_filter }} -->
        </div>
        <br>
        <div class="row">
            <h2>
                Frontend
            </h2>
            <label @change="$emit('update-stack-search', stack)" v-for="stack in stack_options.filter(stack => stack.category == 'Frontend')" class="stack-option">
                <input :value="`${ stack }`" type="checkbox"  id="" class="stack-option-input">
                <span>
                    {{ stack.title }} ({{ stack.counter }})
                </span>
            </label>
        </div>
        <div class="row">
            <h2>
                Backend
            </h2>
            <label @change="$emit('update-stack-search', stack)" v-for="stack in stack_options.filter(stack => stack.category == 'Backend')" class="stack-option">
                <input :value="`${ stack }`" type="checkbox"  id="" class="stack-option-input">
                <span>
                    {{ stack.title }} ({{ stack.counter }})
                </span>
            </label>
        </div>
        <div class="row">
            <h2>
                Other
            </h2>
            <label @change="$emit('update-stack-search', stack)" v-for="stack in stack_options.filter(stack => stack.category == 'Other')" class="stack-option">
                <input :value="`${ stack }`" type="checkbox"  id="" class="stack-option-input">
                <span>
                    {{ stack.title }} ({{ stack.counter }})
                </span>
            </label>
        </div>
        <div class="row">
            <h3>
                TESTING
            </h3>
            <button @click="checkAllStacks()" class="test-button">
                Update Counters
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['stack_options', 'stack_search', 'current_filter'],
    emits: ['update-stack-search'],
    watch: {
        stack_search(newSearch) {
            if ( !newSearch.includes('All Projects')  ) {
                document.getElementById('all-projects').checked = false
            }
            if ( newSearch.includes('All Projects') ) {
                let checkboxes = document.querySelectorAll("input[type='checkbox']");
                for (var i = 0; i < checkboxes.length; i++) {
                    checkboxes[i].checked = false;
                }
                document.getElementById('all-projects').checked = true
            }
        }
    },
    methods: {
        projectsRemaining(stack) {
            // console.log("projects in current filter:", this.current_filter)
            // console.log("projects left in stack", stack)
            let counter = 0
            stack.counter = 0

            for ( var i = 0; i < this.current_filter.length; i++) {
                // console.log("Stack", [i], this.current_filter[i].stack)
                if (this.current_filter[i].stack.includes(stack.title)) {
                    // console.log("Another one: ", this.current_filter[i].name)
                    counter += 1
                    // set counter value in stack_options
                    stack.counter = counter
                } else {
                    // counter = 0
                    // stack.counter = 0
                }
            }
            // console.log("Count:", stack.title, '=', stack.counter)
            // console.log("Current filter:", this.current_filter)

            // return stack.counter
        },
        checkAllStacks() {
            for ( var j = 0; j < this.stack_options.length; j++ ) {
                // console.log("option:", this.stack_options[j])
                this.projectsRemaining(this.stack_options[j])
                // check result

                // let compareArray = ['Wordpress']
                // console.log("STACK SEARCH",this.current_filter)
                // console.log("Projects Remaining: ", this.projectsRemaining(compareArray))
            }
        },
    },
    mounted() {
        this.checkAllStacks();
        this.loaded = true;
    }
}
</script>
<style lang="scss">
    .stack-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        h4 {
            margin-bottom: 0;
        }
        .stack-option {
            input {
                display: none;
            }
            input:not(:checked) ~ span {
                opacity: 0.75;
            }
            input:checked ~ span {
            // background-color: $accent-color;
            opacity:  1;
            }
        }
        .test-button {
            padding: 12px;
            margin: 10px 0 0 0;
            width: fit-content;
            font-family: 'Karrik';
            font-size: 1.2rem;
            font-weight: 700;
            color: $grey;
        }
    }
</style>