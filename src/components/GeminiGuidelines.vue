<script setup lang="ts">
import type { ITopic } from './GeminiSelection.vue'
import IconMessage from './images/icons/IconMessage.vue'
import ImgLearningLaptop from './images/ImgLearningLaptop.vue'
defineProps<{
    topic?: ITopic
    language?: string
}>()
</script>

<template>
    <!-- during conversation section -->
    <div class="flex flex-col h-full">
        <!-- Topic selected -->
        <div class="flex flex-col flex-1 gap-4">
            <h3 class="inline-flex gap-3 justify-center items-center">
                Practicing<span class="font-bold text-xl text-purple-500">{{ language }}</span
                >with the topic<span class="font-bold text-xl text-green-500">{{
                    topic?.title
                }}</span>
            </h3>
            <div class="inline-flex items-center justify-center">
                <IconMessage />
                <h5 class="text-lg font-semibold text-gray-800 ms-3">During Your Conversation</h5>
            </div>
            <div class="text-sm text-gray-600 mt-2">
                <span class="font-bold">Want to try something new?</span>
                <p>Simply pick another topic or change the level on the left-hand side.</p>
                <p>
                    Also, you can start learning a new language or change the style of conversation.
                </p>
            </div>
        </div>

        <div class="flex justify-center min-h-0">
            <ImgLearningLaptop class="fade-in" />
        </div>
    </div>
</template>
