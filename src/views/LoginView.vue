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
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                class="mx-auto h-20 w-auto"
                src="../assets/img/small-logo-image.png"
                alt="Lexi AI"
            />
            <h2 class="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Log into your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="login" class="space-y-4">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900"
                        >Email address</label
                    >
                    <div class="mt-2">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900"
                            >Password</label
                        >
                    </div>
                    <div class="mt-2">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autocomplete="current-password"
                            required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    
                <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
                    <button
                        type="submit"
                        class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Sign in
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Don't have account, 
                <RouterLink to="/register" class="ms-3 font-semibold text-blue-600 hover:text-blue-500"
                    >Register</RouterLink>
            </p>
        </div>
    </div>

</template>
