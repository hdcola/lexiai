<script setup lang="ts">
import IconPlay from './images/icons/IconPlay.vue'
const emit = defineEmits(['play'])

function handleClick() {
    emit('play')
}
</script>

<template>
    <button type="button">
        <div class="flex justify-center items-center bg-orange-100 rounded-full size-8">
            <IconPlay class="text-orange-500" />
        </div>
    </button>
</template>

<style scoped></style>
