<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ITopic } from '../GeminiSelection.vue'
import { useUserStore } from '@/stores/user'
import { useServerRequest } from '../../assets/composables/useServerRequest'
import TopicListItem from './TopicListItem.vue'

interface Level {
    level: 'beginner' | 'advanced' | 'custom'
    label: string
}

const emit = defineEmits(['selection', 'edit'])
const userStore = useUserStore()
const user = userStore.getUser()
let favorites = userStore.getFavorites()

const topics = ref<ITopic[]>([])
const levels = ref<Level[]>([
    {
        level: 'beginner',
        label: 'Beginner',
    },
    {
        level: 'advanced',
        label: 'Advanced',
    },
    {
        level: 'custom',
        label: 'Custom',
    },
])

// to read from MongoDb for logged user
const selectedLevel = ref<string>('beginner')
const selectedTopic = ref<ITopic | null>(null)

async function fetchTopics() {
    try {
        const topicsResponse = await useServerRequest(
            'get',
            `/api/topics?level=${selectedLevel.value}`,
        )

        topics.value = topicsResponse?.data.map((topic: ITopic) => ({
            ...topic,
            id: topic._id.$oid,
            isFavorite: topic._id.$oid in favorites,
            canEdit: topic.user_id.$oid === user._id,
        }))
    } catch (error) {
        console.error('Error fetching options:', error)
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
        topic: selectedTopic.value,
        level:
            selectedLevel.value == 'Beginner'
                ? 'a beginner, tell me what to say but take it slow'
                : 'advanced',
    })
}

function handleFavorite(topic: ITopic) {
    // Add to favorites
    topic.isFavorite = !topic.isFavorite
    // Update in store & MongoDB
    userStore.toggleFavorite(topic.id, topic.isFavorite)
}

function handleEdit(topic: ITopic) {
    emit('edit', topic)
}

async function onActivated() {
    // TODO More elegant solution
    favorites = userStore.getFavorites()
    await fetchTopics()
}

onMounted(async () => {
    await onActivated()
})

defineExpose({
    onActivated,
})
</script>

<template>
    <div class="py-3 px-4 mb-4">
        <select v-model="selectedLevel" class="w-full" @change="fetchTopics">
            <option disabled>Select a section</option>
            <option v-for="level in levels" :key="level.level" :value="level.level">
                {{ level.label }}
            </option>
        </select>
    </div>
    <ul class="flex-1 overflow-y-auto px-4">
        <TopicListItem
            v-for="topic in topics"
            :key="topic.id"
            :topic="topic"
            @edit="handleEdit"
            @selection="handlePlay"
            class="!bg-white"
        />
    </ul>
</template>

<style scoped>
ul {
    scrollbar-color: #c3ddfd transparent;
}
</style>
