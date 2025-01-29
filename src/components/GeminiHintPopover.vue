<script setup lang="ts">
import IconBulb from './images/icons/IconBulb.vue'
import IconCloseFill from './images/icons/IconCloseFill.vue'
import ButtonPopover from './ButtonPopover.vue'
</script>
<template>
    <ButtonPopover id="hint" placement="top">
        <template #display>
            <button type="button" class="btn-rounded orange-btn">
                <IconBulb/>
            </button>
        </template>
        <span
            >To interrupt Gemini, you can speak over it or simply click the<IconCloseFill
                class="!h-5 inline mb-1"
            />button.</span
        >
    </ButtonPopover>
</template>
