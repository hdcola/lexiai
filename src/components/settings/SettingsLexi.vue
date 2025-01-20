<script setup lang="ts">
import { ref } from 'vue'
import { Voices } from '@/lib/gemini/config/config-types'
import type { VoiceName } from '@/lib/gemini/config/config-types'

const errorMessage = ref<string>('')
const successMessage = ref<string>('')

const apiKey = ref<string>('')
const voice = ref<VoiceName | ''>('')
</script>

<template>
    <form @submit.prevent="" class="space-y-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div
            v-if="errorMessage"
            role="alert"
            class="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
        >
            {{ errorMessage }}
        </div>
        <div
            v-if="successMessage"
            role="alert"
            class="bg-green-50 border-green-400 text-green-700 px-4 py-3 rounded relative text-center"
        >
            {{ successMessage }}
        </div>
        <div class="form-group">
            <div>
                <label class="block font-medium mb-1">Change voice</label>
                <select v-model="voice" class="w-full p-2 border rounded">
                    <option disabled value="">Select a voice</option>
                    <option v-for="v in Voices" :key="v" :value="v">
                        {{ v }}
                    </option>
                </select>
            </div>
        </div>

        <div class="hidden form-group">
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
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
            />
        </div>

        <button type="submit" class="w-full lexi-btn">Save</button>
    </form>
</template>

<style scoped></style>
