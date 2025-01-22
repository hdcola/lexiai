<script setup lang="ts">
import { ref } from 'vue'

const errorMessage = ref<string>('')
const successMessage = ref<string>('')

const username = ref<string>('')
const newUsername = ref<string>('')
const email = ref<string>('')
const newEmail = ref<string>('')
</script>

<template>
    <form @submit.prevent="" class="space-y-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div v-if="errorMessage" role="alert" class="error-msg">
            {{ errorMessage }}
        </div>
        <div v-if="successMessage" role="alert" class="success-msg">
            {{ successMessage }}
        </div>
        <div class="form-group">
            <div class="relative mb-2">
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
                    >Your username</label
                >
                <div class="relative mb-4">
                    <div
                        class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
                    >
                        <svg
                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="username"
                        class="bg-gray-50 text-gray-900 text-sm rounded-lg border-0 focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :placeholder="username"
                        v-model="username"
                        disabled
                    />
                </div>
            </div>
            <div>
                <label for="newUsername" class="block mb-2 text-sm font-medium text-gray-900"
                    >Change username</label
                >
                <input
                    type="text"
                    name="newUsername"
                    id="newUsername"
                    v-model="newUsername"
                    minlength="4"
                    required
                    class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
            </div>
        </div>
        <div class="form-group">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
            >
            <div class="relative mb-4">
                <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
                >
                    <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                    >
                        <path
                            d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
                        />
                        <path
                            d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
                        />
                    </svg>
                </div>
                <input
                    type="email"
                    id="email"
                    disabled
                    class="bg-gray-50 text-gray-900 text-sm rounded-lg border-0 w-full ps-10 p-2.5 dark:bg-gray-700"
                    :placeholder="email"
                />
            </div>
            <div>
                <label for="newEmail" class="block mb-2 text-sm font-medium text-gray-900"
                    >Change email</label
                >
                <input
                    type="email"
                    name="newEmail"
                    id="newEmail"
                    v-model="newEmail"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
            </div>
        </div>

        <button type="submit" class="w-full lexi-btn">Save</button>
    </form>
</template>

<style scoped></style>
