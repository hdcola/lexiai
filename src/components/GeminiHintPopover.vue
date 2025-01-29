<script setup lang="ts">
import {initPopovers} from 'flowbite'
import { onMounted } from 'vue';
import IconBulb from './images/icons/IconBulb.vue';
import IconCloseFill from './images/icons/IconCloseFill.vue'

onMounted(() => {initPopovers();})
</script>
<template>
    <button
        data-popover-target="popover-default"
        type="button"
        class="orange-btn-rounded rounded-full"
    >
    <!-- bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-orange-800 -->
    <IconBulb class="text-gray-600"/>
    </button>

    <div
        data-popover
        id="popover-default"
        role="tooltip"
        class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 shadow-lg"
    >
        <!-- <div
            class="px-3 py-2 bg-orange-100 border-b border-orange-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
        >
            <h3 class="font-semibold text-orange-900 dark:text-white">Hint</h3>
        </div> -->
        <div class="p-3">
            
            <div class="inline-flex items-center justify-center text-gray-600 gap-2">
                <IconCloseFill class="w-14"/>
                <span>To interrupt Gemini, you can speak over it or simply click the red x button</span>
            </div>
            

        </div>
        <div data-popper-arrow></div>
    </div>
</template>
