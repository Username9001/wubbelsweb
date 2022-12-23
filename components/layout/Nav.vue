<template lang="">
    <nav>
        <div class="right-side">
            <ul>
                <li>
                    <NuxtLink to="/">
                        <h2>Home</h2>
                    </NuxtLink>
                </li>
                <!-- <li>
                    <NuxtLink to="/about">
                        <h2>About</h2>
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
        padding: 32px;
        // padding-bottom: 0;
        @media (max-width: 840px) {
            padding: 48px;
        }
        @media (max-width: 480px) {
            padding: 24px;
        }
        background: $grey;
        display: grid;
        grid-template-columns: auto;
        align-items: center;
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
            font-size: 1.5rem;
            li {
                display: inline-block;
                vertical-align: middle;
                padding: 0 48px;
                @media(max-width: 840px) {
                    padding: 0 24px;
                    // font-size: 1rem;
                    // display: inline;
                }
                @media(max-width: 480px) {
                    padding: 12px;
                    // font-size: .7rem;
                    // display: inline;
                }
                a {
                    transition: .4s;
                    color: $light-blue;
                    opacity: 0.5;
                    &.router-link-exact-active {
                    transition: .4s;
                    color: #fff;
                    opacity: 0.85;
                }
                }
            }
        }
    }
</style>