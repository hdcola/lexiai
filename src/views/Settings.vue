<script setup lang="ts">
import ImgSettings from '@/components/images/ImgSettings.vue'
import { ref } from 'vue'

const errorMessage = ref<string>('')
const successMessage = ref<string>('')
</script>
<template>
    <section class="flex flex-col-reverse lg:flex-row">
        <div class="w-full lg:w-1/2 flex justify-center lg:justify-end lg:pe-10">
            <div class="w-full md:w-1/2 lg:w-4/5">
                <ImgSettings />
            </div>
        </div>
        <div class="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:ps-10">
            <div class="flex flex-col w-full md:w-2/3">
                <h2 class="text-center text-2xl font-bold text-gray-900">Settings</h2>

                <form @submit.prevent="" class="space-y-8 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                            >Your email</label
                        >
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            required
                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                    </div>

                    <button type="submit" class="w-full lexi-btn">Save</button>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
