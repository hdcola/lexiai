<script setup lang="ts">
import IconCloseFill from './images/icons/IconCloseFill.vue'
import IconHeadset from './images/icons/IconHeadset.vue'
</script>
<template>
    <!-- "hint" section -->
    <div
        class="fixed bottom-4 right-4 w-64 p-4 bg-white shadow-lg rounded-2xl border border-gray-200"
    >
        <div class="flex items-center">
            <IconHeadset />

            <h3 class="text-lg font-semibold text-gray-800 flex items-center ms-3">Hint</h3>
        </div>
        <p class="text-sm text-gray-600 mt-2"></p>
        <h4 class="font-bold">Need a break?</h4>
        <div class="flex flex-col ...">
            <p>To stop Gemini anytime, click the red stop button</p>

            <p class="flex justify-center">
                <IconCloseFill />
            </p>
            <small>(button appears when Gemini speaks)</small>
        </div>
    </div>
</template>
