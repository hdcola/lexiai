<script setup lang="ts">
import ImgRegister from '@/components/images/ImgRegister.vue'
import { useAuthStore } from '@/stores/auth'
import * as Yup from 'yup'
import { ref } from 'vue'

const authStore = useAuthStore()

const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const successMessage = ref<string>('')
// validation errors
const errors = ref<Record<string, string>>({})

const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')

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

function handleChange(event: Event) {
    const el = event.target as HTMLInputElement
    errors.value[el.name] = ''
}

function resetState() {
    errorMessage.value = ''
    successMessage.value = ''
    errors.value = {}
}

const onSubmit = async () => {
    resetState()
    isLoading.value = true
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
        successMessage.value = 'Registration successful. Please log in.'
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            error.inner.forEach((err) => {
                errors.value[err.path as string] = err.message
            })
        } else if (typeof error === 'string') {
            errorMessage.value = error
        } else {
            console.error(error)
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
                    :validation-schema="schema"
                    class="space-y-8 mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
                >
                    <div v-if="errorMessage" role="alert" aria-live="polite" class="error-msg">
                        {{ errorMessage }}
                    </div>
                    <div v-if="successMessage" role="alert" aria-live="polite" class="success-msg">
                        {{ successMessage }}
                    </div>

                    <div class="form-group">
                        <label for="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            v-model="username"
                            v-on:change="handleChange"
                            :class="{ error: errors.username }"
                        />
                        <p>{{ errors.username }}</p>
                    </div>

                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            v-model="email"
                            v-on:change="handleChange"
                            :class="{ error: errors.email }"
                        />
                        <p>{{ errors.email }}</p>
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            v-model="password"
                            v-on:change="handleChange"
                            :class="{ error: errors.password }"
                        />
                        <p>{{ errors.password }}</p>
                    </div>

                    <div class="form-group">
                        <label for="password">Confirm password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            v-model="confirmPassword"
                            v-on:change="handleChange"
                            :class="{ error: errors.confirmPassword }"
                        />
                        <p>{{ errors.confirmPassword }}</p>
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
