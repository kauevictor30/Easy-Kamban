<template>
  <div class="card" :style="{ backgroundColor: task.color || '#ffffff' }" @click="$emit('click', task)">
    <p class="card-title">{{ task.title }}</p>
    <div v-if="task.description" class="card-description-indicator">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.card {
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s;
  border: 1px solid rgba(0,0,0,0.05);
  position: relative;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.card-title {
    margin: 0;
    font-size: 0.95rem;
    color: #1e293b;
    word-wrap: break-word;
}

.card-description-indicator {
    margin-top: 8px;
    color: #64748b;
    display: flex;
    align-items: center;
}
</style>
