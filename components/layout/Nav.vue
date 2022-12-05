<template lang="">
    <nav>
        <div class="left-side">
            <NuxtLink class="nav-logo" to="/">
                <!-- <img src="https://via.placeholder.com/200x200" alt=""> -->
                <h1>E</h1>
            </NuxtLink>
        </div>
        <div class="right-side">
            <ul>
                <li>
                    <NuxtLink to="/">
                        <h2>Home</h2>
                    </NuxtLink>
                </li>
                <!-- <li>
                    <NuxtLink to="#projects">
                        <h2>Projects</h2>
                    </NuxtLink>
                </li> -->
                <li>
                    <NuxtLink to="/contact">
                        <h2>Contact</h2>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
    nav {
        padding: 24px 64px;
        @media (max-width: 1020px) {
            padding: 48px;
        }
        @media (max-width: 840px) {
            padding: 24px;
        }
        background: $grey;
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        .nav-logo {
            display: block;
            font-size: 6rem;
            color: $light-blue;
            width: 120px;
        }
        img {
            max-width: 48px;
            grid-column: 1;
        }
        ul {
            grid-column: 2;
            text-align: right;
            color: #fff;
            list-style-type: none;
            margin: auto;
            li {
                display: inline-block;
                vertical-align: middle;
                padding: 0 24px;
                a.nuxt-link-active {
                    color: $light-blue;
                    background: #fff;
                }
            }
        }
    }
</style>