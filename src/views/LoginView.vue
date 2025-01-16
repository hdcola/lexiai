<script setup lang="ts">
import ImgLogin from '@/components/images/ImgLogin.vue'
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

const email = ref<string>('')
const password = ref<string>('')
const errorMessage = ref<string>('')
const successMessage = ref<string>('')

const apiUrl = import.meta.env.VITE_API_URL
const apiPORT = import.meta.env.VITE_API_PORT

const login = async () => {
    errorMessage.value = '' // clear previous errors
    successMessage.value = ''
    if (!email.value || !password.value) {
        errorMessage.value = 'Email and password are required.'
        return
    }
    try {
        const response = await axios.post(`${apiUrl}:${apiPORT}/api/users/login`, {
            email: email.value,
            password: password.value,
        })

        if (response.data.accessToken) {
            const token = response.data.accessToken

            // Store token in localStorage
            localStorage.setItem('accessToken', token)

            console.log('Login successful, token stored')

            successMessage.value = 'Login successful'
            // redirect to home
            setTimeout(() => router.push('/'), 2000)
        }
    } catch (error) {
        console.log('Login error:', error)
        errorMessage.value = error.response?.data?.error || 'Login failed. Please try again.'
    }
}
</script>

<template>
    <section class="flex flex-col-reverse lg:flex-row">
        <div class="w-full lg:w-1/2 flex justify-center lg:justify-end lg:pe-10">
            <div class="w-full md:w-1/2 lg:w-4/5">
                <ImgLogin />
            </div>
        </div>
        <div class="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:ps-10">
            <div class="flex flex-col w-full md:w-2/3">
                <h2 class="text-center text-2xl font-bold text-gray-900">Log into your account</h2>

                <form
                    @submit.prevent="login"
                    class="space-y-8 mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
                >
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
                            v-model="email"
                            autocomplete="email"
                            required
                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                    </div>

                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                            >Your password</label
                        >

                        <input
                            type="password"
                            name="password"
                            id="password"
                            v-model="password"
                            autocomplete="current-password"
                            required
                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                    </div>

                    <button type="submit" class="w-full lexi-btn">Log In</button>
                </form>

                <p class="mt-5 text-center text-gray-900">
                    Don't have an account?
                    <RouterLink
                        to="/register"
                        class="ms-1 font-semibold text-blue-600 hover:text-blue-500 underline"
                    >
                        Sign Up.</RouterLink
                    >
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
