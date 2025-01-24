<script setup lang="ts">
const props = defineProps({
    label: {
        type: String,
        default: 'Button',
    },
    isOutline: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <button class="text-white">
        <span>
            <slot>{{ props.label }}</slot>
        </span>
    </button>
</template>

<style scoped>
button {
    @apply px-5 py-2  rounded-md;
    background-color: #161a20;
    border: none;
    position: relative;
}

button::after {
    @apply rounded-md;
    content: '';
    position: absolute;
    inset: 0;
    margin: -0.2rem;
    background-image: var(--gradient-purple);
    z-index: -1;
}

button:hover {
    z-index: 0;
    box-shadow:
        40px 0 100px #008cff,
        -40px 0 100px #e100ff;
}
</style>
