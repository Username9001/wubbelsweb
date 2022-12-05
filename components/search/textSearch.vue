<template lang="">
    <input @change="$emit('update-text-search', $event.target.value)" class="text-search" type="search" list="suggestions" placeholder="Search for project.."/>
    <datalist id="suggestions">
        <option v-for="project in combinedFilter">{{ project.name }}</option>
    </datalist>
</template>
<script>
export default {
    props: ['combinedFilter'],
    emits: ['update-text-search']
}
</script>
<style lang="">
    
</style>