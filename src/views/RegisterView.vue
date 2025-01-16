<script setup lang="ts">
import ImgRegister from '@/components/images/ImgRegister.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const errorMessage = ref<string>('')
const successMessage = ref<string>('')
const router = useRouter()

const apiUrl = import.meta.env.VITE_API_URL
const apiPORT = import.meta.env.VITE_API_PORT

const register = async () => {
    errorMessage.value = ''
    successMessage.value = ''

    if (!username.value || !email.value || !password.value || !confirmPassword.value) {
        errorMessage.value = 'All fields are required.'
        return
    }

    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match.'
        return
    }

    try {
        const response = await axios.post(`${apiUrl}:${apiPORT}/api/users/register`, {
            username: username.value,
            email: email.value,
            password: password.value,
        })

        console.log('Registration successful:', response.data)

        successMessage.value = 'Registration successful. Please log in.'
        setTimeout(() => router.push('/login'), 2000) // Redirect after 3 seconds
    } catch (error) {
        console.log('Registration error:', error)
        /* errorMessage.value = error.response?.data?.error || 'Registration failed. Please try again.'; */
    }
}
</script>

<template>
    <section class="flex flex-col-reverse lg:flex-row">
        <div class="w-full lg:w-1/2 flex justify-center lg:justify-end lg:pe-10">
            <div class="w-full md:w-1/2 lg:w-4/5">
                <ImgRegister class="scale-75" />
            </div>
        </div>
        <div class="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:ps-10">
            <div class="flex flex-col w-full md:w-2/3">
                <h2 class="mt-5 text-center text-2xl font-bold text-gray-900">Sign Up</h2>

                <form
                    @submit.prevent="register"
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
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
                            >Username</label
                        >
                        <input
                            type="username"
                            name="username"
                            id="username"
                            v-model="username"
                            minlength="4"
                            required
                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                    </div>

                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                            >Email address</label
                        >
                        <input
                            type="email"
                            name="email"
                            id="email"
                            v-model="email"
                            required
                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                    </div>

                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                            >Password</label
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
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                            >Confirm password</label
                        >
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            v-model="confirmPassword"
                            required
                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                    </div>

                    <button type="submit" class="w-full lexi-btn">Register</button>
                </form>

                <p class="mt-5 text-center text-gray-900">
                    Already have an account?
                    <RouterLink
                        to="/login"
                        class="ms-1 font-semibold text-blue-600 hover:text-blue-500"
                        >Log In.</RouterLink
                    >
                </p>
            </div>
        </div>
    </section>
</template>
