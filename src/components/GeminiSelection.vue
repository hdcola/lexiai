<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import { IconEdit, IconHeartFull, IconSwatchbook } from '@/components/images/icons'
import { SelectionTopics, SelectionFavorites, SelectionCustom } from '@/components/selection'
import { useUserStore } from '@/stores/user'
import { initTabs, Tabs } from 'flowbite'
import type { TabsOptions, TabsInterface, TabItem, InstanceOptions } from 'flowbite'
import { useServerRequest } from '@/assets/composables/useServerRequest'

const userStore = useUserStore()

// types needed to convert string id to ObjectId(id)
export type ILanguage = {
    _id: string
    name: string
}

export type IStyle = {
    _id: string
    name: string
    description?: string
}

export type ITopic = {
    id: string
    _id: { $oid: string }
    title: string
    description: string
    level: string
    system_prompt: string
    start: string
    created_at: string
    user_id: { $oid: string }
    isSelected?: boolean
    isFavorite?: boolean
    canEdit?: boolean
}
const emit = defineEmits(['selection'])

let tabs: TabsInterface
const selectedTab = ref<TabItem>()
const refs: Record<string, any> = {
    topics: useTemplateRef('topics'),
    favorites: useTemplateRef('favorites'),
    custom: useTemplateRef('custom'),
}

watch(selectedTab, async (newTab) => {
    if (newTab) {
        const component = refs[newTab.id].value
        if (component) {
            await component.onActivated()
        }
    }
})

const languages = ref<ILanguage[]>([])
const styles = ref<IStyle[]>([])

// to read from MongoDb for logged user
const selectedLanguage = ref<string>('678557da79bc79eeab784fe4')
const selectedStyle = ref<string>('6785601479bc79eeab784ffe')

function handleLanguageChange() {
    userStore.saveLanguage(selectedLanguage.value, selectedStyle.value)
}

function handleEdit(topic: ITopic) {
    refs.custom.value.edit(topic)
    tabs.show('custom')
}

async function fetchOptions() {
    try {
        const [languagesResponse, stylesResponse] = await Promise.all([
            useServerRequest('get', '/api/languages'),
            useServerRequest('get', '/api/styles'),
        ])

        languages.value = languagesResponse?.data.map(
            (lang: { _id: { $oid: string }; name: string }) => ({
                _id: lang._id.$oid, //extract $oid as _id
                name: lang.name,
            }),
        )

        styles.value = stylesResponse?.data.map(
            (st: { _id: { $oid: string }; name: string; description: string }) => ({
                _id: st._id.$oid, // extract $oid as _id
                name: st.name,
                description: st.description,
            }),
        )
    } catch (error) {
        console.error('Error fetching options:', error)
    }
}

onMounted(async () => {
    initTabs()
    await fetchOptions()
    const languageSettings = userStore.getLanguageSettings()
    if (languageSettings.language_id) {
        selectedLanguage.value = languageSettings.language_id
    }
    if (languageSettings.style_id) {
        selectedStyle.value = languageSettings.style_id
    }

    const tabsElement: HTMLElement = document.getElementById('default-styled-tab')!

    // create an array of objects with the id, trigger element (eg. button), and the content element
    const tabElements: TabItem[] = [
        {
            id: 'topics',
            triggerEl: document.querySelector('#topics-styled-tab')!,
            targetEl: document.querySelector('#styled-topics')!,
        },
        {
            id: 'favorites',
            triggerEl: document.querySelector('#favorites-styled-tab')!,
            targetEl: document.querySelector('#styled-favorites')!,
        },
        {
            id: 'custom',
            triggerEl: document.querySelector('#custom-styled-tab')!,
            targetEl: document.querySelector('#styled-custom')!,
        },
    ]

    // options with default values
    const options: TabsOptions = {
        defaultTabId: 'topics',
        activeClasses:
            'text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500',
        inactiveClasses:
            'dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
        onShow: (tabs: TabsInterface, tab: TabItem) => {
            selectedTab.value = tab
        },
    }

    // instance options with default values
    const instanceOptions: InstanceOptions = {
        id: 'default-styled-tab',
        override: true,
    }

    /*
     * tabsElement: parent element of the tabs component (required)
     * tabElements: array of tab elements (required)
     * options (optional)
     * instanceOptions (optional)
     */
    tabs = new Tabs(tabsElement, tabElements, options, instanceOptions)

    tabs.show('topics')
})

function handlePlay(selection: { topic: ITopic; level: string }) {
    const language = languages.value.find((l) => l._id === selectedLanguage.value)
    const style = styles.value.find((s) => s._id === selectedStyle.value)

    emit('selection', {
        language: language?.name,
        style: style?.description,
        topic: selection.topic,
        level: selection.level,
    })
}
</script>

<template>
    <div class="flex flex-col flex-1">
        <div class="flex flex-col h-full">
            <div class="border-b flex justify-center">
                <ul
                    class="flex flex-wrap -mb-px pt-4 text-sm font-medium text-center gap-2"
                    id="default-styled-tab"
                    data-tabs-toggle="#default-styled-tab-content"
                    role="tablist"
                >
                    <li role="presentation">
                        <button
                            id="topics-styled-tab"
                            data-tabs-target="#styled-topics"
                            type="button"
                            role="tab"
                            aria-controls="topics"
                            aria-selected="false"
                        >
                            <IconSwatchbook class="icon" />
                            Topics
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            id="favorites-styled-tab"
                            data-tabs-target="#styled-favorites"
                            type="button"
                            role="tab"
                            aria-controls="favorites"
                            aria-selected="false"
                        >
                            <IconHeartFull class="icon" />
                            Favorites
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            id="custom-styled-tab"
                            data-tabs-target="#styled-custom"
                            type="button"
                            role="tab"
                            aria-controls="custom"
                            aria-selected="false"
                        >
                            <IconEdit class="icon" />
                            Custom
                        </button>
                    </li>
                </ul>
            </div>
            <div id="default-styled-tab-content" class="flex flex-col flex-1 min-h-0">
                <div
                    class="rounded-lg flex flex-col h-full py-3"
                    id="styled-topics"
                    role="tabpanel"
                    aria-labelledby="topics-tab"
                >
                    <SelectionTopics @selection="handlePlay" @edit="handleEdit" ref="topics" />
                </div>
                <div
                    class="rounded-lg flex flex-col h-full py-3"
                    id="styled-favorites"
                    role="tabpanel"
                    aria-labelledby="favorites-tab"
                >
                    <SelectionFavorites
                        @selection="handlePlay"
                        @edit="handleEdit"
                        ref="favorites"
                    />
                </div>
                <div
                    class="rounded-lg flex flex-col h-full py-3"
                    id="styled-custom"
                    role="tabpanel"
                    aria-labelledby="custom-tab"
                >
                    <SelectionCustom @selection="handlePlay" ref="custom" />
                </div>
            </div>

            <div class="flex flex-row justify-center items-center px-4 py-3 gap-2">
                <!-- Language Selection -->
                <select v-model="selectedLanguage" @change="handleLanguageChange">
                    <option disabled>Select a language</option>
                    <option v-for="lang in languages" :key="lang._id" :value="lang._id">
                        {{ lang.name }}
                    </option>
                </select>

                <select v-model="selectedStyle" @change="handleLanguageChange">
                    <option disabled>Select a style</option>
                    <option v-for="style in styles" :key="style._id" :value="style._id">
                        {{ style.name }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>
button[role='tab'] {
    @apply inline-flex items-center p-4 border-b-2 rounded-t-lg;
}

.icon {
    @apply me-2 md:hidden lg:block;
}
</style>
