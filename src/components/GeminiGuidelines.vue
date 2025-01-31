<script setup lang="ts">
import GeminiAlertDismissible from './GeminiAlertDismissible.vue'
import { ref, watch } from 'vue'
import type { ITopic } from './GeminiSelection.vue'
import IconBook from './images/icons/IconBook.vue'
import IconLanguage from './images/icons/IconLanguage.vue'
import IconPlay from './images/icons/IconPlay.vue'
import ImgLearningLaptop from './images/ImgLearningLaptop.vue'
import type { Animation } from './images/ImgLearningLaptop.vue'
const props = defineProps<{
    topic?: ITopic
    language?: string
    startNewPrompt?: boolean
    isResponding?: boolean
    isInterrupted?: boolean
}>()

const anim = ref<Animation>('normal')
watch(
    () => props.startNewPrompt,
    () => {
        if (props.isInterrupted) {
            return
        }
        anim.value = props.startNewPrompt ? 'joy' : 'normal'
    },
)
watch(
    () => props.isResponding,
    () => {
        if (props.startNewPrompt || props.isInterrupted) {
            return
        }
        console.log('Talk anim', props.isResponding)
        anim.value = props.isResponding ? 'talk' : 'normal'
    },
)
watch(
    () => props.isInterrupted,
    () => {
        console.log('Interrupt anim', props.isInterrupted)
        anim.value = props.isInterrupted ? 'squint' : 'normal'
    },
)
</script>

<template>
    <!-- User greeting-->

    <div class="flex flex-col h-full w-4/5 m-auto">
        <!-- Topic selected -->
        <div class="flex flex-col flex-1 gap-4">
            <div class="inline-flex gap-2 justify-center items-center">
                <IconLanguage class="w-10" />
                <span class="font-bold text-xl text-purple-500">{{ language }}</span>
                <IconPlay class="w-10" />
                <span class="font-bold text-xl text-green-500">{{ topic?.title }}</span>
            </div>
            <div class="inline-flex gap-3 justify-center my-3">
                <IconBook class="!w-11 !h-6" />
                <p class="text-left text-sm">{{ topic?.description }}</p>
            </div>
        </div>

        <div class="flex justify-center min-h-0">
            <ImgLearningLaptop class="fade-in" :animation="anim" />
        </div>

        <div class="flex flex-col flex-1">
            <GeminiAlertDismissible />
        </div>
    </div>
</template>
