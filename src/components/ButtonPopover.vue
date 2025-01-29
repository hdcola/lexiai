<script setup lang="ts">
import { initPopovers } from 'flowbite'
import { onMounted, ref } from 'vue'

const props = defineProps<{ id: string; placement: string }>()

onMounted(() => {
    initPopovers()
})
</script>

<template>
    <div :data-popover-target="props.id" :data-popover-placement="props.placement" class="w-fit">
        <slot name="display"></slot>
    </div>

    <div
        data-popover
        :id="props.id"
        role="tooltip"
        class="absolute z-10 invisible inline-block w-72 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 shadow-lg"
    >
        <div class="p-3">
            <div class="inline-flex items-center justify-center text-gray-600 gap-2">
                <slot></slot>
            </div>
        </div>
        <div data-popper-arrow></div>
    </div>
</template>

<style scoped></style>
