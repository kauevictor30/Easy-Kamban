<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import store from '../store'

const router = useRouter()
const user = computed(() => store.state.currentUser)

function handleLogout() {
  store.logout()
  router.push('/login')
}
</script>

<template>
  <header class="toolbar">
    <div class="toolbar-left">
      <h1 class="app-title">Easy Kanban</h1>
    </div>

    <div class="toolbar-right" v-if="user">
      <div class="user-profile">
        <div class="avatar">
          {{ user.name ? user.name.charAt(0).toUpperCase() : 'U' }}
        </div>
        <span class="username">{{ user.name || user.email }}</span>
      </div>
      <button @click="handleLogout" class="btn-logout" title="Sair">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
}

.username {
  font-weight: 500;
  color: #334155;
  font-size: 0.95rem;
}

.btn-logout {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-logout:hover {
  background-color: #f1f5f9;
  color: #ef4444;
}
</style>
