<template>
  <div class="flex flex-col h-screen bg-[#0f172a] text-gray-300">

    <header class="navbar bg-[#243C5F] border-b border-gray-400 shadow-lg z-40 h-16 shrink-0 px-4">

      <div class="navbar-start">
      </div>

      <div class="navbar-center gap-3">
        <div class="w-25 h-auto rounded-lg flex items-center justify-center text-primary">
           <img src="/src/assets/images/Logo.svg" alt="">
        </div>
      </div>

      <div class="navbar-end gap-4">
        <button @click="logout" class="btn btn-ghost btn-sm text-gray-400 hover:text-error tooltip tooltip-bottom" data-tip="Sair">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </button>
      </div>
    </header>

    <main class="flex-1 overflow-hidden relative">
      <router-view></router-view>
    </main>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import store from '../store.js'

const router = useRouter()

function logout() {
  if(confirm('Deseja realmente sair?')) {
    store.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
</style>
