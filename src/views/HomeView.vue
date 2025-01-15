<script setup lang="ts">
import ImgRobotAI from '@/components/images/ImgRobotAI.vue'
import ImgConvoLang from '@/components/images/ImgConvoLang.vue'
import ImgAudioAI from '@/components/images/ImgAudioAI.vue'
import ImgConvoAudio from '@/components/images/ImgConvoAudio.vue'
import ImgLexiLogo from '@/components/images/ImgLexiLogoImage.vue'
import ImgLexiLogoText from '@/components/images/ImgLexiLogoText.vue'
import { onMounted, onUnmounted } from 'vue'

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            return
        }
        entry.target.classList.remove('in-view')
    })
})

onMounted(() => {
    const allAnimatedElements = document.querySelectorAll('.animate')
    allAnimatedElements.forEach((element) => observer.observe(element))
})

onUnmounted(() => {
    observer.disconnect()
})
</script>

<template>
    <main class="">
        <section class="flex flex-col-reverse lg:flex-row bg-blue-100 animate">
            <div class="flex w-full lg:w-1/2 justify-center lg:justify-end lg:pe-10">
                <ImgConvoLang class="w-full md:w-3/4 lg:w-4/5 fade-in" />
            </div>
            <div class="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:ps-10">
                <div class="text-center">
                    <div class="hidden md:block">
                        <ImgLexiLogo class="mx-auto logo" />
                        <ImgLexiLogoText class="mx-auto mt-3 mb-5 scale-75 lg:scale-90" />
                        <hr />
                    </div>

                    <div class="desc fade-in">
                        <h1 class="text-4xl font-semibold mt-9 text-balance">
                            Language Learning App
                        </h1>
                        <p class="my-2 text-lg">
                            Boost your confidence in any language with personalized content.
                        </p>
                        <button class="action-btn mt-5 text-lg font-semibold">
                            <span>Get Started</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section
            class="flex flex-col md:flex-row-reverse bg-fade md:h-52 justify-center items-center animate"
        >
            <ImgRobotAI class="h-44 md:h-72 lg:h-96 horizontal-flip" />
            <h2 class="text-4xl font-bold text-white text-center">Powered by Gemini</h2>
        </section>

        <section class="flex flex-col lg:flex-row bg-orange-100 animate convo">
            <div class="flex w-full lg:w-1/2 justify-center lg:justify-end lg:pe-10">
                <ImgConvoAudio class="w-full md:w-3/4 fade-in" />
            </div>
            <div class="flex flex-col justify-center desc fade-in my-7">
                <h1 class="text-4xl font-semibold">Immersive conversations</h1>
                <p class="my-2 text-lg">
                    Practice immersive conversations that simulate real-life scenarios.
                </p>
            </div>
        </section>

        <section class="flex flex-col lg:flex-row-reverse bg-purple-100 animate audio-text">
            <div class="flex w-full lg:w-1/2 justify-center lg:justify-start lg:ps-10">
                <div class="w-full md:w-3/4 fade-in">
                    <ImgAudioAI class="horizontal-flip" />
                </div>
            </div>
            <div class="flex flex-col justify-center desc fade-in my-7">
                <h1 class="text-4xl font-semibold">Audio and text interactions</h1>
                <p class="my-2 text-lg">
                    Get real-time feedback on pronunciation, intonation and fluency.
                </p>
            </div>
        </section>

        <section
            class="h-72 bg-fade flex flex-col items-center justify-center cta text-center animate"
        >
            <h1 class="text-4xl font-bold text-white mb-5 text-balance">
                Start using Lexi AI now!
            </h1>
            <button
                class="action-btn mt-5 px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-gray-100"
            >
                Get Started
            </button>
        </section>
    </main>
    <footer class="flex flex-col h-52 p-6 text-white bg-gray-700">
        <div class="flex flex-col flex-grow justify-center text-center">
            <a
                href="https://www.freepik.com/free-vector/chatbot-voice-controlled-virtual-assistant-abstract-concept-illustration_12290856.htm#fromView=author&page=24&position=3&uuid=b894fe3f-3e7c-44d3-8ad5-08d0030dee17&new_detail=true"
                >Images by vectorjuice on Freepik</a
            >
            <a href="http://www.freepik.com">Background by Freepik</a>
        </div>
        <small class="text-center">Copyright 2025 Lexi AI</small>
    </footer>
</template>

<style scoped>
.horizontal-flip {
    transform: scaleX(-1);
}
.bg-fade {
    background-color: rgba(14, 157, 204, 0.85);
}
.bg-fade.cta {
    background-color: rgba(147, 104, 239, 0.85);
}

.logo {
    padding: 5px;
    animation: bounce 1.5s ease-in-out infinite;
}
@keyframes bounce {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-15px);
    }
    100% {
        transform: translateY(0px);
    }
}

hr {
    @apply mx-auto;
    border: 1px solid rgba(255, 255, 255, 0.582);
    width: 20%;
    transition: all 0.3s ease-in;
}
section.in-view hr {
    width: 80%;
    border: 1px solid rgba(0, 0, 0, 0.1);
}
section .fade-in {
    opacity: 0;
}
section.in-view .fade-in {
    animation: fadein-anim 0.3s ease-in-out forwards;
    animation-delay: 0.5s;
}
section.in-view .desc.fade-in {
    animation-delay: 0.7s;
}
section.in-view .fade-side {
    animation: fadeside-anim 0.3s ease-in-out forwards;
    animation-delay: 0.5s;
}
@keyframes fadein-anim {
    from {
        opacity: 0;
        transform: translateY(60px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

.action-btn {
    @apply font-medium rounded-md px-7 py-2 text-white;
    background: var(--gradient-blue);
}
.action-btn:hover,
.action-btn.active {
    background: var(--gradient-blue);
}
</style>
