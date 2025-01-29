<script setup lang="ts">
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import IconMessage from './images/icons/IconMessage.vue'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite()
})
</script>
<template>
    <div id="alert-dismissible" class="flex p-4 mb-4 bg-orange-100 rounded-lg" role="alert">
        <span class="sr-only">Info</span>
        <div class="ms-3 text-sm font-medium">
            <div class="inline-flex items-center justify-center text-gray-600">
                <IconMessage class="w-10" />
                <span class="font-bold ms-2">Want to try something new?</span>
            </div>
            <p>Simply pick another topic or change the level on the left-hand side.</p>
            <p>You can start learning a new language or change the style of conversation.</p>
        </div>
        <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-orange-100 rounded-lg focus:ring-2 focus:ring-bg-orange-400 p-1.5 hover:bg-orange-200 inline-flex items-center justify-center h-8 w-8"
            data-dismiss-target="#alert-dismissible"
            aria-label="Close"
        >
            <span class="sr-only">Close</span>
            <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
            </svg>
        </button>
    </div>
</template>
