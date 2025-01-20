<script setup lang="ts">
import ImgRegister from '@/components/images/ImgRegister.vue'
import { useAuthStore } from '@/stores/auth'
import * as Yup from 'yup'
import { ref } from 'vue'

const authStore = useAuthStore()

const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
authStore.errorMessage = ''
authStore.successMessage = ''

// validation errors
const errors = ref<Record<string, string>>({})

const schema = Yup.object({
    username: Yup.string()
        .required('Username is required')
        .min(4, 'Username must be at least 4 characters long')
        .max(50, 'Username is too long'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .max(360, 'Email is too long'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Password must match')
        .required('Confirm password is required'),
})

const isLoading = ref(false)

// clear error if input changes
const clearError = (field: string) => {
    if (errors.value[field]) {
        delete errors.value[field]
    }
}

const onSubmit = async () => {
    isLoading.value = true
    errors.value = {} // Reset errors

    try {
        await schema.validate(
            {
                username: username.value,
                email: email.value,
                password: password.value,
                confirmPassword: confirmPassword.value,
            },
            { abortEarly: false },
        )
        await authStore.register(username.value, email.value, password.value)
    } catch (validationError) {
        if (validationError instanceof Yup.ValidationError) {
            validationError.inner.forEach((err) => {
                if (err.path && err.message) {
                    errors.value[err.path] = err.message
                }
            })
        }
    } finally {
        isLoading.value = false
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
                    @submit.prevent="onSubmit"
                    class="space-y-8 mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
                >
                    <!-- Success and Error Messages -->
                    <div
                        v-if="authStore.errorMessage"
                        role="alert"
                        class="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
                        aria-live="polite"
                    >
                        {{ authStore.errorMessage }}
                    </div>
                    <div
                        v-if="authStore.successMessage"
                        role="alert"
                        class="bg-green-50 border-green-400 text-green-700 px-4 py-3 rounded relative text-center"
                        aria-live="polite"
                    >
                        {{ authStore.successMessage }}
                    </div>
                    <div class="form-group">
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
                            >Username</label
                        >
                        <input
                            type="username"
                            name="username"
                            id="username"
                            v-model="username"
                            @input="clearError('username')"
                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                        <div v-if="errors.username" class="text-red-500 text-sm mt-1">
                            {{ errors.username }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                            >Email address</label
                        >
                        <input
                            type="email"
                            name="email"
                            id="email"
                            v-model="email"
                            @input="clearError('email')"
                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                        <div v-if="errors.email" class="text-red-500 text-sm mt-1">
                            {{ errors.email }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                            >Password</label
                        >
                        <input
                            type="password"
                            name="password"
                            id="password"
                            v-model="password"
                            @input="clearError('password')"
                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                        <div v-if="errors.password" class="text-red-500 text-sm mt-1">
                            {{ errors.password }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                            >Confirm password</label
                        >
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            v-model="confirmPassword"
                            @input="clearError('confirmPassword')"
                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                        <div v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">
                            {{ errors.confirmPassword }}
                        </div>
                    </div>

                    <button :disabled="isLoading" class="w-full lexi-btn">
                        <span v-if="isLoading">Loading...</span>
                        <span v-else>Register</span>
                    </button>
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
