<template>
  <div class="w-72 shrink-0 flex flex-col max-h-full">
    <div class="bg-[#1e293b] rounded-xl p-3 shadow-lg border border-gray-700 flex flex-col max-h-full">
      
      <div class="flex justify-between items-center mb-3 px-1">
        <h2 class="font-semibold text-white">{{ title }}</h2>
        <button class="btn btn-ghost btn-xs btn-circle text-gray-400" @click="deleteList">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
             <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto min-h-[20px] space-y-2 px-1 custom-scrollbar">
        <draggable 
           v-model="listTasks" 
           group="cards" 
           item-key="id"
           ghost-class="opacity-50"
           @change="onDragChange"
        >
           <template #item="{ element }">
             <KanbanCard :task="element" @click="$emit('edit-task', element)" />
           </template>
        </draggable>
      </div>

      <div class="mt-3">
         <button class="btn btn-sm w-full bg-[#0f172a] border-none text-gray-300 hover:text-white hover:bg-[#1e3a5f] justify-start normal-case rounded-lg" @click="addTask">
            + Adicionar tarefa
         </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import draggable from 'vuedraggable'
import KanbanCard from './KanbanCard.vue'
import store from '../store'

const emit = defineEmits(['edit-task'])

const props = defineProps({
  id: {
      type: Number,
      required: true
  },
  title: {
    type: String,
    required: true,
  }
})

const listTasks = computed({
    get: () => store.state.tasks.filter(t => t.listId === props.id).sort((a, b) => a.position - b.position),
    set: (value) => {
        // Optimistic update or handle reordering via store
        // For simple reordering within list, we might need a store action
    }
})

function onDragChange(event) {
    if (event.added) {
        store.moveTask(event.added.element.id, props.id, event.added.newIndex)
    }
    // Handle moved (within same list) if needed
}

async function addTask() {
    const title = prompt('Nova tarefa:')
    if (title) {
        await store.addTask(props.id, { title, description: '', color: '#ffffff' })
    }
}

async function deleteList() {
    if (confirm('Tem certeza que deseja excluir esta lista e todas as suas tarefas?')) {
        await store.deleteList(props.id)
    }
}
</script>

<style scoped>
/* Scrollbar fininha para a lista */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #475569; 
  border-radius: 4px;
}
</style>
