<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import ImgSettings from '@/components/images/ImgSettings.vue'
import { SettingsLexi, SettingsProfile, SettingsSecurity } from '@/components/settings'
import { IconProfileEdit, IconSecurity, IconTools } from '@/components/images/icons'
import { initTabs, Tabs } from 'flowbite'
import type { TabsOptions, TabsInterface, TabItem, InstanceOptions } from 'flowbite'

const selectedTab = ref<TabItem>()
const refs: Record<string, any> = {
    lexi: useTemplateRef('lexi'),
    profile: useTemplateRef('profile'),
    security: useTemplateRef('security'),
}

watch(selectedTab, (newTab, oldTab) => {
    if (oldTab) {
        const component = refs[oldTab.id].value
        if (component) {
            component.resetState()
        }
    }
})

// Update settings
onMounted(() => {
    initTabs()

    const tabsElement: HTMLElement = document.getElementById('default-styled-tab')!

    // create an array of objects with the id, trigger element (eg. button), and the content element
    const tabElements: TabItem[] = [
        {
            id: 'profile',
            triggerEl: document.querySelector('#profile-styled-tab')!,
            targetEl: document.querySelector('#styled-profile')!,
        },
        {
            id: 'security',
            triggerEl: document.querySelector('#security-styled-tab')!,
            targetEl: document.querySelector('#styled-security')!,
        },
        {
            id: 'lexi',
            triggerEl: document.querySelector('#dashboard-styled-tab')!,
            targetEl: document.querySelector('#styled-dashboard')!,
        },
    ]

    // options with default values
    const options: TabsOptions = {
        defaultTabId: 'profile',
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
    const tabs = new Tabs(tabsElement, tabElements, options, instanceOptions)
})
</script>
<template>
    <section class="flex flex-col-reverse lg:flex-row">
        <div class="w-full lg:w-1/2 flex justify-center lg:justify-end lg:pe-10">
            <div class="w-full md:w-1/2 lg:w-4/5">
                <ImgSettings class="scale-90" />
            </div>
        </div>
        <div class="w-full lg:w-1/2 flex justify-center lg:justify-start lg:ps-10 lg:pt-16">
            <div class="flex flex-col w-full md:w-2/3">
                <h2 class="text-center text-2xl font-bold text-gray-900 mb-4">Settings</h2>

                <div class="border-b flex justify-center">
                    <ul
                        class="flex flex-wrap -mb-px text-sm font-medium text-center"
                        id="default-styled-tab"
                        data-tabs-toggle="#default-styled-tab-content"
                        data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
                        data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
                        role="tablist"
                    >
                        <li class="me-2" role="presentation">
                            <button
                                id="profile-styled-tab"
                                data-tabs-target="#styled-profile"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                            >
                                <IconProfileEdit class="me-2" />
                                Profile
                            </button>
                        </li>
                        <li class="me-2" role="presentation">
                            <button
                                id="security-styled-tab"
                                data-tabs-target="#styled-security"
                                type="button"
                                role="tab"
                                aria-controls="security"
                                aria-selected="false"
                            >
                                <IconSecurity class="me-2" />
                                Security
                            </button>
                        </li>
                        <li class="me-2" role="presentation">
                            <button
                                id="dashboard-styled-tab"
                                data-tabs-target="#styled-dashboard"
                                type="button"
                                role="tab"
                                aria-controls="dashboard"
                                aria-selected="false"
                            >
                                <IconTools class="me-2" />
                                Lexi AI
                            </button>
                        </li>
                    </ul>
                </div>
                <div id="default-styled-tab-content">
                    <div
                        class="hidden p-4 rounded-lg"
                        id="styled-profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        <SettingsProfile ref="profile" />
                    </div>
                    <div
                        class="hidden p-4 rounded-lg"
                        id="styled-security"
                        role="tabpanel"
                        aria-labelledby="security-tab"
                    >
                        <SettingsSecurity ref="security" />
                    </div>
                    <div
                        class="hidden p-4 rounded-lg"
                        id="styled-dashboard"
                        role="tabpanel"
                        aria-labelledby="dashboard-tab"
                    >
                        <SettingsLexi ref="lexi" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
button[role='tab'] {
    @apply inline-flex items-center p-4 border-b-2 rounded-t-lg;
}
</style>
