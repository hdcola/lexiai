<script setup>
import AudioRecord from '@/components/poc/AudioRecord.vue';
import { useGenAI } from '@/composables/useGenAI';
import { MultimodalLiveClient } from '@/lib/core/websocket-client';


useGenAI("string")

</script>

<template>
    <main>
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
