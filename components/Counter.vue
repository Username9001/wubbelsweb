
<template>
    <div class="container">
        <p>Current stack: {{ stack_search }}</p>
        <button @click="addToStackList('test')">ADD HERE</button>
        <button @click="removeFromStackList('test')">REMOVE HERE</button>
        <button @click="toggleInStackList('test')">TOGGLE HERE</button>
        <!-- <button @click="useStackList.push('New Value')">CLICK HERE</button> -->
    </div>
</template>

<script setup>
import { useStackList } from '~~/composables/states';
const stackList = useStackList() // Same as useState('color')
</script>

<script>
export default {
    data() {
        return {
            stack_search: []
        }
    },
    methods: {
        addToStackList(newStack) {
            // if not in array
            if ( !this.stack_search.includes(newStack) ) {
                this.stack_search.push(newStack)
                console.log(newStack)
                return
            }
            console.log('already in stack')
            return
        },
        removeFromStackList(newStack) {
            // if not in array
            if ( this.stack_search.includes(newStack) ) {
                this.stack_search.pop(newStack)
                console.log(newStack)
                return
            }
            console.log('nothing to remove')
            return
        },
        toggleInStackList(stack) {
            if ( this.stack_search.includes('All Projects') && stack.title !== 'All Projects') {
                this.stack_search.splice(indexOf('All Projects'))
            }

            if ( this.stack_search.includes(stack) ) {
                this.stack_search.splice(indexOf(stack))
                console.log("removing", stack)
            } else if ( !this.stack_search.includes(stack) ) {
                this.stack_search.push(stack)
                console.log("adding", stack)
            }
            return
        }
    }
}
</script>

<style lang="scss">
    .container {
        max-width: 840px;
        margin: 120px auto;
    }
</style>