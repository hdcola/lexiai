<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import * as Yup from 'yup'

const userStore = useUserStore()

const errorMessage = ref<string>('')
const successMessage = ref<string>('')
// validation errors
const errors = ref<Record<string, string>>({})

const username = ref<string>('')
const newUsername = ref<string>('')
const email = ref<string>('')
const newEmail = ref<string>('')

const schema = Yup.object().shape({
    username: Yup.string()
        .min(4, 'Username must be at least 4 characters long')
        .max(50, 'Username is too long'),
    email: Yup.string().email('Invalid email format').max(360, 'Email is too long'),
})

function handleChange(event: Event) {
    const el = event.target as HTMLInputElement
    errors.value[el.name] = ''
}

const onSubmit = async () => {
    errorMessage.value = ''
    successMessage.value = ''

    try {
        await schema.validate(
            { username: newUsername.value, email: newEmail.value },
            { abortEarly: false },
        )

        const sanitizedUsername = (
            newUsername.value !== '' ? newUsername.value : username.value
        ).trim()
        const sanitizedEmail = (newEmail.value !== '' ? newEmail.value : email.value).trim()

        await userStore.saveProfileSettings(sanitizedUsername, sanitizedEmail)

        successMessage.value = 'Successfully saved'
        email.value = sanitizedEmail
        username.value = sanitizedUsername
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            error.inner.forEach((err) => {
                errors.value[err.path as string] = err.message
            })
        } else {
            // TODO: Implement proper error
            errorMessage.value = 'Something went wrong.'
        }
    }
}

onMounted(() => {
    const settings = userStore.getProfileSettings()

    username.value = settings.username
    email.value = settings.email
})
</script>

<template>
    <form
        @submit.prevent="onSubmit"
        :validation-schema="schema"
        class="space-y-8 sm:mx-auto sm:w-full sm:max-w-sm"
    >
        <div v-if="errorMessage" role="alert" class="error-msg">
            {{ errorMessage }}
        </div>
        <div v-if="successMessage" role="alert" class="success-msg">
            {{ successMessage }}
        </div>
        <div class="form-group">
            <div class="relative mb-2">
                <label for="username">Your username</label>
                <div class="relative mb-4">
                    <div
                        class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
                    >
                        <svg
                            class="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="username"
                        class="with-label"
                        v-model="username"
                        disabled
                    />
                </div>
            </div>
            <div class="form-group">
                <label for="newUsername">Change username</label>
                <input
                    type="text"
                    name="newUsername"
                    id="newUsername"
                    v-model="newUsername"
                    v-on:change="handleChange"
                    :class="{ error: errors.username }"
                />
                <p>{{ errors.username }}</p>
            </div>
        </div>
        <div class="form-group">
            <label for="email">Your email</label>
            <div class="relative mb-4">
                <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
                >
                    <svg
                        class="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                    >
                        <path
                            d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
                        />
                        <path
                            d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
                        />
                    </svg>
                </div>
                <input type="email" id="email" class="with-label" v-model="email" disabled />
            </div>
            <div class="form-group">
                <label for="newEmail">Change email</label>
                <input
                    type="email"
                    name="newEmail"
                    id="newEmail"
                    v-model="newEmail"
                    v-on:change="handleChange"
                    autocomplete="email"
                    :class="{ error: errors.email }"
                />
                <p>{{ errors.email }}</p>
            </div>
        </div>

        <button type="submit" class="w-full lexi-btn">Save</button>
    </form>
</template>

<style scoped></style>
