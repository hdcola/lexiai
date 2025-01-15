<script setup lang="ts">
import { ref } from 'vue'
import IconMD from './images/icons/IconMD.vue'
import { mdiMenu } from '@mdi/js'
import logo from '@/assets/img/logo-horizontal-black.png'
import { useRoute } from 'vue-router'

const isLoggedIn = ref<boolean>(!!localStorage.getItem('accessToken'))
const logout = () => {
    localStorage.removeItem('accessToken')
    window.location.reload()
    console.log('User logged out')
}

const path = mdiMenu
// Debugging to check mdiMenu path
console.log('mdiMenu path:', path)

// State for toggling the menu
const isMenuOpen = ref<boolean>(false)

const route = useRoute()
</script>

<template>
    <nav :class="route.name" class="sticky top-0">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <!-- Logo -->
                <RouterLink to="/" class="flex items-center">
                    <img class="h-9 w-auto" :src="logo" alt="Lexi AI Logo" />
                </RouterLink>

                <!-- Hamburger menu button -->
                <button
                    id="hamburger"
                    @click="isMenuOpen = !isMenuOpen"
                    class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none md:hidden overflow-hidden"
                >
                    <span class="sr-only">Open main menu</span>
                    <IconMD :path="mdiMenu" class="inline-block" width="28px" />
                </button>

                <!-- Desktop Menu -->
                <div class="hidden md:flex space-x-4 items-center">
                    <!--<RouterLink to="/" v-slot="{ href, navigate }">
                        <button :href="href" @click="navigate" class="menu-btn">Home</button>
                    </RouterLink>-->
                    <RouterLink to="/" class="menu-btn" active-class="active">Home</RouterLink>

                    <RouterLink
                        to="/login"
                        v-if="!isLoggedIn"
                        class="menu-btn"
                        active-class="active"
                        >Log In</RouterLink
                    >

                    <span v-else class="flex space-x-4">
                        <button
                            @click="logout"
                            class="text-white hover:bg-blue-700"
                            active-class="bg-blue-600"
                        >
                            Logout
                        </button>
                    </span>
                    <RouterLink
                        to="/register"
                        v-if="!isLoggedIn"
                        class="menu-btn action highlight"
                        active-class="active"
                        >Sign Up</RouterLink
                    >
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div
            v-show="isMenuOpen"
            class="md:hidden bg-blue-500 px-4 space-y-2 pb-4 transition-all text-base"
        >
            <RouterLink
                to="/"
                class="block text-white px-3 py-2 rounded-md hover:bg-blue-700"
                active-class="bg-blue-600"
                >Home</RouterLink
            >

            <span v-if="!isLoggedIn">
                <RouterLink
                    to="/login"
                    class="block text-white px-3 py-2 rounded-md hover:bg-blue-700"
                    active-class="bg-blue-600"
                    >Login</RouterLink
                >
            </span>
            <span v-else>
                <button
                    @click="logout"
                    class="block text-white px-3 py-2 rounded-md hover:bg-blue-700"
                    active-class="bg-blue-600"
                >
                    Logout
                </button>
            </span>
        </div>
    </nav>
</template>

<style scoped>
nav {
    z-index: 20;
}
nav.home {
    @apply bg-blue-100 py-1 md:py-3;
}
nav:not(.home) {
    @apply bg-blue-500;
}
nav.home #hamburger {
    @apply text-blue-500;
}

.menu-btn {
    @apply font-medium rounded-md px-7 py-2 outline outline-2 -outline-offset-1 outline-purple-400 text-purple-400;
    background-color: transparent;
}

.menu-btn:hover,
.menu-btn.active {
    @apply outline-none text-white;
    background: var(--gradient-purple);
}

.menu-btn.action {
    @apply outline-none text-white;
    background: var(--gradient-orange);
}
.menu-btn.action:hover,
.menu-btn.action.active {
    box-shadow: 0 0 50px rgba(255, 166, 0, 0.5);
}
</style>
