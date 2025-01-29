<script setup lang="ts">
import GeminiAlertDismissible from './GeminiAlertDismissible.vue'
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

    <div class="flex flex-col h-full w-4/5 m-auto">
        <!-- Topic selected -->
        <div class="flex flex-col flex-1 gap-4">
            <h3 class="inline-flex gap-2 justify-center items-center">
                <IconLanguage class="w-10" />
                <span class="font-bold text-xl text-purple-500">{{ language }}</span>
                <IconPlay class="w-10" />
                <span class="font-bold text-xl text-green-500">{{ topic?.title }}</span>
            </h3>
            <h4 class="inline-flex gap-2 justify-center items-center my-3">
                <IconBook class="w-10" />
                <p class="px-2">{{ topic?.description }}</p>
            </h4>
        </div>

        <div class="flex justify-center min-h-0">
            <ImgLearningLaptop class="fade-in" />
        </div>

        <div class="flex flex-col flex-1 ">
            <GeminiAlertDismissible />            
        </div>
    </div>
</template>
