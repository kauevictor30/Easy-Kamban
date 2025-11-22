<template>
  <div class="w-72 shrink-0 flex flex-col max-h-full">
    <div class="bg-[#243C5F] rounded-xl p-3 shadow-lg flex flex-col max-h-full">

      <div class="flex justify-between items-center mb-3 px-1">
        <h2 class="font-bold text-base-100">{{ title }}</h2>

        <button
          class="btn btn-ghost btn-xs btn-circle text-base-100 hover:text-error transition-colors"
          @click="openDeleteModal"
          title="Excluir lista"
        >
          <Icon icon="lucide:trash-2" width="16" height="16" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto min-h-20 space-y-2 px-1 custom-scrollbar">
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
         <button class="btn btn-sm w-full btn-ghost justify-start normal-case rounded-lg text-gray-400 hover:bg-base-100" @click="openAddTaskModal">
            <Icon icon="lucide:plus" width="16" height="16" class="mr-1" />
            Adicionar tarefa
         </button>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal modal-open modal-bottom sm:modal-middle cursor-pointer" @click.self="showDeleteModal = false">
      <div class="modal-box bg-[#243C5F]">
        <h3 class="font-bold text-error">Excluir Lista?</h3>
        <p class="py-4 text-white">Tem certeza que deseja excluir a lista "<strong>{{ title }}</strong>" e todas as suas tarefas? Essa ação não pode ser desfeita.</p>
        <div class="modal-action">
          <button class="btn btn-ghost" @click="showDeleteModal = false">Cancelar</button>
          <button class="btn btn-error text-white" @click="confirmDeleteList">Sim, excluir</button>
        </div>
      </div>
    </div>

    <div v-if="showAddTaskModal" class="modal modal-open modal-bottom sm:modal-middle cursor-pointer" @click.self="showAddTaskModal = false">
      <div class="modal-box bg-[#243C5F]">
        <h3 class="font-bold text-lg text-gray-300">Nova Tarefa</h3>
        <div class="py-4">
          <p class="text-sm text-white mb-2">O que precisa ser feito?</p>
          <input
            ref="inputTaskRef"
            v-model="newTaskTitle"
            type="text"
            placeholder="Ex: Criar protótipo, Revisar texto..."
            class="input input-bordered w-full bg-[#0f172a] focus:input-primary"
            @keyup.enter="confirmAddTask"
          />
        </div>
        <div class="modal-action">
          <button class="btn btn-ghost" @click="showAddTaskModal = false">Cancelar</button>
          <button class="btn btn-primary" @click="confirmAddTask" :disabled="!newTaskTitle">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, nextTick } from 'vue'
import draggable from 'vuedraggable'
import { Icon } from '@iconify/vue'
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

const showDeleteModal = ref(false)
const showAddTaskModal = ref(false)
const newTaskTitle = ref('')
const inputTaskRef = ref(null)

const listTasks = computed({
    get: () => store.state.tasks.filter(t => t.listId === props.id).sort((a, b) => a.position - b.position),
    set: (value) => {
    }
})

function onDragChange(event) {
    if (event.added) {
        store.moveTask(event.added.element.id, props.id, event.added.newIndex)
    }
}

function openAddTaskModal() {
    newTaskTitle.value = ''
    showAddTaskModal.value = true
    nextTick(() => {
        if(inputTaskRef.value) inputTaskRef.value.focus()
    })
}

async function confirmAddTask() {
    if (newTaskTitle.value.trim()) {
        await store.addTask(props.id, { title: newTaskTitle.value, description: '', color: '#ffffff' })
        showAddTaskModal.value = false
        newTaskTitle.value = ''
    }
}

function openDeleteModal() {
    showDeleteModal.value = true
}

async function confirmDeleteList() {
    await store.deleteList(props.id)
    showDeleteModal.value = false
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: oklch(var(--b3));
  border-radius: 4px;
}
</style>
