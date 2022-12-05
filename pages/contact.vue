<template lang="">
    <Transition>
        <header class="header">
            <section class="text-box">
                <p>Lorem ipsum dolor sit amet.</p>
                <h1>Feel free to contact me</h1>
                <h1>Feel free to contact me</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam odio quisquam eligendi quo debitis possimus.</p>
                <EmailButton />
            </section>
        </header>
    </Transition>
</template>
<script>
export default {
    
}
</script>
<style scoped lang="scss">
    .contact-block {
        background: $grey;
        color: #fff;
        height: 100%;
        min-height: 80vh;
        .text {
            padding:  120px;
            max-width: 820px;
            margin: 0 auto;
            letter-spacing: 1px;
        }
    }
</style>