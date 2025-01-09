<script setup lang="ts">
import AudioRecord from '@/components/poc/AudioRecord.vue';
</script>

<template>
    <main>
    <div class="container">
        <AudioRecord />
    </div>
    <div class="container">
        <AudioRecord />
    </div>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    margin-top: 1rem;
    border: 1px solid #ccc;
}
</style>
