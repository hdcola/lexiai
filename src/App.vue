<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
    <RouterView v-slot="{ Component, route }">
        <div class="background w-full min-h-screen" :class="route.name">
            <AppNavbar />
            <Transition name="fade" mode="out-in">
                <div :key="route.name">
                    <component :is="Component" />
                </div>
            </Transition>
        </div>
    </RouterView>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

/* Hide the patterned background until we are done smooth transition */
.background.home:has(.fade-enter-active),
.background.home:has(.fade-leave-active) {
    background: theme(colors.blue.100);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
