<script setup lang="ts">
import { ref } from 'vue'
import * as Yup from 'yup'
import { IconPlay, IconClose } from '@/components/images/icons'
import type { ITopic } from '../GeminiSelection.vue'
import { useServerRequest } from '@/assets/composables/useServerRequest'

let MODE: 'add' | 'edit' = 'add'
const emit = defineEmits(['selection'])

const errorMessage = ref<string>('')
const successMessage = ref<string>('')
// validation errors
const errors = ref<Record<string, string>>({})

const topic = ref<ITopic>({} as ITopic)

const schema = Yup.object().shape({
    topic: Yup.string().required('Please enter a topic name'),
    role: Yup.string().required('Please enter the role AI should take'),
})

function onActivated() {
    // Nothing to do yet...
    console.log('activated custom')
}

function edit(currentTopic: ITopic) {
    // populate the form so it can be edited
    MODE = 'edit'
    topic.value = currentTopic
}

async function handlePlay() {
    // Emit to Gemini the full selection
    try {
        await schema.validate(
            { topic: topic.value.title, role: topic.value.systemPrompt },
            { abortEarly: false },
        )
        emit('selection', {
            topic: topic.value,
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
    errorMessage.value = ''
    successMessage.value = ''

    try {
        await schema.validate(
            { topic: topic.value.title, role: topic.value.systemPrompt },
            { abortEarly: false },
        )
        // Save to server
        const method = MODE === 'add' ? 'post' : 'put'
        const url = MODE === 'add' ? '/api/topics' : `/api/topics/${topic.value.id}`
        const response = await useServerRequest(method, url, {
            title: topic.value.title,
            description: topic.value.description,
            level: 'Custom',
            systemPrompt: topic.value.systemPrompt,
            start: topic.value.start,
        })
        successMessage.value = `Successfully ${MODE === 'add' ? 'added' : 'edited'}`
        //console.log(response)
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            error.inner.forEach((err) => {
                errors.value[err.path as string] = err.message
            })
        } else {
            errorMessage.value = 'Something went wrong'
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
    <div class="h-full">
        <form @submit.prevent="onSubmit" class="flex flex-col h-full space-y-4">
            <div class="overflow-y-auto space-y-4 px-4">
                <div class="form-group">
                    <label for="topic">Topic name</label>
                    <input
                        type="text"
                        name="topic"
                        id="topic"
                        v-model="topic.title"
                        autocomplete="off"
                        placeholder="Banking"
                        v-on:change="handleChange"
                        :class="{ error: errors.topic }"
                    />
                    <p>{{ errors.topic }}</p>
                </div>

                <div class="form-group">
                    <label for="description">Description <em>-optional</em></label>
                    <textarea
                        name="description"
                        id="description"
                        class="w-full rounded-lg min-h-11 max-h-28"
                        v-model="topic.description"
                        placeholder="Learn how to open a bank account."
                        v-on:change="handleChange"
                    ></textarea>
                </div>

                <div class="form-group">
                    <label for="description">AI Role</label>
                    <textarea
                        name="role"
                        id="role"
                        class="w-full rounded-lg min-h-11 max-h-28"
                        v-model="topic.systemPrompt"
                        placeholder="You are a bank teller that will assist with bank counter operations."
                        :class="{ error: errors.role }"
                    ></textarea>
                    <p>{{ errors.role }}</p>
                </div>

                <div class="form-group">
                    <label for="start">Starting phrase <em>-optional</em></label>
                    <input
                        type="text"
                        name="start"
                        id="start"
                        v-model="topic.start"
                        autocomplete="off"
                        placeholder="Welcome, is there anything I can help you with today?"
                    />
                </div>
            </div>

            <div class="px-4 space-y-4">
                <div class="flex gap-2">
                    <button type="submit" class="flex-grow lexi-btn">
                        {{ MODE === 'add' ? 'Save' : 'Edit' }}
                    </button>
                    <button
                        type="button"
                        class="inline-flex items-center orange-btn"
                        @click="handlePlay()"
                    >
                        <IconPlay class="-ms-2 me-2" />Try it
                    </button>
                    <button
                        v-if="MODE === 'add'"
                        type="reset"
                        class="inline-flex items-center purple-btn text-white !px-3"
                    >
                        <IconClose />
                    </button>
                </div>
                <div v-if="errorMessage" role="alert" aria-live="polite" class="error-msg">
                    {{ errorMessage }}
                </div>
                <div v-if="successMessage" role="alert" aria-live="polite" class="success-msg">
                    {{ successMessage }}
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.overflow-y-auto {
    scrollbar-color: #c3ddfd transparent;
}
</style>
