<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import ButtonFavorite from './ButtonFavorite.vue'
import IconPlay from './images/icons/IconPlay.vue'

// types needed to convert string id to ObjectId(id)
type ILanguage = {
    _id: string
    name: string
}

type IStyle = {
    _id: string
    name: string
    description?: string
}

type ITopic = {
    _id: string
    title: string
    description?: string
    level: string
    systemPrompt?: string
    start?: string
    createdAt?: string
    isSelected?: boolean
}

// environmental variables
const apiUrl = import.meta.env.VITE_API_URL
const apiPort = import.meta.env.VITE_API_PORT

const emit = defineEmits(['selection'])

const languages = ref<ILanguage[]>([])
const styles = ref<IStyle[]>([])
const topics = ref<ITopic[]>([])
const levels = ref(['Beginner', 'Advanced'])

// to read from MongoDb for logged user
const selectedLanguage = ref<string>('French')
const selectedStyle = ref<string>('Casual')
const selectedLevel = ref<string>('Beginner')
const selectedTopic = ref<ITopic | null>(null)

async function fetchOptions() {
    try {
        const [languagesResponse, topicsResponse, stylesResponse] = await Promise.all([
            axios.get(`${apiUrl}:${apiPort}/api/languages`),
            axios.get(`${apiUrl}:${apiPort}/api/topics?level=${selectedLevel.value}`),
            axios.get(`${apiUrl}:${apiPort}/api/styles`),
        ])

        languages.value = languagesResponse.data.map(
            (lang: { _id: { $oid: string }; name: string }) => ({
                _id: lang._id.$oid, //extract $oid as _id
                name: lang.name,
            }),
        )

        topics.value = topicsResponse.data.map(
            (topic: { _id: string; title: string; level: string }) => ({
                _id: topic._id,
                title: topic.title,
                level: topic.level,
            }),
        )

        styles.value = stylesResponse.data.map(
            (st: { _id: { $oid: string }; name: string; description: string }) => ({
                _id: st._id.$oid, // extract $oid as _id
                name: st.name,
                description: st.description,
            }),
        )
    } catch (error) {
        console.error('Error fetching options:', error)
    }
}

async function fetchNewTopics() {
    try {
        if (selectedLevel.value) {
            const response = await axios.get(
                `${apiUrl}:${apiPort}/api/topics?level=${selectedLevel.value}`,
            )
            topics.value = response.data.map(
                (topic: { _id: string; title: string; level: string }) => ({
                    _id: topic._id,
                    title: topic.title,
                    level: topic.level,
                }),
            )
        }
    } catch (error) {
        console.error('Error fetching new topics:', error)
    }
}

onMounted(fetchOptions)

function handlePlay(topic: ITopic) {
    // Previously selected topic
    if (selectedTopic.value) {
        selectedTopic.value.isSelected = false
        selectedTopic.value = null
    }

    selectedTopic.value = topic
    topic.isSelected = true

    // Emit to Gemini the full selection
    emit('selection', {
        language: selectedLanguage.value,
        style: selectedStyle.value,
        topic: selectedTopic.value.title,
        level: selectedLevel.value == 'Beginner' ? 'a beginner, tell me what to say' : 'advanced',
    })
}
</script>

<template>
    <div class="flex flex-col flex-1">
        <div class="flex flex-col h-[calc(100%-64px)] py-10 gap-5">
            <label class="text-2xl font-medium text-center">Section</label>
            <div class="px-2">
                <select
                    v-model="selectedLevel"
                    class="w-full p-2 border rounded"
                    @change="fetchNewTopics"
                >
                    <option disabled>Select a section</option>
                    <option v-for="level in levels" :key="level">
                        {{ level }}
                    </option>
                </select>
            </div>

            <label class="text-2xl font-medium text-center">Topic</label>
            <ul class="flex-1 overflow-y-auto px-2">
                <li
                    v-for="topic in topics"
                    :key="topic._id"
                    class="bg-white p-3 px-4 border-2 border-gray-200 rounded-lg mx-auto mb my-2"
                >
                    <div class="flex flex-row gap-4 items-center">
                        <div class="flex-grow">
                            {{ topic.title }}
                        </div>
                        <!--<div><ButtonFavorite :isFavorite="false" @favorite="" /></div>-->
                        <div>
                            <button type="button" class="topic-play" @click="handlePlay(topic)">
                                <div
                                    class="flex justify-center items-center rounded-full bg-orange-100 p-1"
                                    :class="[
                                        topic.isSelected
                                            ? 'bg-green-100 selected'
                                            : 'bg-orange-100',
                                    ]"
                                >
                                    <IconPlay
                                        :class="[
                                            topic.isSelected ? 'text-green-500' : 'text-orange-500',
                                        ]"
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="h-16 flex flex-row justify-center items-center px-2 gap-2">
            <!--<div class="w-1/2 flex gap-2">
                <button class="lexi-btn">Audio</button>
                <button class="lexi-btn">Chat</button>
            </div>-->

            <!-- Language Selection -->
            <select v-model="selectedLanguage" class="w-full p-2 border rounded">
                <option disabled>Select a language</option>
                <option v-for="lang in languages" :key="lang._id" :value="lang.name">
                    {{ lang.name }}
                </option>
            </select>

            <select v-model="selectedStyle" class="w-full p-2 border rounded">
                <option disabled>Select a style</option>
                <option v-for="style in styles" :key="style._id" :value="style.name">
                    {{ style.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<style scoped>
ul {
    scrollbar-color: var(--light-blue) transparent;
}
.topic-play .selected {
    animation: scaleup 0.3s linear;
}
@keyframes scaleup {
    from {
        scale: 1.1;
    }
    to {
        scale: 1;
    }
}
</style>
