<script setup lang="ts">
import ImgLogin from '@/components/images/ImgLogin.vue'
import { useAuthStore } from '@/stores/auth'
import * as Yup from 'yup'
import { ref } from 'vue'

const authStore = useAuthStore()

const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const successMessage = ref<string>('')
// validation errors
const errors = ref<Record<string, string>>({})

const email = ref<string>('')
const password = ref<string>('')

const schema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .max(360, 'Email is too long'),
    password: Yup.string().required('Password is required'),
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
            { email: email.value, password: password.value },
            { abortEarly: false },
        )
        await authStore.login(email.value, password.value)
        successMessage.value = 'Login successful'
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
                <ImgLogin />
            </div>
        </div>
        <div class="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:ps-10">
            <div class="flex flex-col w-full md:w-2/3">
                <h2 class="text-center text-2xl font-bold text-gray-900">Log into your account</h2>

                <!-- Login Form -->
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
                        <label for="email">Your email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autocomplete="email"
                            v-model="email"
                            v-on:change="handleChange"
                            :class="{ error: errors.email }"
                        />
                        <p>{{ errors.email }}</p>
                    </div>
                    <div class="form-group">
                        <label for="password">Your password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autocomplete="current-password"
                            v-model="password"
                            v-on:change="handleChange"
                            :class="{ error: errors.password }"
                        />
                        <p>{{ errors.password }}</p>
                    </div>
                    <button :disabled="isLoading" class="w-full btn lexi-btn">
                        <span v-if="isLoading">Loading...</span>
                        <span v-else>Login</span>
                    </button>
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
