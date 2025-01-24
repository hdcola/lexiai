<script setup lang="ts">
import { ref } from 'vue'
import * as Yup from 'yup'

const emit = defineEmits(['selection'])

const topic = ref<string>('')
const description = ref<string>('')

function onActivated() {
    // Nothing to do yet...
}

const onSubmit = () => {
    // Emit to Gemini the full selection
    emit('selection', {
        topic: topic.value,
    })
}

defineExpose({
    onActivated,
})
</script>

<template>
    <div class="flex-1 overflow-y-auto px-4">
        <form @submit.prevent="onSubmit" class="space-y-4">
            <div class="form-group">
                <label for="topic">Topic</label>
                <input type="text" name="topic" id="topic" v-model="topic" autocomplete="off" />
            </div>

            <!--<div class="form-group">
                <label for="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    class="w-full rounded-lg max-h-1/2"
                    v-model="description"
                ></textarea>
            </div>-->

            <button type="submit" class="w-full orange-btn">Play</button>
        </form>
    </div>
</template>

<style scoped>
.overflow-y-auto {
    scrollbar-color: #c3ddfd transparent;
}
</style>
