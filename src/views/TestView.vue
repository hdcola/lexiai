<script setup>
import { AudioRecorder } from '@/lib/gemini/audio/audio-recorder';
import { AudioStreamer } from '@/lib/gemini/audio/audio-streamer';
import GeminiClient from '@/components/GeminiClient.vue';

</script>

<template>
    <main>
        <div class="container">
           <!--<AudioRecord />-->
            <GeminiClient />
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
