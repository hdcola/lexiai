  <script setup lang="ts">
  defineProps({
    path: {
      type: String,
      required: true
    }
  })
  </script>
  
  <template>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path :d="path" />
    </svg>
  </template>
  
  
  <style scoped>
  .icon {
    display: block;
    color: inherit;
    fill: currentColor;
    width: 24px;
    height: 24px;
  }
  </style>
  