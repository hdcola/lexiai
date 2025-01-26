<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
    active: boolean
    volume: number
    hover?: boolean
}>()

const lines = ref<HTMLDivElement[]>([])

const updateLines = () => {
    // console.log('Updating lines with volume:', props.volume)
    lines.value.forEach((line, index) => {
        if (line) {
            // height between 4px and 24px
            const height = Math.max(4, Math.min(24, 4 + props.volume * (index === 1 ? 30 : 10)))
            // console.log(`Setting height for line ${index}: ${height}px`)
            line.style.height = `${height}px`
        }
    })
}

// watch the volume and update line heights
watch(() => props.volume, updateLines)

onMounted(updateLines)
</script>
<template>
    <div :class="['audioPulse', { active: props.active, hover: props.hover }]">
        <div v-for="i in 3" :key="i" ref="lines" :style="{ animationDelay: `${(i - 1) * 133}ms` }"></div>
    </div>
</template>

<style scoped>
.audioPulse {
    display: flex;
    width: 24px;
    /* justify-content: space-evenly; */
    align-items: center;
    justify-content: center;
    /* added */
    /* transition: all 0.5s;*/
    height: 100%;
    /* 4px; */
    /* transition: opacity 0.333s; */
    position: relative;
    /* added */
    transition: height 0.1s ease;
}

.audioPulse>div {
    /* border-radius: 1000px; */
    width: 3px;
    min-height: 4px;
    background-color: #fff;
    margin: 0 2px;
    /* added */
    border-radius: 1000px;
    transition: height 0.1s ease;
    animation: pulse 1s infinite;
    /* added */
}

.audioPulse.hover>div {
    /* animation: hover 1.4s infinite alternate ease-in-out;*/
    animation: none;
}

.audioPulse.active {
    opacity: 1;
}

.audioPulse.active>div {
    background-color: #fff;
}

@keyframes pulse {

    0%,
    100% {
        height: 4px;
        /* minimal height */
    }

    50% {
        height: 24px;
        /* maximal height */
    }
}
</style>
