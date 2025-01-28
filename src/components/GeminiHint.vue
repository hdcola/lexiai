<script setup lang="ts">
import IconBulb from './images/icons/IconBulb.vue';
import IconCloseFill from './images/icons/IconCloseFill.vue'
</script>
<template>
    <!-- "hint" section -->
    <div
        class="fixed bottom-4 right-4 w-64 p-4 bg-gray-50 rounded-lg shadow-lg text-gray-600"
    >
        <div class="flex items-center">
            <IconBulb />

            <h3 class="text-lg font-semibold flex items-center ms-3">Hint</h3>
        </div>
        <p class="text-sm mt-2"></p>
        <h4 class="font-bold">Need a break?</h4>
        <div class="flex flex-col">
            <p>To stop Gemini anytime, click the red stop button</p>

            <p class="flex justify-center">
                <IconCloseFill />
            </p>
            <small>(button appears when Gemini speaks)</small>
        </div>
    </div>
</template>
