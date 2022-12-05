<template lang="">
    <div class="stack-list">
        <label class="stack-option">
        <input checked type="radio" value="All Projects" @change="$emit('update-stack-search', 'All Projects')" name="radio-button" id="">
        <span>
            All Projects
        </span>
        </label>
        <label @change="$emit('update-stack-search', stack)" v-for="stack in stack_options" class="stack-option">
        <input :value="`${ stack }`" type="radio" name="radio-button" id="">
        <span>
            {{ stack }}
        </span>
        </label>
    </div>
</template>
<script>
export default {
    props: ['stack_options'],
    emits: ['update-stack-search']
}
</script>
<style lang="">
    
</style>