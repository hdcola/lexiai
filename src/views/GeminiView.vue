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
    return str.replace(/\{\{(.*?)\}\}/g, (_, key) => variables[key.trim()] || '')
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
    selectedTopic.value = selection.topic
    selectedLanguage.value = selection.language

    const gemini = geminiref.value
    if (gemini) {
        let systemPrompt = replaceTemplate(selection.topic.system_prompt || '', data)

        // KISS approach, where the user provides only the topic with no tags
        if (systemPrompt === selection.topic.system_prompt) {
            systemPrompt = `In ${selection.language}, with topic of ${systemPrompt}. Do not change the topic. ${selection.style}`

            if (selection.topic.start !== '') {
                systemPrompt += `Integrate at the start of the topic ${selection.topic.start}.`
            }

            await gemini.resetClient() // Reset the context fully between topics
            await gemini.updatePrompt(systemPrompt)
        }
        // More complex approach, which allow the ussage of tags {{ language }}, {{ style }} to gives full control. It overrites the teacher mode.
        else {
            await gemini.updateSystemInstructions(systemPrompt)
            await gemini.updatePrompt(selection.topic.start || '')
        }
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
                :selectedTopic="selectedTopic"
                :language="selectedLanguage"
            />
        </div>
    </div>
</template>
