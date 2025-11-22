<template>
  <div class="flex gap-6 h-full items-start p-4 overflow-x-auto">
    <KanbanList
      v-for="list in lists"
      :key="list.id"
      :id="list.id"
      :title="list.title"
      @edit-task="openTaskModal"
    />
    <div class="min-w-[280px] shrink-0">
        <button
          class="w-full p-3 bg-[#243C5F] hover:bg-base-100 border border-dashed border-base-content/20 rounded-lg text-base-content/70 font-medium text-left transition-colors flex items-center gap-2"
          @click="openAddListModal">
            <span>+</span> Adicionar outra lista
        </button>
    </div>
    <TaskModal
        :is-open="isModalOpen"
        :task="currentTask || {}"
        @close="isModalOpen = false"
        @save="saveTask"
        @delete="deleteTask"
    />
    <div v-if="showInputModal" class="modal modal-open modal-bottom sm:modal-middle cursor-pointer" @click.self="showInputModal = false">
      <div class="modal-box bg-[#243C5F]">
        <h3 class="font-bold text-lg text-white ">Nova Lista</h3>
        <div class="py-4">
          <p class="text-sm text-gray-300 mb-2">Qual será o nome da nova coluna?</p>
          <input
            ref="inputListRef"
            v-model="newListTitle"
            type="text"
            placeholder="Ex: A Fazer, Em Revisão..."
            class="input input-bordered w-full bg-[#0f172a] focus:input-primary"
            @keyup.enter="confirmAddList"
          />
        </div>
        <div class="modal-action">
          <button class="btn btn-ghost" @click="showInputModal = false">Cancelar</button>
          <button class="btn btn-primary" @click="confirmAddList" :disabled="!newListTitle">
            Criar Lista
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, nextTick } from 'vue'
import KanbanList from './KanbanList.vue'
import TaskModal from './TaskModal.vue'
import store from '../store'

const lists = computed(() => store.state.lists)

const isModalOpen = ref(false)
const currentTask = ref(null)

const showInputModal = ref(false)
const newListTitle = ref('')
const inputListRef = ref(null)

onMounted(async () => {
    await store.loadBoard()
})

function openAddListModal() {
    newListTitle.value = ''
    showInputModal.value = true

    nextTick(() => {
      if(inputListRef.value) inputListRef.value.focus()
    })
}

async function confirmAddList() {
    if (newListTitle.value.trim()) {
        await store.addList(store.state.currentBoard.id, newListTitle.value)
        showInputModal.value = false
        newListTitle.value = ''
    }
}

function openTaskModal(task) {
    currentTask.value = task
    isModalOpen.value = true
}

async function saveTask(updatedTask) {
    await store.updateTask(updatedTask.id, updatedTask)
    isModalOpen.value = false
    currentTask.value = null
}

async function deleteTask(taskId) {
    await store.deleteTask(taskId)
    isModalOpen.value = false
    currentTask.value = null
}
</script>

<style scoped>
</style>
