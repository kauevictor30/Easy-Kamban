<template>
  <div class="flex gap-6 h-full items-start">
    <KanbanList
      v-for="list in lists"
      :key="list.id"
      :id="list.id"
      :title="list.title"
      @edit-task="openTaskModal"
    />
    <div class="min-w-[280px]">
        <button class="w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg text-slate-50 font-medium text-left transition-colors" @click="addNewList">
            + Adicionar outra lista
        </button>
    </div>

    <TaskModal
        :is-open="isModalOpen"
        :task="currentTask || {}"
        @close="isModalOpen = false"
        @save="saveTask"
        @delete="deleteTask"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import KanbanList from './KanbanList.vue'
import TaskModal from './TaskModal.vue'
import store from '../store'

const lists = computed(() => store.state.lists)
const isModalOpen = ref(false)
const currentTask = ref(null)

onMounted(async () => {
    await store.loadBoard()
})

async function addNewList() {
    const title = prompt('Nome da nova lista:')
    if (title) {
        await store.addList(store.state.currentBoard.id, title)
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
