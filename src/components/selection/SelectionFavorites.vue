<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ITopic } from '../GeminiSelection.vue'
import { useUserStore } from '@/stores/user'
import { useServerRequest } from '@/assets/composables/useServerRequest'
import TopicListItem from './TopicListItem.vue'

const emit = defineEmits(['selection', 'edit'])
const userStore = useUserStore()
const user = userStore.getUser()
const favorites = userStore.getFavorites()

const topics = ref<ITopic[]>([])
const selectedTopic = ref<ITopic | null>(null)

async function fetchTopics() {
    try {
        const topicsResponse = await useServerRequest('get', '/api/users/favorites')

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
    })
}

function handleFavorite(topic: ITopic) {
    // Add to favorites
    topic.isFavorite = !topic.isFavorite
    topics.value.filter((t) => t._id != topic._id)
    // Update in store & MongoDB
    userStore.toggleFavorite(topic._id.$oid, topic.isFavorite)
}

function handleEdit(topic: ITopic) {
    emit('edit', topic)
}

async function onActivated() {
    // TODO More elegant solution
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
    <ul class="flex-1 overflow-y-auto px-4">
        <TopicListItem
            v-for="topic in topics"
            :key="topic.id"
            :topic="topic"
            @edit="handleEdit"
            @selection="handlePlay"
        />
    </ul>
</template>

<style scoped>
ul {
    scrollbar-color: #c3ddfd transparent;
}
.btn-toggle {
    opacity: 0;
}
li:hover .btn-toggle {
    opacity: 1;
    transition: opacity 0.3s ease;
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
