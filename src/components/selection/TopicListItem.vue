<script setup lang="ts">
import { ref } from 'vue'
import type { ITopic } from '../GeminiSelection.vue'
import { IconEditPencil, IconPlay } from '../images/icons'
import ButtonFavorite from '../ButtonFavorite.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const emit = defineEmits(['selection', 'edit'])
const props = defineProps<{ topic: ITopic }>()
const topic = ref<ITopic>(props.topic)

function handlePlay() {
    emit('selection', topic.value)
}

function handleFavorite() {
    // Add to favorites
    topic.value.isFavorite = !topic.value.isFavorite
    // Update in store & MongoDB
    userStore.toggleFavorite(topic.value.id, topic.value.isFavorite)
}

function handleEdit() {
    emit('edit', topic.value)
}
</script>

<template>
    <li
        class="p-3 px-4 rounded-lg shadow-md mx-auto mb-4"
        :class="topic.level === 'custom' ? 'bg-yellow-50' : 'bg-white'"
    >
        <div class="flex flex-row gap-4 items-center">
            <div class="flex-grow">
                <div class="flex flex-col li-desc">
                    <h1 class="one-line-truncated">{{ topic.title }}</h1>
                    <p v-if="topic.description" class="text-xs text-gray-600 one-line-truncated">
                        {{ topic.description }}
                    </p>
                </div>
            </div>

            <button v-if="topic.canEdit" class="btn-toggle" @click="handleEdit">
                <IconEditPencil />
            </button>

            <ButtonFavorite
                :class="{ 'btn-toggle': !topic.isFavorite }"
                :isFavorite="topic.isFavorite"
                @favorite="handleFavorite"
            />

            <button type="button" class="topic-play" @click="handlePlay">
                <div
                    class="flex justify-center items-center rounded-full p-1"
                    :class="[topic.isSelected ? 'bg-green-100 selected' : 'bg-orange-100']"
                >
                    <IconPlay :class="[topic.isSelected ? 'text-green-500' : 'text-orange-500']" />
                </div>
            </button>
        </div>
    </li>
</template>

<style scoped>
.btn-toggle {
    opacity: 0;
}

li:hover .btn-toggle {
    opacity: 1;
    transition: opacity 0.3s ease;
}

/* Undo truncate on hover */
.li-desc:hover .one-line-truncated {
    overflow: unset;
    display: unset;
    -webkit-box-orient: unset;
    -webkit-line-clamp: unset;
    line-clamp: unset;
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
