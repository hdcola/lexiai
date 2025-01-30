<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()


onMounted(async () => {
    //await authStore.isAuthenticated()
    console.log('isLoggedIn', authStore.isLoggedIn)
})
</script>

<template>
    <!-- bg-gray-900 -->
    <footer class="footer-bg-color">
        <div class="max-w-screen-xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24">
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div>
                    <div class="flex justify-center sm:justify-start text-white">
                        <RouterLink to="/" class="flex items-center text-white">
                            <img
                                class="h-9 w-auto"
                                src="@/assets/img/logo-horizontal.png"
                                alt="Lexi AI Logo"
                            />
                        </RouterLink>
                    </div>

                    <div
                        class="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-400 sm:max-w-xs sm:mx-0 sm:text-left"
                    >
                        <p>Language Learning App</p>
                        <p>Boost your confidence in any language</p>
                    </div>
                </div>

                <div class="flex items-center justify-center lg:col-span-2">
                    <div class="text-left text-gray-400">
                        
                        <a
                            href="https://www.freepik.com/free-vector/chatbot-voice-controlled-virtual-assistant-abstract-concept-illustration_12290856.htm#fromView=author&page=24&position=3&uuid=b894fe3f-3e7c-44d3-8ad5-08d0030dee17&new_detail=true"
                            >Images by vectorjuice on Freepik</a
                        >

                        <br />
                        <a href="http://www.freepik.com">Background by Freepik</a>
                    </div>
                </div>
            </div>

            <div class="pt-6 mt-12 border-t border-gray-500">
                <div class="text-center">
                    <p class="text-sm text-gray-400">
                        <span class="block sm:inline">Copyright 2025 Lexi AI</span>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
footer {
    background: var(--dark-blue);
}
</style>
