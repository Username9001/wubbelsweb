<template>
    <header class="header">
        <video autoplay muted loop id="myVideo">
            <source src="~/assets/video/neon.mp4" type="video/mp4">
        </video>
        <h1>Portfolio / CV</h1>
        <h3>{{ personalia.name }}</h3>
        <div class="about">
            <h2>About Erik</h2>
            <p>{{ personalia.description }}</p>
        </div>
        <a href="#main" class="first-link">
            <button>
            <div>
                To Portfolio
                &darr;
            </div>
            </button>
        </a>
    </header>
</template>
<script>
export default {
    props: ['personalia']
}
</script>
<style lang="">
    
</style>