<script setup lang="ts">
import { ref, watch } from 'vue'
import IconAnnotation from './images/icons/IconAnnotation.vue'
import IconVolume from './images/icons/IconVolume.vue'

const props = defineProps<{ isAudio: boolean }>()
const emit = defineEmits(['toggle'])

const isAudio = ref<boolean>(props.isAudio)
watch(
    () => props.isAudio,
    function () {
        isAudio.value = props.isAudio
    },
)

function handleClick() {
    isAudio.value = !isAudio.value
    emit('toggle', !isAudio.value)
}
</script>

<template>
    <button
        @click="handleClick"
        class="size-14 flex justify-center items-center rounded-full bg-gray-800"
        type="button"
    >
        <IconVolume v-if="isAudio" class="scale-125" />
        <IconAnnotation v-else class="scale-125" />
    </button>
</template>

<style scoped></style>
