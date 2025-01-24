<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import * as Yup from 'yup'

const userStore = useUserStore()

const errorMessage = ref<string>('')
const successMessage = ref<string>('')
// validation errors
const errors = ref<Record<string, string>>({})

const password = ref<string>('')
const confirmPassword = ref<string>('')

const schema = Yup.object().shape({
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

function setDefaults() {
    password.value = ''
    confirmPassword.value = ''
}

const onSubmit = async () => {
    errorMessage.value = ''
    successMessage.value = ''

    try {
        await schema.validate(
            { password: password.value, confirmPassword: confirmPassword.value },
            { abortEarly: false },
        )
        await userStore.saveSecuritySettings(password.value)
        successMessage.value = 'Successfully saved'
        setDefaults()
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

defineExpose({
    resetState,
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
            <div class="mb-4">
                <label for="password">New password</label>
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
                <label for="confirm-password">Confirm password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    v-model="confirmPassword"
                    v-on:change="handleChange"
                    :class="{ error: errors.confirmPassword }"
                />
                <p>{{ errors.confirmPassword }}</p>
            </div>
        </div>

        <button type="submit" class="w-full lexi-btn">Save</button>
    </form>
</template>

<style scoped></style>
