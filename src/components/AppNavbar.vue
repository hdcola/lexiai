<script setup lang="ts">
import { onMounted, ref } from 'vue'
import IconMD from './images/icons/IconMD.vue'
import { mdiMenu } from '@mdi/js'
/*import logo from '@/assets/img/logo-horizontal-black.png'*/
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import IconConfig from './images/icons/IconConfig.vue'

const authStore = useAuthStore()

const path = mdiMenu
// Debugging to check mdiMenu path
//console.log('mdiMenu path:', path)

// State for toggling the menu
const isMenuOpen = ref<boolean>(false)
function handleCloseMenu() {
    isMenuOpen.value = false
}

const route = useRoute()
</script>

<template>
    <nav :class="route.name" class="sticky top-0">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <!-- Logo -->
                <RouterLink to="/" class="flex items-center">
                    <img
                        class="h-9 w-auto"
                        src="@/assets/img/logo-horizontal-black.png"
                        alt="Lexi AI Logo"
                    />
                </RouterLink>

                <!-- Hamburger menu button -->
                <button
                    @click="isMenuOpen = !isMenuOpen"
                    class="inline-flex items-center justify-center p-2 rounded-md text-purple-600 focus:outline-none md:hidden overflow-hidden"
                >
                    <span class="sr-only">Open main menu</span>
                    <IconMD :path="mdiMenu" class="inline-block" width="32px" />
                </button>

                <!-- Desktop Menu -->
                <div class="hidden md:flex space-x-4 items-center">
                    <RouterLink to="/" class="outline-btn" active-class="active">Home</RouterLink>
                    <RouterLink
                        v-if="authStore.isLoggedIn"
                        to="/lexiai"
                        class="btn orange-btn"
                        active-class="active highlight"
                        >Practice</RouterLink
                    >

                    <RouterLink
                        to="/login"
                        v-if="!authStore.isLoggedIn"
                        class="outline-btn"
                        active-class="active"
                        >Log In</RouterLink
                    >

                    <span v-else class="flex space-x-4">
                        <RouterLink to="/settings" class="!px-3 outline-btn" active-class="active"
                            ><IconConfig
                        /></RouterLink>
                        <button @click="authStore.logout()" class="outline-btn">Logout</button>
                    </span>
                    <RouterLink
                        to="/register"
                        v-if="!authStore.isLoggedIn"
                        class="btn orange-btn"
                        active-class="active highlight"
                        >Sign Up</RouterLink
                    >
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div
            id="mobile"
            v-show="isMenuOpen"
            class="md:hidden bg-blue-200 px-4 space-y-2 py-2 transition-all text-base text-center"
        >
            <RouterLink to="/" @click="handleCloseMenu" active-class="purple-btn text-white"
                >Home</RouterLink
            >
            <RouterLink
                v-if="!authStore.isLoggedIn"
                @click="handleCloseMenu"
                to="/login"
                active-class="purple-btn text-white"
                >Login</RouterLink
            >
            <RouterLink
                v-if="authStore.isLoggedIn"
                @click="handleCloseMenu"
                to="/lexiai"
                class="special"
                active-class="orange-btn text-white"
                >Practice</RouterLink
            >
            <RouterLink
                v-if="authStore.isLoggedIn"
                @click="handleCloseMenu"
                to="/settings"
                active-class="purple-btn text-white"
                >Settings</RouterLink
            >
            <button
                v-if="authStore.isLoggedIn"
                @click="(authStore.logout(), handleCloseMenu())"
                class="w-full"
                active-class="purple-btn text-white"
            >
                Logout
            </button>
            <RouterLink
                v-if="!authStore.isLoggedIn"
                to="/register"
                @click="handleCloseMenu"
                class="special"
                active-class="orange-btn text-white"
                >Sign Up</RouterLink
            >
        </div>
    </nav>
</template>

<style scoped>
nav {
    @apply bg-blue-100 py-1 md:py-3;
    z-index: 20;
}

#mobile > * {
    @apply block px-3 py-2 rounded-md font-medium;
}

#mobile > *:not(.orange-btn):hover {
    background: var(--gradient-purple);
    color: white;
}
#mobile > .special:hover {
    background: var(--gradient-orange);
    color: white;
}

.orange-btn.active {
    box-shadow: 0 0 50px rgba(255, 166, 0, 0.5);
}
</style>
