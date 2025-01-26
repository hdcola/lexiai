<script setup lang="ts">
import { type GenerativeContentBlob } from '@google/generative-ai'
import { MultimodalLiveClient } from '@/lib/gemini/websocket-client'
import { AudioRecorder } from '@/lib/gemini/audio/audio-recorder'
import { AudioStreamer } from '@/lib/gemini/audio/audio-streamer'
import CONFIG from '@/lib/gemini/config/config.example'

import { onMounted, onUnmounted, ref } from 'vue'
import type { LiveConfig, ResponseModalities, VoiceName } from '@/lib/gemini/config/config-types'
import VolMeterWorket from '@/lib/gemini/audio/worklets/vol-meter'
import ButtonMicrophone from './ButtonMicrophone.vue'
import ButtonGeminiSpeaker from './ButtonGeminiSpeaker.vue'
import ImgLearningBooks from './images/ImgLearningBooks.vue'
import { useUserStore } from '@/stores/user'

const GOOGLE_AI_STUDIO_API_KEY = ref<string>(import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY)

const userStore = useUserStore()
const client = new MultimodalLiveClient({ apiKey: GOOGLE_AI_STUDIO_API_KEY.value })
const isConnected = ref<boolean>(false)
const isRecording = ref<boolean>(false)
const isResponding = ref<boolean>(false)
const isPromptInitialized = ref<boolean>(false)
const volume = ref<number>(0)
const inputVolume = ref<number>(0)

const audioContext = ref<AudioContext | null>(null)
const audioRecorder = ref<AudioRecorder | null>(null)
const audioStreamer = ref<AudioStreamer | null>(null)

const voiceName = ref<VoiceName>('Aoede')
const systemInstruction = ref<string>(CONFIG.SYSTEM_INSTRUCTION.TEXT)

const props = defineProps<{
    responseModalities: ResponseModalities
    topic?: string
    language?: string
}>()
const responseModalities = ref<ResponseModalities>(props.responseModalities)

onMounted(async () => {
    const settings = userStore.getLexiSettings()
    if (settings.apiKey) {
        GOOGLE_AI_STUDIO_API_KEY.value = settings.apiKey
    }
    if (settings.voiceName) {
        voiceName.value = settings.voiceName
    }
    await connect()
})

onUnmounted(() => {
    disconnect()
})

async function connect() {
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
    await client.connect(config)
    isConnected.value = true

    // Initialize AudioStream
    //initAudioStream()
}

function disconnect() {
    // Disconnect the websocket
    client.disconnect()
}

async function initAudioStream() {
    if (audioContext.value == null) {
        audioContext.value = new AudioContext()
    }

    if (audioStreamer.value == null) {
        audioStreamer.value = new AudioStreamer(audioContext.value)
        audioStreamer.value.sampleRate = CONFIG.AUDIO.OUTPUT_SAMPLE_RATE
        audioStreamer.value.addWorklet('vumeter-out', VolMeterWorket, (ev: any) => {
            /* console.log("real-time volume:", ev.data.volume) */
            volume.value = ev.data.volume * 10 // multiplied to see a visible change
        })

        await audioStreamer.value.initialize()
    }
}

async function toggleRecording() {
    // Verify if the websocket is still running
    if (!isConnected.value) {
        await connect()
    }

    if (!isRecording.value) {
        try {
            await initAudioStream()
            audioRecorder.value = new AudioRecorder()

            await audioRecorder.value.start((base64Data: GenerativeContentBlob[]) => {
                client.sendRealtimeInput([
                    {
                        mimeType: 'audio/pcm;rate=16000',
                        data: base64Data,
                    },
                ])

                audioRecorder.value?.on('inputVolume', (volume: number) => {
                    inputVolume.value = volume
                })
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
        audioRecorder.value?.off('inputVolume')
    }
}

async function updateConfig() {
    disconnect()
    await connect()
}

async function updateVoiceName(newVoiceName: VoiceName) {
    console.log(`Update voice to ${newVoiceName}`)
    voiceName.value = newVoiceName
    await updateConfig()
}

/*
function updateResponseModalities(newResponseModalities: ResponseModalities) {
    console.log(`Update responseModalities to ${newResponseModalities}`)
    responseModalities.value = newResponseModalities;
    updateConfig()
}*/

async function updateSystemInstructions(newSystemInstruction: string) {
    console.log(`Update system instructions to ${newSystemInstruction}`)
    systemInstruction.value = newSystemInstruction
    await updateConfig()
}

async function updatePrompt(newPrompt: string) {
    // Verify if the websocket is still running
    console.log('Update Prompt', newPrompt)
    if (!isConnected.value) {
        await connect()
    }

    isPromptInitialized.value = true

    client.send([
        {
            text: newPrompt,
        },
    ])
}

async function handleInterrupt() {
    await updatePrompt('Gemini, stop.')
}

client.on('open', () => {
    console.log('Opened WebSocket')
})

client.on('close', () => {
    console.log('Closed WebSocket')
    isConnected.value = false
    isRecording.value = false
    isResponding.value = false

    // Close audio stream
    audioStreamer.value?.stop()
    audioStreamer.value = null

    // Close recording
    audioRecorder.value?.stop()
    audioRecorder.value = null
    isRecording.value = false
    isResponding.value = false
})

client.on('setupcomplete', () => {
    console.log('Setup Completed')
})

client.on('audio', async (data: ArrayBuffer) => {
    // console.log('Audio Received')
    try {
        await initAudioStream()
        audioStreamer.value?.addPCM16(new Uint8Array(data))
        isResponding.value = true
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
    isResponding.value = false
})

client.on('turncomplete', () => {
    console.log('Turn Completed')
    isResponding.value = false
})

// Allow access to parent
defineExpose({
    client,
    isConnected,
    isRecording,
    isResponding,
    volume,
    inputVolume,
    connect,
    disconnect,
    updateVoiceName,
    updatePrompt,
    updateSystemInstructions,
})
</script>

<template>
    <div class="flex flex-col flex-1">
        <div v-if="!isPromptInitialized" class="flex flex-col justify-center items-center size-full px-10 text-center">
            <div class="w-full mb-5 mt-14">
                <h2 class="text-2xl font-bold">Select a topic</h2>
                <hr class="my-3 border-black opacity-40 w-3/4 mx-auto" />
                <p>Start practicing your speaking skills</p>
            </div>
            <ImgLearningBooks class="scale-90" />
        </div>
        <div v-else class="flex flex-col flex-1">
            <div class="flex-1 flex flex-col text-center">
                <h1></h1>
                <h3></h3>
            </div>
            <div class="flex justify-center items-center gap-10 py-10 px-4">
                <ButtonMicrophone class="z-[2]" :isRecording="isRecording" :inputVolume="inputVolume"
                    @click="toggleRecording" />
                <ButtonGeminiSpeaker :volume="volume" :isResponding="isResponding" :isAudio="true"
                    @interrupt="handleInterrupt" />
            </div>
        </div>
    </div>
</template>
