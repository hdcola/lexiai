<script setup lang="ts">
import ImgLogin from '@/components/images/ImgLogin.vue';
import { useAuthStore } from '@/stores/auth';
import * as Yup from 'yup';
import { ref } from 'vue';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');

// validation errors
const errors = ref<Record<string, string>>({});

const schema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .max(360, 'Email is too long'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

const isLoading = ref(false);

const onSubmit = async () => {
  isLoading.value = true;
  try {
    await schema.validate({ email: email.value, password: password.value }, { abortEarly: false });
    await authStore.login(email.value, password.value);
  } catch (validationError) {
    if (validationError instanceof Yup.ValidationError) {
      validationError.inner.forEach((err) => {
        if (err.path && err.message) {
          errors.value[err.path] = err.message; 
        }
      });
    }
  } finally {
    isLoading.value = false;
  }
};

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
          <form @submit.prevent="onSubmit" class="space-y-8 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input
                v-model="email"
                type="email"
                id="email"
                autocomplete="email"
                
                class="form-control block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2"
              />
              <div v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</div>
            </div>
            <div class="form-group">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input
                v-model="password"
                type="password"
                id="password"
                autocomplete="current-password"
                class="form-control block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2"
              />
              <div v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</div>
            </div>
            <button
              :disabled="isLoading"
              class="w-full lexi-btn"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-else>Login</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  </template>
  