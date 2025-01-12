<script setup lang="ts">

import { type GenerativeContentBlob } from '@google/generative-ai'
import { MultimodalLiveClient } from '@/lib/gemini/websocket-client'
import { AudioRecorder } from '@/lib/gemini/audio/audio-recorder'
import { AudioStreamer } from '@/lib/gemini/audio/audio-streamer'
import CONFIG from '@/lib/gemini/config/config.example'

import IconMicrophoneFull from './poc/icons/IconMicrophoneFull.vue'
import IconMicrophoneEmpty from './poc/icons/IconMicrophoneEmpty.vue'

import { onMounted, onUnmounted, ref } from 'vue'

const GOOGLE_AI_STUDIO_API_KEY = ref<string>(import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY)

const client = new MultimodalLiveClient({apiKey: GOOGLE_AI_STUDIO_API_KEY.value})
const isConnected = ref<boolean>(false)
const isRecording = ref<boolean>(false)

const audioRecorder = ref<AudioRecorder | null>(null)
const audioStreamer = ref<AudioStreamer | null>(null)

onMounted(async () => {
    // Connect the websocket
    const config = {
        model: CONFIG.API.MODEL_NAME,
        generationConfig: {
            responseModalities: ["audio"],
            speechConfig: {
                voiceConfig: { 
                    prebuiltVoiceConfig: { 
                        voiceName: CONFIG.VOICE.NAME    // You can change voice in the config.js file
                    }
                }
            },
        },
        systemInstruction: {
            parts: [{
                text: CONFIG.SYSTEM_INSTRUCTION.TEXT     // You can change system instruction in the config.js file
            }],
        }
    };

    client.connect(config)
    isConnected.value = true

    // Initialize AudioStream
    //initAudioStream()
})

onUnmounted(() => {
    // Disconnect the websocket
    client.disconnect()
    isConnected.value = false

    // Close audio stream
    audioStreamer.value?.stop()
    audioStreamer.value = null

    // Close recording
    audioRecorder.value?.stop()
    audioRecorder.value = null
})

async function initAudioStream() {
    if (audioStreamer.value == null) {
        audioStreamer.value = new AudioStreamer(new AudioContext())
        audioStreamer.value.sampleRate = CONFIG.AUDIO.OUTPUT_SAMPLE_RATE

        await audioStreamer.value.initialize()
    }
}

async function toggleRecording() {
    
    if (!isRecording.value) {
        try {
            audioRecorder.value = new AudioRecorder()

            await audioRecorder.value.start((base64Data: GenerativeContentBlob[]) => {
                client.sendRealtimeInput([{
                    mimeType: "audio/pcm;rate=16000",
                    data: base64Data
                }])
            })

            isRecording.value = true
            console.log("Microphone started")
        }
        catch (error) {
            console.error("Recording Error", error)
        }
    }
    // Stop recording
    else {
        audioRecorder.value?.stop()
        isRecording.value = false
    }
}

client.on("open", () => {
    console.log("Opened WebSocket")
})

client.on("close", () => {
    console.log("Closed WebSocket")
})

client.on("setupcomplete", () => {
    console.log("Setup Completed")
})

client.on("audio", async (data: ArrayBuffer) => {
    console.log("Audio Received")
    try {
        await initAudioStream()
        audioStreamer.value?.addPCM16(new Uint8Array(data))
    }
    catch (error) {
        console.error("Audio Error", error)
    }
})

client.on("content", () => {
    // TODO
    console.log("Text Received")
})

client.on("interrupted", () => {
    console.log("Interrupted")
    audioStreamer.value?.stop()
})

client.on("turncomplete", () => {
    console.log("Turn Completed")
})

// Allow access to parent
defineExpose({
    client,
    isConnected,
    isRecording,
})

</script>

<template>
    <button class="p-3 rounded-lg" :class="{'bg-blue-600': isRecording, 'bg-gray-800': !isRecording}" type="button" @click="toggleRecording">
        <IconMicrophoneFull v-if="isRecording" />
        <IconMicrophoneEmpty v-else />
    </button>
</template>
