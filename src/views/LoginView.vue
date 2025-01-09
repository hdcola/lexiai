<script setup lang="ts">
import { ref } from 'vue'
// import axios from 'axios';
const email = ref<string>('')
const password = ref<string>('')
const errorMessage = ref<string>('')
console.log(import.meta.env)
const apiPORT = import.meta.env.VITE_PORT
console.log('apiPORT:', apiPORT)
const login = async () => {
    errorMessage.value = '' // clear previous errors
    if (!email.value || !password.value) {
        errorMessage.value = 'Email and password are required.'
        return
    }
    try {
        /* const response = await axios.post(`http://localhost:${apiPORT}/api/login`, {
      email: email.value,
      password: password.value,
    });
	@@ -33,54 +33,50 @@ const login = async () => {
      // Optionally redirect to home
      window.location.href = '/';
    } */
    } catch (error) {
        console.log('Login error:', error)
        /* errorMessage.value = error.response?.data?.error || 'Login failed. Please try again.';*/
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Login</h2>
            <form @submit.prevent="login" class="space-y-4">
                <div>
                    <label for="email" class="block text-gray-600 mb-1">Email</label>

                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label for="password" class="block text-gray-600 mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter your password"
                    />
                </div>
                <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
                <button
                    type="submit"
                    class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Login
                </button>
            </form>
            <p class="my-8"></p>
            <span>Don't have account, </span>
            <RouterLink to="/register" class="text-blue-600 ms-3">Register</RouterLink>
        </div>
    </div>
</template>