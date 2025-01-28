<script setup lang="ts">
import IconMessage from './images/icons/IconMessage.vue'
defineProps<{
    topic?: string
}>()
</script>

<template>
    <!-- Topic selected -->
    <h5>{{ topic || 'No topic selected' }}</h5>

    <!-- during conversation section -->
    <div class="m-5">
        <div class="flex inline-flex items-center justify-center">
            <IconMessage />
            <h3 class="text-lg font-semibold text-gray-800 ms-3">During Your Conversation</h3>
        </div>
        <div class="text-sm text-gray-600 mt-4">
            <span class="font-bold">Want to try something new?</span>
            <p>Simply pick another topic or change the level on the left-hand side.</p>
            <p>Also, you can start learning a new language or change the style of conversation.</p>
        </div>
    </div>
</template>

<style></style>
