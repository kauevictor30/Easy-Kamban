<template>
  <div class="flex flex-col h-screen bg-[#0f172a]">
    <header class="h-16 bg-gray-200 flex items-center justify-between px-6 shadow-md shrink-0">
      <div class="font-bold text-xl text-gray-800">Easy Kanban</div>
      
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full bg-gray-400">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 overflow-x-auto overflow-y-hidden p-6">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
// Removemos a lógica de sidebar antiga pois o design novo não usa
</script>
