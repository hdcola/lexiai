<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Voices, type VoiceName } from '@/lib/gemini/config/config-types'
import { useUserStore } from '@/stores/user'
import * as Yup from 'yup'

const userStore = useUserStore()

const errorMessage = ref<string>('')
const successMessage = ref<string>('')
// validation errors
const errors = ref<Record<string, string>>({})

const apiKey = ref<string>('')
const voiceName = ref<VoiceName>('Aoede')

const schema = Yup.object().shape({
    apiKey: Yup.string().length(39, 'API Key should be 39 characters long'),
})

function handleChange(event: Event) {
    const el = event.target as HTMLInputElement
    errors.value[el.name] = ''
}

const onSubmit = async () => {
    // Could verify if anything changed before submitting?
    errorMessage.value = ''
    successMessage.value = ''

    try {
        await schema.validate({ apiKey: apiKey.value }, { abortEarly: false })

        userStore.saveLexiSettings(voiceName.value, apiKey.value)
        successMessage.value = 'Successfully saved'
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            error.inner.forEach((err) => {
                errors.value[err.path as string] = err.message
            })
        } else {
            // TODO: Implement proper error
            errorMessage.value = 'Something went wrong.'
        }
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
    <form
        @submit.prevent="onSubmit"
        :validation-schema="schema"
        class="space-y-8 sm:mx-auto sm:w-full sm:max-w-sm"
    >
        <div v-if="errorMessage" role="alert" class="error-msg">
            {{ errorMessage }}
        </div>
        <div v-if="successMessage" role="alert" class="success-msg">
            {{ successMessage }}
        </div>
        <div class="form-group">
            <label>Change voice</label>
            <select v-model="voiceName" class="w-full p-2 border rounded">
                <option disabled value="">Select a voice</option>
                <option v-for="voice in Voices" :key="voice" :value="voice">
                    {{ voice }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label for="apiKey">Custom Gemini API Key</label>
            <input
                type="apiKey"
                name="apiKey"
                id="apiKey"
                v-model="apiKey"
                v-on:change="handleChange"
                :class="{ error: errors.apiKey }"
                required
            />
            <p>{{ errors.apiKey }}</p>
        </div>

        <button type="submit" class="w-full lexi-btn">Save</button>
    </form>
</template>

<style scoped></style>
