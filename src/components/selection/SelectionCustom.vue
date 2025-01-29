<script setup lang="ts">
import { ref } from 'vue'
import * as Yup from 'yup'
import { IconPlay, IconClose, IconUndo } from '@/components/images/icons'
import type { ITopic } from '../GeminiSelection.vue'
import { useServerRequest } from '@/assets/composables/useServerRequest'
import ButtonPopover from '../ButtonPopover.vue'
import ButtonHelp from '../ButtonHelp.vue'

let MODE: 'add' | 'edit' = 'add'
const emit = defineEmits(['selection'])

const errorMessage = ref<string>('')
const successMessage = ref<string>('')
// validation errors
const errors = ref<Record<string, string>>({})

const selectedTopic = ref<ITopic>({} as ITopic)
const topic = ref<ITopic>({} as ITopic)

const schema = Yup.object().shape({
    topic: Yup.string().required('Please enter a topic name'),
    role: Yup.string().required('Please enter the role AI should take'),
})

function onActivated() {
    resetState()
}

function edit(currentTopic: ITopic) {
    // populate the form so it can be edited
    MODE = 'edit'
    topic.value = currentTopic
    selectedTopic.value = { ...currentTopic }
}

async function handlePlay() {
    // Emit to Gemini the full selection
    try {
        await schema.validate(
            { topic: topic.value.title, role: topic.value.system_prompt },
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

function handleReset() {
    if (MODE === 'edit') {
        resetState()
        topic.value = { ...selectedTopic.value }
    } else {
        resetState()
        topic.value = {} as ITopic
    }
}

function handleExitEdit() {
    MODE = 'add'
    resetState()
    topic.value = {} as ITopic
    selectedTopic.value = {} as ITopic
}

function resetState() {
    errorMessage.value = ''
    successMessage.value = ''
    errors.value = {}
}

const onSubmit = async () => {
    resetState()

    try {
        await schema.validate(
            { topic: topic.value.title, role: topic.value.system_prompt },
            { abortEarly: false },
        )
        // Save to server
        const method = MODE === 'add' ? 'post' : 'put'
        const url = MODE === 'add' ? '/api/topics' : `/api/topics/${topic.value.id}`
        const response = await useServerRequest(method, url, {
            title: topic.value.title,
            description: topic.value.description,
            level: MODE === 'add' ? 'custom' : topic.value.level,
            system_prompt: topic.value.system_prompt,
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
            <div
                v-if="MODE === 'edit'"
                class="flex relative text-center justify-center items-center border-2 border-orange-400 rounded-full py-3 mx-4"
            >
                <h1 class="text-md text-orange-400">Edit mode</h1>
                <div class="flex items-center gap-2 absolute right-1">
                    <button
                        role="button"
                        type="button"
                        title="Exit edit mode"
                        class="flex justify-center items-center btn-rounded orange-btn"
                        @click="handleExitEdit"
                    >
                        <IconClose />
                    </button>
                </div>
            </div>
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
                    <ButtonPopover id="role" placement="top-start">
                        <template #display>
                            <div class="inline-flex gap-2">
                                <label for="description">AI role</label>
                                <ButtonHelp />
                            </div>
                        </template>
                        <div class="flex flex-col gap-2">
                            <p>
                                If you want AI to take a specific role, start with:
                                <span class="font-bold">Reply as a {role}</span>
                            </p>
                            <p>
                                Enter what you'd like the conversation to be about. A good starter
                                can be: <span class="font-bold">Teach me {topic}</span>
                            </p>
                            <p>
                                You can specify the difficulty of the conversation with keywords
                                like:
                            </p>
                            <ul class="ms-5 list-disc">
                                <li>Take it slowly.</li>
                                <li>Don't tell me what to say.</li>
                            </ul>
                        </div>
                    </ButtonPopover>
                    <textarea
                        name="role"
                        id="role"
                        class="w-full rounded-lg min-h-11 max-h-28"
                        v-model="topic.system_prompt"
                        placeholder="Reply as a bank teller while I practice opening a bank account."
                        :class="{ error: errors.role }"
                    ></textarea>
                    <p>{{ errors.role }}</p>
                </div>

                <div class="form-group">
                    <ButtonPopover id="start" placement="top-start">
                        <template #display>
                            <div class="inline-flex gap-2">
                                <label for="start">Starting phrase <em>-optional</em></label>
                                <ButtonHelp />
                            </div>
                        </template>
                        <p>Make AI start the conversation by saying something specific.</p>
                    </ButtonPopover>
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
                    <button type="submit" class="flex-grow btn lexi-btn">Save</button>
                    <button
                        type="button"
                        class="inline-flex items-center btn orange-btn"
                        @click="handlePlay()"
                    >
                        <IconPlay class="-ms-2 me-2" />Try it
                    </button>
                    <button
                        v-if="MODE === 'add'"
                        type="reset"
                        @click="handleReset"
                        class="inline-flex items-center btn purple-btn text-white !px-3"
                    >
                        <IconClose />
                    </button>
                    <button
                        v-else
                        type="button"
                        title="Undo changes"
                        @click="handleReset"
                        class="inline-flex items-center btn purple-btn text-white !px-3"
                    >
                        <IconUndo class="text-white" />
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
