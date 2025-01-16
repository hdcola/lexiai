<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <div class="background w-full min-h-screen" :class="route.name">
        <AppNavbar />
        <RouterView />
    </div>
</template>
