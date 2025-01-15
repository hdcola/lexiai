<script setup lang="ts">
import GeminiClient from '@/components/GeminiClient.vue'
import { onMounted, ref, useTemplateRef } from 'vue'
import IconMD from '@/components/images/icons/IconMD.vue'
import { mdiCog } from '@mdi/js'
import axios from 'axios'

import type { ResponseModalities } from '@/lib/gemini/config/config-types'
const responseType = ref<ResponseModalities>('audio')
const topics0 = ref([
    {
        name: 'Small Talk',
        details: ['Greetings', 'Basic Phrases', 'Introductions'],
    },
    {
        name: 'Travel',
        details: ['Directions', 'Booking Tickets', 'Hotel Conversations'],
    },
    {
        name: 'Grammar',
        details: ['Verb Conjugations', 'Sentence Structure', 'Tenses'],
    },
])

// State variables
const open = ref(false) // modal dialog with setup for languges/topics and AI styles
const geminiref = useTemplateRef('gemini')

// environmental variables
const apiUrl = import.meta.env.VITE_API_URL
const apiPort = import.meta.env.VITE_API_PORT

// user defined preferences - they will be fetched from user setting from database
const userLanguage = 'French'
const userStyle = 'Professional'
const userLevel = 'Beginner'
const userTopic = 'Introductions'

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
    languageId?: string
    description?: string
    level: string
    systemPrompt?: string
    start?: string
    createdAt?: string
}

const languages = ref<ILanguage[]>([])
const styles = ref<IStyle[]>([])
const topics = ref<ITopic[]>([])
const levels = ref(['Beginner', 'Intermediate', 'Advanced'])

const selectedLanguage = ref<string>(userLanguage)
const selectedStyle = ref<string>(userStyle)
const selectedLevel = ref<string>(userLevel)
const selectedTopic = ref<string>(userTopic)

function changeTopic() {
    const gemini = geminiref.value
    if (gemini) {
        gemini.updatePrompt(
            `Help me practice ${selectedTopic.value} in ${selectedLanguage.value} in a ${selectedStyle.value} style. Focus on practicing vocabulary, grammar and pronounciation. Do not change the topic, the style or language.`,
        )
    }
}

async function fetchOptions() {
    try {
        const [languagesResponse, topicsResponse, stylesResponse] = await Promise.all([
            axios.get(`${apiUrl}:${apiPort}/api/languages`),
            axios.get(`${apiUrl}:${apiPort}/api/topics?level=${userLevel}`),
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
        if (selectedLanguage.value && selectedLevel.value) {
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

function saveSettings() {
    console.log('Selected Settings:')
    console.log('Language:', selectedLanguage.value)
    console.log('Style:', selectedStyle.value)
    console.log('Level:', selectedLevel.value)
    console.log('Topic:', selectedTopic.value)

    console.log('Settings saved successfully!')
    open.value = false
}

onMounted(async () => {
    await fetchOptions()
    saveSettings()
})
</script>

<template>
    <p class="text-xl font-bold text-center mt-6">Gemini AI Implementation</p>

    <!-- Main Interface -->
    <div class="flex flex-row gap-6 mt-8 mx-auto max-w-6xl">
        <!-- Topics List -->
        <div class="bg-gray-100 p-4 rounded-lg shadow-lg w-1/4 h-auto">
            <p class="text-lg font-semibold mb-4">French Topics</p>
            <ul class v-for="(topic0, index) in topics0" :key="index">
                <li
                    class="bg-gray-100 p-2 border-2 border-gray-200 hover:border-gray-400 rounded-lg max-w-xs mx-auto mb my-2"
                >
                    <a href="#" class="text-gray-600">{{ topic0.name }}</a>
                </li>
            </ul>
        </div>

        <!-- Chat Interface -->
        <div class="flex flex-col gap-6 w-3/4">
            <!-- Logs Container -->
            <div class="bg-gray-800 text-white rounded-lg shadow-lg">
                <div
                    class="bg-blue-600 text-white px-4 py-2 font-semibold rounded-t-lg flex justify-between"
                >
                    <span>Chat History</span>
                    <IconMD
                        :path="mdiCog"
                        class="inline-block relative z-10"
                        width="28px"
                        @click="open = true"
                    />

                    <!-- Modal Dialog -->
                    <div
                        v-if="open"
                        class="fixed inset-0 flex items-center justify-center text-gray-600 bg-opacity-50"
                    >
                        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h3 class="text-lg font-semibold mb-4">AI Settings</h3>
                            <div class="space-y-4">
                                <!-- Language Selection -->
                                <div>
                                    <label class="block font-medium mb-1">Language</label>
                                    <select
                                        v-model="selectedLanguage"
                                        class="w-full p-2 border rounded"
                                    >
                                        <option disabled value="">Select a language</option>
                                        <option
                                            v-for="lang in languages"
                                            :key="lang._id"
                                            :value="lang.name"
                                        >
                                            {{ lang.name }}
                                        </option>
                                    </select>
                                </div>

                                <!-- Style Selection -->
                                <div>
                                    <label class="block font-medium mb-1">Style</label>
                                    <select
                                        v-model="selectedStyle"
                                        class="w-full p-2 border rounded"
                                    >
                                        <option disabled value="">Select a style</option>
                                        <option
                                            v-for="style in styles"
                                            :key="style._id"
                                            :value="style.name"
                                        >
                                            {{ style.name }}
                                        </option>
                                    </select>
                                </div>

                                <!-- Level Selection -->
                                <div>
                                    <label class="block font-medium mb-1">Level</label>
                                    <select
                                        v-model="selectedLevel"
                                        class="w-full p-2 border rounded"
                                        @change="fetchNewTopics"
                                    >
                                        <option disabled value="">Select a level</option>
                                        <option v-for="level in levels" :key="level">
                                            {{ level }}
                                        </option>
                                    </select>
                                </div>

                                <!-- Topic Selection  - want to add siomething like this :disabled="!selectedLanguage || !selectedLevel", didn't work -->
                                <div>
                                    <label class="block font-medium mb-1">Topic</label>
                                    <select
                                        v-model="selectedTopic"
                                        class="w-full p-2 border rounded"
                                        :disabled="!selectedLanguage || !selectedLevel"
                                    >
                                        <option disabled value="">Select a topic</option>
                                        <option
                                            v-for="topic in topics"
                                            :key="topic._id"
                                            :value="topic.title"
                                        >
                                            {{ topic.title }} ({{ topic.level }})
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="flex justify-start mt-4">
                                <button
                                    @click="saveSettings"
                                    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                                >
                                    Save
                                </button>
                                <button
                                    @click="open = false"
                                    class="ml-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="logs-container" class="p-4 h-72 overflow-y-auto"></div>
            </div>

            <!-- Input Controls -->
            <div class="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col gap-4">
                <input
                    type="text"
                    id="message-input"
                    class="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                    placeholder="Enter message..."
                />
                <div class="flex gap-3 justify-end">
                    <button @click="changeTopic">Prompt</button>
                    <button
                        @click="saveSettings"
                        id="send-button"
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                    >
                        Send
                    </button>
                    <GeminiClient ref="gemini" :responseModalities="responseType" />
                    <!--<button 
                    id="mic-button" 
                    class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                    <span id="mic-icon" class="material-symbols-outlined">mic</span>
                </button>-->
                </div>
            </div>
        </div>
    </div>
</template>
