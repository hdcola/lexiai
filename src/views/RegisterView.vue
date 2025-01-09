<script setup lang="ts">
import { ref } from 'vue'
/* import axios from 'axios';
import { useRouter } from 'vue-router' */

/* const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>(''); */
const errorMessage = ref<string>('')
const successMessage = ref<string>('')
/* const router = useRouter()
 */
/* const apiPORT = import.meta.env.VITE_PORT; */

    /* 
    const register = async () => {
    errorMessage.value = ''
    successMessage.value = ''

  if (!username || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'All fields are required.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }

    try {
      const response = await axios.post(`http://localhost:${apiPORT}/api/register`, {
      username: username.value,
      email: email.value,
      password: password.value,
    }); 

    console.log('Registration successful:', response.data);

        successMessage.value = 'Registration successful. Please log in.'
        setTimeout(() => router.push('/login'), 2000) // Redirect after 3 seconds
    } catch (error) {
        console.log('Registration error:', error)
         errorMessage.value = error.response?.data?.error || 'Registration failed. Please try again.'; 
    }
}*/
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Register</h2>

            <!-- Flash Messages -->
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
            <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>

            <!-- @submit.prevent="register" --> 
            <form class="space-y-4">
                <div>
                    <label for="username" class="block text-gray-600 mb-1">Username</label>

                    <!-- v-model="username" -->
                    <input
                        type="username"
                        id="username"
                        placeholder="Enter your username"
                        class="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                <!-- v-model="email" -->
                <div>
                    <label for="email" class="block text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        class="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                <!-- v-model="password" -->
                <div>
                    <label for="password" class="block text-gray-600 mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        class="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                <!-- v-model="confirmPassword" -->
                <div>
                    <label for="confirmPassword" class="block text-gray-600 mb-1"
                        >Confirm Password</label
                    >
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        class="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                <button type="submit" class="w-full bg-blue-500 text-white rounded-md py-2">
                    Register
                </button>
            </form>

            <p class="mt-4">
                Already have an account?
                <RouterLink to="/login" class="text-purple-600 ms-3">Login</RouterLink>
            </p>
        </div>
    </div>
</template>
