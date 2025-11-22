<template>
  <div
    class="card p-3 mb-3 rounded-lg shadow-sm cursor-pointer hover:-translate-y-1 transition-transform bg-slate-700 text-white border border-gray-600 border-l-4"
    :style="{ borderLeftColor: task.color || '#3b82f6' }"
    @click="$emit('click', task)"
  >
    <p class="card-title font-medium text-sm mb-1 wrap-break-word text-gray-100">{{ task.title }}</p>

    <div v-if="task.description" class="card-description-indicator flex items-center text-gray-400 mt-2">
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
</style>
