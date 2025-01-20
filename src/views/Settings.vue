<script setup lang="ts">
import ImgSettings from '@/components/images/ImgSettings.vue'
import SettingsLexi from '@/components/settings/SettingsLexi.vue'
import { onMounted, ref } from 'vue'
import { initTabs } from 'flowbite'
import SettingsProfile from '@/components/settings/SettingsProfile.vue'
import SettingsSecurity from '@/components/settings/SettingsSecurity.vue'

const errorMessage = ref<string>('')
const successMessage = ref<string>('')

const username = ref<string>('tamara')
const email = ref<string>('')
const password = ref<string>('')
const apiKey = ref<string>('')
const voice = ref<string>('')

// Load user settings

// Update settings
onMounted(() => {
    initTabs()
    /*let tokenizerScript = document.createElement('script')
    tokenizerScript.setAttribute('src', '/node_modules/@material-tailwind/html/scripts/tabs.js')
    document.head.appendChild(tokenizerScript)*/
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
                                class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                                id="profile-styled-tab"
                                data-tabs-target="#styled-profile"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                            >
                                Profile
                            </button>
                        </li>
                        <li class="me-2" role="presentation">
                            <button
                                class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                                id="security-styled-tab"
                                data-tabs-target="#styled-security"
                                type="button"
                                role="tab"
                                aria-controls="security"
                                aria-selected="false"
                            >
                                Security
                            </button>
                        </li>
                        <li class="me-2" role="presentation">
                            <button
                                class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                                id="dashboard-styled-tab"
                                data-tabs-target="#styled-dashboard"
                                type="button"
                                role="tab"
                                aria-controls="dashboard"
                                aria-selected="false"
                            >
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
                        <SettingsProfile />
                    </div>
                    <div
                        class="hidden p-4 rounded-lg"
                        id="styled-security"
                        role="tabpanel"
                        aria-labelledby="security-tab"
                    >
                        <SettingsSecurity />
                    </div>
                    <div
                        class="hidden p-4 rounded-lg"
                        id="styled-dashboard"
                        role="tabpanel"
                        aria-labelledby="dashboard-tab"
                    >
                        <SettingsLexi />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
input[disabled] {
    @apply bg-blue-50 rounded-lg;
}
</style>
