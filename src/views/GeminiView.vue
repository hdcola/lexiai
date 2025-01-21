<script setup lang="ts">
import GeminiClient from '@/components/GeminiClient.vue'
import { ref, useTemplateRef } from 'vue'
import type { ResponseModalities } from '@/lib/gemini/config/config-types'
import GeminiSelection from '@/components/GeminiSelection.vue'

// State variables
const responseType = ref<ResponseModalities>('audio')
const geminiref = useTemplateRef('gemini')
const selectedTopic = ref<string>('')
const selectedLanguage = ref<string>('')

function handleSelection(selection: {
    language: string
    style: string
    topic: string
    level: string
}) {
    const gemini = geminiref.value
    if (gemini) {
        gemini.updatePrompt(
            `Help me practice ${selection.topic} in ${selection.language} in a ${selection.style} style. I am ${selection.level}. Do not change the topic, the style or language.`,
        )
    }
}
</script>

<template>
    <div class="flex flex-col md:flex-row gap-6 mx-auto max-w-6xl py-10">
        <div
            class="bg-gray-50 rounded-lg shadow-lg w-full md:w-2/5 flex min-h-96 h-[calc(100vh-10.5rem)]"
        >
            <GeminiSelection @selection="handleSelection" />
        </div>
        <div
            class="flex w-full md:w-3/5 rounded-lg shadow-lg bg-gray-100 min-h-96 h-[calc(100vh-10.5rem)]"
        >
            <GeminiClient
                ref="gemini"
                :responseModalities="responseType"
                :topic="selectedTopic"
                :language="selectedLanguage"
            />
        </div>
    </div>
</template>
