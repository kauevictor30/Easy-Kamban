<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-999 flex items-center justify-center p-4">
    <div class="mockup-window bg-base-100 border border-base-300 w-full max-w-md shadow-2xl transform transition-all scale-100">
      <div class="bg-[#243C5F] p-8 text-center">
        <h3 v-if="title" class="text-lg font-bold mb-2 text-base-content">{{ title }}</h3>
        <p class="py-4 text-base-content/80 font-medium">{{ message }}</p>
        <div class="flex justify-center mt-4">
          <button @click="close" class="btn btn-primary px-8">
            Entendi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  message: String
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>
