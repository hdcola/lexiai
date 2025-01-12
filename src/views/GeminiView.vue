<script setup lang="ts">

import GeminiClient from '@/components/GeminiClient.vue';
import { ref } from "vue";
const topics = ref([
  {
    name: "Small Talk",
    details: ["Greetings", "Basic Phrases", "Introductions"],
  },
  {
    name: "Travel",
    details: ["Directions", "Booking Tickets", "Hotel Conversations"],
  },
  {
    name: "Grammar",
    details: ["Verb Conjugations", "Sentence Structure", "Tenses"],
  },
]);


</script>

<template>
    <p class="text-xl font-bold text-center mt-6">Gemini AI Implementation</p>

    <!-- Main Interface -->
    <div class="flex flex-row gap-6 mt-8 mx-auto max-w-6xl">
        <!-- Topics List -->
        <div class="bg-gray-100 p-4 rounded-lg shadow-lg w-1/4 h-auto">
            <p class="text-lg font-semibold mb-4">French Topics</p>
            <ul class v-for="(topic, index) in topics"  :key="index">                
                <li class="bg-gray-100 p-2 border-2 border-gray-200 hover:border-gray-400 rounded-lg max-w-xs mx-auto mb my-2">
                    <a href="#" class="text-gray-600">{{ topic.name }}</a>
                </li>            
            </ul>
    </div>

    <!-- Chat Interface -->
    <div class="flex flex-col gap-6 w-3/4">
        <!-- Logs Container -->
        <div class="bg-gray-800 text-white rounded-lg shadow-lg">
            <div class="bg-blue-600 text-white px-4 py-2 font-semibold rounded-t-lg flex justify-between">
                <span>Chat History</span>
            </div>
            <div id="logs-container" class="p-4 h-72 overflow-y-auto"></div>
        </div>

        <!-- Input Controls -->
        <div class="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col gap-4">
            <input 
                type="text" 
                id="message-input" 
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400" 
                placeholder="Enter message..." 
            />
            <div class="flex gap-3 justify-end">
                <button 
                    id="send-button" 
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                >
                    Send
                </button>
                <GeminiClient />
                <!--<button 
                    id="mic-button" 
                    class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                    <span id="mic-icon" class="material-symbols-outlined">mic</span>
                </button>-->
            </div>
        </div>
    </div>
</div>


</template>
