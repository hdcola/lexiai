<script setup lang="ts">
import { ref } from 'vue'

const errorMessage = ref<string>('')
const successMessage = ref<string>('')

const password = ref<string>('')
const confirmPassword = ref<string>('')
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
            <div class="mb-4">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                    >New password</label
                >
                <input
                    type="password"
                    name="password"
                    id="password"
                    v-model="password"
                    required
                    minlength="6"
                    maxlength="50"
                    class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
            </div>
            <div>
                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900"
                    >Confirm password</label
                >
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    v-model="confirmPassword"
                    required
                    minlength="6"
                    maxlength="50"
                    class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
            </div>
        </div>

        <button type="submit" class="w-full lexi-btn">Save</button>
    </form>
</template>

<style scoped></style>
