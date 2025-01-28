<script setup lang="ts">
import GeminiClient from '@/components/GeminiClient.vue'
import { ref, useTemplateRef } from 'vue'
import type { ResponseModalities } from '@/lib/gemini/config/config-types'
import GeminiSelection, { type ITopic } from '@/components/GeminiSelection.vue'

// State variables
const responseType = ref<ResponseModalities>('audio')
const geminiref = useTemplateRef('gemini')
const selectedTopic = ref<ITopic>()
const selectedLanguage = ref<string>('')

function replaceTemplate(str: string, variables: Record<string, string>) {
    return str.replace(/\{\{(.*?)\}\}/g, (_, key) => variables[key.trim()] || '');
}

async function handleSelection(selection: {
    language: string
    style: string
    topic: ITopic
    level: string
}) {
    const data = {
        language: selection.language,
        style: selection.style,
        level: selection.level,
    }
    selectedTopic.value = selection.topic;
    selectedLanguage.value = selection.language;
    const systemPrompt = replaceTemplate(selection.topic.systemPrompt || '', data)

    const gemini = geminiref.value
    if (gemini) {
        await gemini.updateSystemInstructions(systemPrompt)
        await gemini.updatePrompt(selection.topic.start || '')
    }
}
</script>

<template>
    <div class="flex flex-col md:flex-row gap-6 mx-auto max-w-6xl py-10">
        <div class="bg-gray-50 rounded-lg shadow-lg w-full md:w-2/5 flex min-h-96 h-[calc(100vh-10.5rem)]">
            <GeminiSelection @selection="handleSelection" />
        </div>
        <div class="flex w-full md:w-3/5 rounded-lg shadow-lg bg-gray-100 min-h-96 h-[calc(100vh-10.5rem)]">
            <GeminiClient ref="gemini" :responseModalities="responseType" :topic="selectedTopic" :selectedTopic="selectedTopic"
                :language="selectedLanguage" />
        </div>
    </div>
</template>
