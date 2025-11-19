<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  task: Object
})

const emit = defineEmits(['close', 'save', 'delete'])

const editedTask = ref({ ...props.task })

watch(() => props.task, (newTask) => {
  editedTask.value = { ...newTask }
})

function save() {
  emit('save', editedTask.value)
}

function remove() {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        emit('delete', props.task.id)
    }
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Editar Tarefa</h3>
        <button class="btn-close" @click="$emit('close')">×</button>
      </div>

      <div class="form-group">
        <label>Título</label>
        <input v-model="editedTask.title" type="text" placeholder="Título da tarefa" />
      </div>

      <div class="form-group">
        <label>Descrição</label>
        <textarea v-model="editedTask.description" rows="4" placeholder="Descrição detalhada..."></textarea>
      </div>

      <div class="form-group">
        <label>Cor</label>
        <div class="color-picker">
            <div
                v-for="color in ['#ffffff', '#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#c5cae9', '#bbdefb', '#b3e5fc', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#dcedc8', '#f0f4c3', '#fff9c4', '#ffecb3', '#ffe0b2', '#ffccbc']"
                :key="color"
                class="color-option"
                :style="{ backgroundColor: color, border: editedTask.color === color ? '2px solid #333' : '1px solid #ddd' }"
                @click="editedTask.color = color"
            ></div>
        </div>
      </div>

      <div class="modal-actions">
        <button class="btn-delete" @click="remove">Excluir</button>
        <div class="right-actions">
            <button class="btn-cancel" @click="$emit('close')">Cancelar</button>
            <button class="btn-save" @click="save">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0;
  color: #1e293b;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #475569;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-family: inherit;
  box-sizing: border-box;
}

.color-picker {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.color-option {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.right-actions {
    display: flex;
    gap: 12px;
}

.btn-save {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-save:hover {
  background-color: #2563eb;
}

.btn-cancel {
  background-color: #f1f5f9;
  color: #475569;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-cancel:hover {
  background-color: #e2e8f0;
}

.btn-delete {
    background-color: #fee2e2;
    color: #ef4444;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
}

.btn-delete:hover {
    background-color: #fecaca;
}
</style>
