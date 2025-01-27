<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ButtonFavorite from '../ButtonFavorite.vue'
import IconPlay from '../images/icons/IconPlay.vue'
import type { ITopic } from '../GeminiSelection.vue'
import { useUserStore } from '@/stores/user'
import { useServerRequest } from '@/assets/composables/useServerRequest';

const emit = defineEmits(['selection'])
const userStore = useUserStore()
const favorites = userStore.getFavorites()


const topics = ref<ITopic[]>([])
const selectedTopic = ref<ITopic | null>(null)

async function fetchTopics() {
    try {
        const topicsResponse = await useServerRequest('get', '/api/users/favorites');

        topics.value = topicsResponse?.data.map(
            (topic: { _id: { $oid: string }; title: string; level: string }) => ({
                _id: topic._id.$oid,
                title: topic.title,
                level: topic.level,
                isFavorite: true,
            }),
        )
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
        topic: selectedTopic.value.title,
    })
}

function handleFavorite(topic: ITopic) {
    // Add to favorites
    topic.isFavorite = !topic.isFavorite
    topics.value.filter((t) => t._id != topic._id)
    // Update in store & MongoDB
    userStore.toggleFavorite(topic._id, topic.isFavorite)
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
        <li
            v-for="topic in topics"
            :key="topic._id"
            class="bg-white p-3 px-4 rounded-lg shadow-md mx-auto mb-4"
        >
            <div class="flex flex-row gap-4 items-center">
                <div class="flex-grow">
                    {{ topic.title }}
                </div>

                <ButtonFavorite
                    :class="{ 'btn-toggle': !topic.isFavorite }"
                    :isFavorite="topic.isFavorite"
                    @favorite="handleFavorite(topic)"
                />

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
        </li>
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
