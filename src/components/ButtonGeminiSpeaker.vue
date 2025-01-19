<script setup lang="ts">
import { ref } from 'vue'
import IconAudioPulseBars from './images/icons/IconAudioPulseBars.vue'
import IconClose from './images/icons/IconClose.vue'
import IconAnnotation from './images/icons/IconAnnotation.vue'
import IconVolume from './images/icons/IconVolume.vue'

const props = defineProps<{ volume: number; isResponding: boolean; isAudio: boolean }>()

const emit = defineEmits(['interrupt'])

function interrupt() {
    emit('interrupt')
}
</script>

<template>
    <div class="flex flex-row items-center relative w-28">
        <!--<button
            class="size-14 flex justify-center items-center rounded-full bg-gray-800"
            type="button"
        >
            <IconVolume v-if="props.isAudio" class="scale-125" />
            <IconAnnotation v-else class="scale-125" />
        </button>-->
        <div
            class="size-14 flex justify-center items-center rounded-full bg-gray-800 z-10"
            type="button"
        >
            <IconAudioPulseBars
                :active="true"
                :hover="true"
                :volume="props.volume"
                class="scale-125"
            />
        </div>

        <button
            id="cancel-btn"
            class="absolute rounded-full size-10 flex justify-center items-center bg-red-300"
            @click="interrupt"
            :class="{ active: props.isResponding }"
        >
            <IconClose />
        </button>
    </div>
</template>

<style scoped>
#cancel-btn {
    opacity: 0;
    right: 30px;
    transition: all 0.1s ease-in;
}
#cancel-btn.active {
    opacity: 1;
    right: 0;
    transition: all 0.1s ease-in;
}
</style>
