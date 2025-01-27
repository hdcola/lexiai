<script setup lang="ts">
import { ref } from 'vue'
import * as Yup from 'yup'
import { IconPlay, IconClose } from '@/components/images/icons'
import type { ITopic } from '../GeminiSelection.vue'
import { useServerRequest } from '@/assets/composables/useServerRequest';

const emit = defineEmits(['selection'])

// validation errors
const errors = ref<Record<string, string>>({})

const topic = ref<string>('')
const description = ref<string>('')
const role = ref<string>('')
const start = ref<string>('')

const schema = Yup.object().shape({
    topic: Yup.string().required('Please enter a topic name'),
    description: Yup.string().required('Please enter a description'),
})

function onActivated() {
    // Nothing to do yet...
}

function edit(currentTopic: ITopic) {
    // populate the form so it can be edited
    topic.value = currentTopic.title
    description.value = currentTopic.description || ''
    role.value = currentTopic.systemPrompt || ''
    start.value = currentTopic.start || ''
}

async function handlePlay() {
    // Emit to Gemini the full selection
    try {
        await schema.validate(
            { topic: topic.value, description: description.value },
            { abortEarly: false },
        )
        emit('selection', {
            topic: description.value,
        })
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            error.inner.forEach((err) => {
                errors.value[err.path as string] = err.message
            })
        } else {
            console.error(error)
        }
    }
}

function handleChange(event: Event) {
    const el = event.target as HTMLInputElement
    errors.value[el.name] = ''
}

const onSubmit = async () => {
    errors.value = {}
    // level custom
    // systemPrompt role
    // Save to server
    try {
        await schema.validate(
            { topic: topic.value, description: description.value },
            { abortEarly: false },
        )
        // Save to server
        const response = await useServerRequest('post', '/api/topics',  {
                title: topic.value,
                description: description.value,
                level: 'Custom',
                systemPrompt: role.value,
                start: start.value,
            });

    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            error.inner.forEach((err) => {
                errors.value[err.path as string] = err.message
            })
        } else {
            console.error(error)
        }
    }
}

defineExpose({
    onActivated,
    edit,
})
</script>

<template>
    <div class="flex-1 overflow-y-auto px-4">
        <form @submit.prevent="onSubmit" class="space-y-4">
            <div class="form-group">
                <label for="topic">Topic name</label>
                <input
                    type="text"
                    name="topic"
                    id="topic"
                    v-model="topic"
                    autocomplete="off"
                    placeholder="Banking"
                    v-on:change="handleChange"
                    :class="{ error: errors.topic }"
                />
                <p>{{ errors.topic }}</p>
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    class="w-full rounded-lg h-28 max-h-28"
                    v-model="description"
                    placeholder="Learn how to open a bank account."
                    v-on:change="handleChange"
                    :class="{ error: errors.description }"
                ></textarea>
                <p>{{ errors.description }}</p>
            </div>

            <div class="form-group">
                <label for="description">AI Role <em>-optional</em></label>
                <textarea
                    name="role"
                    id="role"
                    class="w-full rounded-lg h-28 max-h-28"
                    v-model="role"
                    placeholder="You are a bank teller that will assist with bank counter operations."
                ></textarea>
            </div>

            <div class="form-group">
                <label for="start">Starting phrase <em>-optional</em></label>
                <input
                    type="text"
                    name="start"
                    id="start"
                    v-model="start"
                    autocomplete="off"
                    placeholder="Welcome, is there anything I can help you with today?"
                />
            </div>

            <div class="flex gap-2">
                <button type="submit" class="flex-grow lexi-btn">Save</button>
                <button
                    type="button"
                    class="inline-flex items-center orange-btn"
                    @click="handlePlay()"
                >
                    <IconPlay class="-ms-2 me-2" />Try it
                </button>
                <button type="reset" class="inline-flex items-center purple-btn text-white !px-3">
                    <IconClose />
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.overflow-y-auto {
    scrollbar-color: #c3ddfd transparent;
}
</style>
