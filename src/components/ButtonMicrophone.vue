<script setup lang="ts">
import { ref, watch } from 'vue'
import IconMicrophoneFull from './images/icons/IconMicrophoneFull.vue'
import IconMicrophoneBar from './images/icons/IconMicrophoneBar.vue';

const props = defineProps<{ isRecording: boolean; inputVolume: number }>()
const scale = ref<number>(1.5)

watch(() => props.inputVolume, updateSize)
function updateSize() {
    scale.value = Math.max(1.5, Math.min(props.inputVolume * 40, 2))
}
</script>
<template>
    <div
        class="flex justify-center items-center rounded-full relative"
        :class="{ pulse: props.isRecording }"
    >
        <button
            class="size-20 p-3 rounded-full flex justify-center items-center"
            :class="{ active: props.isRecording, 'bg-gray-800': !props.isRecording }"
            type="button"
        >
            <IconMicrophoneFull v-if="props.isRecording" class="size-10" />
            <IconMicrophoneBar v-else class="size-10" />
        </button>
    </div>
</template>

<style scoped>
button.active {
    background: var(--gradient-purple);
}
.pulse:before,
.pulse:after {
    @apply rounded-full bg-purple-600;
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    opacity: 0.8;
}
.pulse:before {
    transition: scale 1s ease-out infinite;
    animation: pulse 2s ease-out infinite;
}
.pulse:after {
    transition: scale 1s 1s ease-out infinite;
    animation: pulse 2s 1s ease-out infinite;
}
@keyframes pulse {
    100% {
        scale: v-bind('scale');
        opacity: 0;
    }
}
</style>
