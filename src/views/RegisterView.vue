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
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                class="mx-auto h-14 w-auto"
                src="../assets/img/small-logo-image.png"
                alt="Lexi AI"
            />
            <h2 class="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Register
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            
            <!-- Flash Messages -->
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
            <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>

            <!-- @submit.prevent="register" -->
            <form class="space-y-4">
                <div>
                    <label for="username" class="block text-sm/6 font-medium text-gray-900"
                        >Username</label
                    >
                    <div class="mt-2">
                        <input
                            type="username"
                            name="username"
                            id="username"
                            required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900"
                        >Email address</label
                    >
                    <div class="mt-2">
                        <input
                            type="email"
                            name="email"
                            id="email"
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
                            required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900"
                            >Confirm Password</label
                        >
                    </div>
                    <div class="mt-2">
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    
                    <button
                        type="submit"
                        class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                    Register
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account?
                <RouterLink to="/login" class="ms-3 font-semibold text-blue-600 hover:text-blue-500"
                    >Login</RouterLink>
            </p>
        </div>
    </div>


</template>
