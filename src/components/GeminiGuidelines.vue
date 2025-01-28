<script setup lang="ts">
import type { ITopic } from './GeminiSelection.vue'
import IconBook from './images/icons/IconBook.vue'
import IconLanguage from './images/icons/IconLanguage.vue'
import IconMessage from './images/icons/IconMessage.vue'
import IconPlay from './images/icons/IconPlay.vue'
import ImgLearningLaptop from './images/ImgLearningLaptop.vue'
defineProps<{
    topic?: ITopic
    language?: string
}>()
</script>

<template>
    <!-- User greeting-->

    <div class="flex flex-col h-full">
        <!-- Topic selected -->
        <div class="flex flex-col flex-1 gap-4">
            <h3 class="inline-flex gap-3 justify-center items-center">
                <IconLanguage />
                <span class="font-bold text-xl text-purple-500">{{ language }}</span>
                <IconPlay />
                <span class="font-bold text-xl text-green-500">{{ topic?.title }}</span>
            </h3>
            <h4 class="inline-flex gap-3 justify-center items-center my-3">
                <IconBook />
                <p>{{ topic?.description }}</p>
            </h4>
        </div>

        <div class="flex justify-center min-h-0">
            <ImgLearningLaptop class="fade-in" />
        </div>

        <div class="flex flex-col flex-1 gap-2">
            <!-- during conversation section -->
            <div class="inline-flex items-center justify-center mt-5 text-gray-600">
                <IconMessage />
                <!-- <h6 class="text-lg font-semibold ms-3">During Your Conversation</h6> -->
                <span class="font-bold ms-3">Want to try something new?</span>
            </div>
            <div class="text-sm">
                <p>Simply pick another topic or change the level on the left-hand side.</p>
                <p>
                    Also, you can start learning a new language or change the style of conversation.
                </p>
            </div>
        </div>
    </div>
</template>
