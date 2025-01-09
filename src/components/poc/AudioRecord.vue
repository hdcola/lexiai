<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const isRecording = ref(false);
const audioURL = ref('');
const errorMsg = ref('');
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];

const toggleRecording = async () => {
  try {
    if (!isRecording.value) {
      audioChunks = [];
      // Request audio from the user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Safari Compatibility: Safari requires a mimeType to be specified
      const options = {
        mimeType: 'audio/mp4'
      };

      try {
        mediaRecorder = new MediaRecorder(stream, options);
      } catch {
        // Downgrading: if mp4 is not supported, try another format
        mediaRecorder = new MediaRecorder(stream);
      }

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, {
          type: mediaRecorder?.mimeType || 'audio/mp4'
        });
        if (audioURL.value) {
          URL.revokeObjectURL(audioURL.value); // Clean up the previous audio
        }
        audioURL.value = URL.createObjectURL(audioBlob);
      };

      mediaRecorder.start(100); // Start recording with a 100ms buffer
      isRecording.value = true;
      errorMsg.value = '';
    } else {
      mediaRecorder?.stop();
      // Stop all tracks to prevent memory leaks
      mediaRecorder?.stream.getTracks().forEach(track => track.stop());
      mediaRecorder = null;
      isRecording.value = false;
    }
  } catch (error) {
    errorMsg.value = 'Error recording audio. Please check your microphone settings.';
    console.error('Recording error:', error);
    isRecording.value = false;
  }
};

// Clean up resources when the component is unmounted
onUnmounted(() => {
  if (audioURL.value) {
    URL.revokeObjectURL(audioURL.value);
  }
  if (mediaRecorder?.state === 'recording') {
    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(track => track.stop());
  }
});
</script>

<template>
    <button @click="toggleRecording">
      {{ isRecording ? 'stop' : 'record' }}
    </button>
    <audio v-if="audioURL" controls :src="audioURL"></audio>
    <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
</template>

<style scoped>

button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

audio {
  margin-top: 1rem;
}

.error {
  color: #ff4444;
  margin-top: 0.5rem;
}
</style>
