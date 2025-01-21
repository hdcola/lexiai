<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import ButtonFavorite from './ButtonFavorite.vue'
import IconPlay from './images/icons/IconPlay.vue'
import { initTabs } from 'flowbite'
import IconEdit from './images/icons/IconEdit.vue'
import IconHeartFull from './images/icons/IconHeartFull.vue'
import IconSwatchbook from './images/icons/IconSwatchbook.vue'
import SelectionTopic from './selection/SelectionTopic.vue'
import SelectionFavorites from './selection/SelectionFavorites.vue'
import SelectionCustom from './selection/SelectionCustom.vue'

// types needed to convert string id to ObjectId(id)
export type ILanguage = {
    _id: string
    name: string
}

export type IStyle = {
    _id: string
    name: string
    description?: string
}

export type ITopic = {
    _id: string
    title: string
    description?: string
    level: string
    systemPrompt?: string
    start?: string
    createdAt?: string
    isSelected?: boolean
    isFavorite?: boolean
}

// environmental variables
const apiUrl = import.meta.env.VITE_API_URL
const apiPort = import.meta.env.VITE_API_PORT

const emit = defineEmits(['selection'])

const languages = ref<ILanguage[]>([])
const styles = ref<IStyle[]>([])

// to read from MongoDb for logged user
const selectedLanguage = ref<string>('French')
const selectedStyle = ref<string>('Casual')

async function fetchOptions() {
    try {
        const [languagesResponse, stylesResponse] = await Promise.all([
            axios.get(`${apiUrl}:${apiPort}/api/languages`),
            axios.get(`${apiUrl}:${apiPort}/api/styles`),
        ])

        languages.value = languagesResponse.data.map(
            (lang: { _id: { $oid: string }; name: string }) => ({
                _id: lang._id.$oid, //extract $oid as _id
                name: lang.name,
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

onMounted(() => {
    initTabs()
    fetchOptions()
})

function handlePlay(selection: { topic: string; level: string }) {
    emit('selection', {
        language: selectedLanguage.value,
        style: selectedStyle.value,
        topic: selection.topic,
        level: selection.level,
    })
}
</script>

<template>
    <div class="flex flex-col flex-1">
        <div class="flex flex-col h-full">
            <div class="border-b flex justify-center">
                <ul
                    class="flex flex-wrap -mb-px pt-4 text-sm font-medium text-center"
                    id="default-styled-tab"
                    data-tabs-toggle="#default-styled-tab-content"
                    data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
                    data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
                    role="tablist"
                >
                    <li class="me-2" role="presentation">
                        <button
                            class="inline-flex items-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                            id="topics-styled-tab"
                            data-tabs-target="#styled-topics"
                            type="button"
                            role="tab"
                            aria-controls="topics"
                            aria-selected="false"
                        >
                            <IconSwatchbook class="me-2 md:hidden lg:block" />
                            Topics
                        </button>
                    </li>
                    <li class="me-2" role="presentation">
                        <button
                            class="inline-flex items-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                            id="favorites-styled-tab"
                            data-tabs-target="#styled-favorites"
                            type="button"
                            role="tab"
                            aria-controls="favorites"
                            aria-selected="false"
                        >
                            <IconHeartFull class="me-2 md:hidden lg:block" />
                            Favorites
                        </button>
                    </li>
                    <li class="me-2" role="presentation">
                        <button
                            class="inline-flex items-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                            id="custom-styled-tab"
                            data-tabs-target="#styled-custom"
                            type="button"
                            role="tab"
                            aria-controls="custom"
                            aria-selected="false"
                        >
                            <IconEdit class="me-2 md:hidden lg:block" />
                            Custom
                        </button>
                    </li>
                </ul>
            </div>
            <div id="default-styled-tab-content" class="flex flex-col flex-1 min-h-0">
                <div
                    class="rounded-lg flex flex-col h-full py-3"
                    id="styled-topics"
                    role="tabpanel"
                    aria-labelledby="topics-tab"
                >
                    <SelectionTopic @selection="handlePlay" />
                </div>
                <div
                    class="hidden p-4 rounded-lg"
                    id="styled-favorites"
                    role="tabpanel"
                    aria-labelledby="favorites-tab"
                >
                    <SelectionFavorites />
                </div>
                <div
                    class="hidden p-4 rounded-lg"
                    id="styled-custom"
                    role="tabpanel"
                    aria-labelledby="custom-tab"
                >
                    <SelectionCustom />
                </div>
            </div>

            <div class="flex flex-row justify-center items-center px-4 py-2 gap-2">
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
    </div>
</template>

<style scoped>
.btn {
    background: var(--gradient-orange);
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
