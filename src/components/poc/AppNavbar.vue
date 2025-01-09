<script setup lang="ts">
import { ref } from 'vue'
import IconMD from './icons/IconMD.vue';
import { mdiMenu } from '@mdi/js'
import logo from '@/assets/img/logo-horizontal.png'

const isLoggedIn = ref<boolean>(!!localStorage.getItem('accessToken'));
const logout = () => {
  localStorage.removeItem('accessToken');
  window.location.reload();
  console.log('User logged out');
};

const path = mdiMenu
// Debugging to check mdiMenu path
console.log('mdiMenu path:', path)


// State for toggling the menu
const isMenuOpen = ref<boolean>(false)
</script>

<template>
  <nav class="bg-blue-500" style="margin: 0; padding: 0;">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">

        <!-- Logo -->
        <RouterLink to="/" class="flex items-center">
          <img class="h-8 w-auto" :src="logo" alt="Lexi AI Logo" />
        </RouterLink>

        <!-- Hamburger menu button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none md:hidden overflow-hidden"
        >
          <span class="sr-only">Open main menu</span>
          <IconMD :path="mdiMenu" class="inline-block" width="28px"/>
        </button>


      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-4 items-center">
          <RouterLink to="/" 
            class="text-white px-3 py-2 rounded-md hover:bg-blue-700"   active-class="bg-blue-600">Home</RouterLink>

            <span v-if="!isLoggedIn">
              <RouterLink to="/login" 
              class="text-white px-3 py-2 rounded-md hover:bg-blue-700"   active-class="bg-blue-600">Login</RouterLink>
            </span>
            <span v-else  class="flex space-x-4">
              <button @click="logout"
              class="text-white px-3 py-2 rounded-md hover:bg-blue-700"   active-class="bg-blue-600">Logout</button>

            </span>

        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden bg-blue-500 px-4 space-y-2 pb-4 transition-all text-base">
      <RouterLink to="/" 
      class="block text-white px-3 py-2 rounded-md hover:bg-blue-700"   active-class="bg-blue-600">Home</RouterLink>

           <span v-if="!isLoggedIn">
              <RouterLink to="/login" 
              class="block text-white px-3 py-2 rounded-md hover:bg-blue-700"   active-class="bg-blue-600">Login</RouterLink>
            </span>
            <span v-else>
              <button @click="logout"
              class="block text-white px-3 py-2 rounded-md hover:bg-blue-700"   active-class="bg-blue-600">Logout</button>

            </span>

    </div>

    
  </nav>
</template>