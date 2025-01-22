<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Voices } from '@/lib/gemini/config/config-types'
import type { VoiceName } from '@/lib/gemini/config/config-types'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const errorMessage = ref<string>('')
const successMessage = ref<string>('')

const apiKey = ref<string>('')
const voiceName = ref<VoiceName>('Aoede')

const onSubmit = () => {
    // Could verify if anything changed before submitting?
    try {
        userStore.saveLexiSettings(voiceName.value, apiKey.value)
        successMessage.value = 'Successfully saved'
    } catch (error) {
        // TODO: Implement proper error
        errorMessage.value = 'Something went wrong.'
    }
}

onMounted(() => {
    const settings = userStore.getLexiSettings()
    if (settings.apiKey) {
        apiKey.value = settings.apiKey
    }
    if (settings.voiceName) {
        voiceName.value = settings.voiceName
    }
})
</script>

<template>
    <form @submit.prevent="onSubmit" class="space-y-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div v-if="errorMessage" role="alert" class="error-msg">
            {{ errorMessage }}
        </div>
        <div v-if="successMessage" role="alert" class="success-msg">
            {{ successMessage }}
        </div>
        <div class="form-group">
            <div>
                <label class="block font-medium mb-1">Change voice</label>
                <select v-model="voiceName" class="w-full p-2 border rounded">
                    <option disabled value="">Select a voice</option>
                    <option v-for="voice in Voices" :key="voice" :value="voice">
                        {{ voice }}
                    </option>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label for="apiKey" class="block mb-2 text-sm font-medium text-gray-900"
                >Custom Gemini API Key</label
            >
            <input
                type="apiKey"
                name="apiKey"
                id="apiKey"
                v-model="apiKey"
                required
                minlength="39"
                maxlength="39"
            />
        </div>

        <button type="submit" class="w-full lexi-btn">Save</button>
    </form>
</template>

<style scoped></style>
