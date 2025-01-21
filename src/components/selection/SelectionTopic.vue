<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import IconPlay from '../images/icons/IconPlay.vue'
import type { ITopic } from '../GeminiSelection.vue'

const emit = defineEmits(['selection'])

// environmental variables
const apiUrl = import.meta.env.VITE_API_URL
const apiPort = import.meta.env.VITE_API_PORT

const topics = ref<ITopic[]>([])
const levels = ref(['Beginner', 'Advanced'])

// to read from MongoDb for logged user
const selectedLevel = ref<string>('Beginner')
const selectedTopic = ref<ITopic | null>(null)

async function fetchOptions() {
    try {
        const topicsResponse = await axios.get(
            `${apiUrl}:${apiPort}/api/topics?level=${selectedLevel.value}`,
        )

        topics.value = topicsResponse.data.map(
            (topic: { _id: string; title: string; level: string }) => ({
                _id: topic._id,
                title: topic.title,
                level: topic.level,
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
        topic: selectedTopic.value.title,
        level: selectedLevel.value == 'Beginner' ? 'a beginner, tell me what to say' : 'advanced',
    })
}

onMounted(() => {
    fetchOptions()
})
</script>

<template>
    <div class="py-3 px-4">
        <select v-model="selectedLevel" class="w-full p-2 border rounded" @change="fetchNewTopics">
            <option disabled>Select a section</option>
            <option v-for="level in levels" :key="level">
                {{ level }}
            </option>
        </select>
        <hr class="my-3 border-blue-200" />
    </div>
    <ul class="flex-1 overflow-y-auto px-4">
        <li
            v-for="topic in topics"
            :key="topic._id"
            class="bg-white p-3 px-4 border-2 border-gray-200 rounded-lg mx-auto my-2"
        >
            <div class="flex flex-row gap-4 items-center">
                <div class="flex-grow">
                    {{ topic.title }}
                </div>
                <!--<div><ButtonFavorite :isFavorite="false" @favorite="" /></div>-->
                <div>
                    <button type="button" class="topic-play" @click="handlePlay(topic)">
                        <div
                            class="flex justify-center items-center rounded-full p-1"
                            :class="[topic.isSelected ? 'bg-green-100 selected' : 'bg-orange-100']"
                        >
                            <IconPlay
                                :class="[topic.isSelected ? 'text-green-500' : 'text-orange-500']"
                            />
                        </div>
                    </button>
                </div>
            </div>
        </li>
    </ul>
</template>

<style scoped>
ul {
    scrollbar-color: #c3ddfd transparent;
}
</style>
