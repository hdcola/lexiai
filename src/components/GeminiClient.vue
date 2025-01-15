<script setup lang="ts">
import { type GenerativeContentBlob } from '@google/generative-ai'
import { MultimodalLiveClient } from '@/lib/gemini/websocket-client'
import { AudioRecorder } from '@/lib/gemini/audio/audio-recorder'
import { AudioStreamer } from '@/lib/gemini/audio/audio-streamer'
import CONFIG from '@/lib/gemini/config/config.example'

import IconMicrophoneFull from './images/icons/IconMicrophoneFull.vue'
import IconMicrophoneEmpty from './images/icons/IconMicrophoneEmpty.vue'

import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { LiveConfig, ResponseModalities, VoiceName } from '@/lib/gemini/config/config-types'
import VolMeterWorket from '@/lib/gemini/audio/worklets/vol-meter'
import IconAudioPulseBars from './images/icons/IconAudioPulseBars.vue'
import IconAudioPulseDots from './images/icons/IconAudioPulseDots.vue'

const GOOGLE_AI_STUDIO_API_KEY = ref<string>(import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY)

const client = new MultimodalLiveClient({ apiKey: GOOGLE_AI_STUDIO_API_KEY.value })
const isConnected = ref<boolean>(false)
const isRecording = ref<boolean>(false)
const volume = ref<number>(0)

const audioRecorder = ref<AudioRecorder | null>(null)
const audioStreamer = ref<AudioStreamer | null>(null)

const voiceName = ref<VoiceName>('Aoede')
const systemInstruction = ref<string>(CONFIG.SYSTEM_INSTRUCTION.TEXT)

const props = defineProps<{ responseModalities: ResponseModalities }>()
const responseModalities = ref<ResponseModalities>(props.responseModalities)
const updateResponseModalities = computed(() => {
    console.log(`Update responseModalities to ${props.responseModalities}`)
    responseModalities.value = props.responseModalities
    updateConfig()
})

onMounted(async () => {
    connect()
})

onUnmounted(() => {
    disconnect()
})

function connect() {
    const config: LiveConfig = {
        model: 'models/gemini-2.0-flash-exp',
        generationConfig: {
            responseModalities: responseModalities.value,
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: {
                        voiceName: voiceName.value,
                    },
                },
            },
        },
        systemInstruction: {
            parts: [
                {
                    text: systemInstruction.value,
                },
            ],
        },
    }
    client.connect(config)
    isConnected.value = true

    // Initialize AudioStream
    //initAudioStream()
}

function disconnect() {
    // Disconnect the websocket
    client.disconnect()
    isConnected.value = false

    // Close audio stream
    audioStreamer.value?.stop()
    audioStreamer.value = null

    // Close recording
    audioRecorder.value?.stop()
    audioRecorder.value = null
}

async function initAudioStream() {
    if (audioStreamer.value == null) {
        audioStreamer.value = new AudioStreamer(new AudioContext())
        audioStreamer.value.sampleRate = CONFIG.AUDIO.OUTPUT_SAMPLE_RATE
        audioStreamer.value.addWorklet('vumeter-out', VolMeterWorket, (ev: any) => {
            /* console.log("real-time volume:", ev.data.volume) */
            volume.value = ev.data.volume*10 // multiplied to see a visible change
        })

        await audioStreamer.value.initialize()
    }
}

async function toggleRecording() {
    if (!isRecording.value) {
        try {
            audioRecorder.value = new AudioRecorder()

            await audioRecorder.value.start((base64Data: GenerativeContentBlob[]) => {
                client.sendRealtimeInput([
                    {
                        mimeType: 'audio/pcm;rate=16000',
                        data: base64Data,
                    },
                ])
            })

            isRecording.value = true
            console.log('Microphone started')
        } catch (error) {
            console.error('Recording Error', error)
        }
    }
    // Stop recording
    else {
        audioRecorder.value?.stop()
        isRecording.value = false
    }
}

function updateConfig() {
    disconnect()
    connect()
}

function updateVoiceName(newVoiceName: VoiceName) {
    console.log(`Update voice to ${newVoiceName}`)
    voiceName.value = newVoiceName
    updateConfig()
}

/*
function updateResponseModalities(newResponseModalities: ResponseModalities) {
    console.log(`Update responseModalities to ${newResponseModalities}`)
    responseModalities.value = newResponseModalities;
    updateConfig()
}*/

function updateSystemInstructions(newSystemInstruction: string) {
    console.log(`Update system instructions to ${newSystemInstruction}`)
    systemInstruction.value = newSystemInstruction
    updateConfig()
}

function updatePrompt(newPrompt: string) {
    client.send([
        {
            text: newPrompt,
        },
    ])
}

client.on('open', () => {
    console.log('Opened WebSocket')
})

client.on('close', () => {
    console.log('Closed WebSocket')
})

client.on('setupcomplete', () => {
    console.log('Setup Completed')
})

client.on('audio', async (data: ArrayBuffer) => {
    console.log('Audio Received')
    try {
        await initAudioStream()
        audioStreamer.value?.addPCM16(new Uint8Array(data))
    } catch (error) {
        console.error('Audio Error', error)
    }
})

client.on('content', () => {
    // TODO
    console.log('Text Received')
})

client.on('interrupted', () => {
    console.log('Interrupted')
    audioStreamer.value?.stop()
})

client.on('turncomplete', () => {
    console.log('Turn Completed')
})

// Allow access to parent
defineExpose({
    client,
    isConnected,
    isRecording,
    volume,
    connect,
    disconnect,
    updateVoiceName,
    updatePrompt,
    updateSystemInstructions,
})
</script>

<template>
    <button
        class="p-3 rounded-lg"
        :class="{ 'bg-blue-600': isRecording, 'bg-gray-800': !isRecording }"
        type="button"
        @click="toggleRecording"
    >
        <IconMicrophoneFull v-if="isRecording" />
        <IconMicrophoneEmpty v-else />
    </button>
    <button
        class="p-3 rounded-lg bg-gray-800" type="button"
    >
        <IconAudioPulseBars :active="true" :hover="true" :volume="volume" />
    </button>
</template>
