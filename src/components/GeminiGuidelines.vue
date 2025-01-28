<script setup lang="ts">
import type { ITopic } from './GeminiSelection.vue'
import IconMessage from './images/icons/IconMessage.vue'
import ImgConvoAudio from '@/components/images/ImgConvoAudio.vue'
defineProps<{
    topic?: ITopic
    language?: string
}>()
</script>

<template>
    <!-- Topic selected -->
    <h3 class="m-5">
        Practicing <span class="font-bold text-xl text-purple-500">{{ language }}</span> with the
        topic: <span class="font-bold ms-2 text-xl text-green-500">{{ topic?.title }}</span>
    </h3>

    <!-- during conversation section -->
    <div class="m-5">
        <div class="flex inline-flex items-center justify-center">
            <IconMessage />
            <h5 class="text-lg font-semibold text-gray-800 ms-3">During Your Conversation</h5>
        </div>
        <div class="text-sm text-gray-600 mt-2">
            <span class="font-bold">Want to try something new?</span>
            <p>Simply pick another topic or change the level on the left-hand side.</p>
            <p>Also, you can start learning a new language or change the style of conversation.</p>
        </div>
        <div class="">
            <ImgConvoAudio class="w-full md:w-3/4 lg:w-3/5 fade-in" />
        </div>
    </div>
</template>
