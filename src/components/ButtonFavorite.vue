<script setup lang="ts">
import { ref } from 'vue'
import IconHeartEmpty from './images/icons/IconHeartEmpty.vue'
import IconHeartFull from './images/icons/IconHeartFull.vue'

const props = defineProps<{ isFavorite: boolean }>()
const emit = defineEmits(['favorite'])

const isFavorite = ref<boolean>(props.isFavorite)

function handleToggle() {
    isFavorite.value = !isFavorite.value
    emit('favorite', isFavorite.value)
}
</script>

<template>
    <button type="button" @click="handleToggle">
        <IconHeartFull v-if="isFavorite" :class="{ scale: isFavorite }" />
        <IconHeartEmpty v-else />
    </button>
</template>

<style scoped>
button svg {
    color: rgb(255, 116, 116);
    scale: 1.3;
}
.scale {
    animation: scaleup 0.3s linear;
}
@keyframes scaleup {
    from {
        scale: 1.5;
    }
    to {
        scale: 1.3;
    }
}
</style>
