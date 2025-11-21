<template>
  <div class="min-h-screen bg-[#0f172a] text-gray-100 overflow-x-hidden font-sans">

    <nav class="navbar fixed top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-800 px-6">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl text-primary font-bold tracking-tighter">
          EASY KANBAN
        </a>
      </div>
      <div class="flex-none gap-4">
        <ul class="menu menu-horizontal px-1 hidden sm:flex text-gray-400">
          <li><a href="#features">Recursos</a></li>
          <li><a href="#team">Equipe</a></li>
        </ul>

        <router-link
          :to="isLoggedIn ? '/board' : '/login'"
          class="btn btn-primary btn-sm font-bold shadow-lg shadow-primary/20"
        >
          {{ isLoggedIn ? 'Ir para o Quadro' : 'Acessar Sistema' }}
        </router-link>
      </div>
    </nav>

    <div class="hero min-h-screen relative overflow-hidden">
      <div class="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-30"></div>

      <div class="hero-content text-center z-10">
        <div class="max-w-3xl">
          <div class="badge badge-outline badge-primary mb-6 p-4 font-mono">v1.0.0 - Beta Público</div>
          <h1 class="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-linear-to-r from-white to-gray-500 mb-6 leading-tight">
            Organize ideias.<br>Domine o fluxo.
          </h1>
          <p class="py-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            O Easy Kanban é a ferramenta definitiva para estudantes e times ágeis.
            Visual minimalista, foco total e zero distrações.
          </p>
          <div class="flex gap-4 justify-center mt-4">

            <router-link
              :to="isLoggedIn ? '/board' : '/login'"
              class="btn btn-primary btn-lg px-8 shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            >
              {{ isLoggedIn ? 'Acessar meu Quadro' : 'Começar Agora' }}
              <Icon icon="lucide:arrow-right" />
            </router-link>

            <a href="#features" class="btn btn-outline btn-lg px-8 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
              Saber mais
            </a>
          </div>
        </div>
      </div>
    </div>

    <section id="features" class="py-20 px-6 bg-[#1e293b]/50 border-y border-gray-800/50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4 text-white">Por que usar o Easy Kanban?</h2>
          <p class="text-gray-400">Feito de devs para devs. Simples, direto e poderoso.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="card bg-[#0f172a] border border-gray-800 hover:border-primary/50 transition-colors p-6">
            <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Icon icon="lucide:layout-dashboard" width="24" />
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-200">Visualização Clara</h3>
            <p class="text-gray-400">Quadro interativo com colunas personalizáveis.</p>
          </div>
          <div class="card bg-[#0f172a] border border-gray-800 hover:border-primary/50 transition-colors p-6">
            <div class="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-400">
              <Icon icon="lucide:mouse-pointer-2" width="24" />
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-200">Drag & Drop</h3>
            <p class="text-gray-400">Tecnologia fluida para organizar cards num piscar de olhos.</p>
          </div>
          <div class="card bg-[#0f172a] border border-gray-800 hover:border-primary/50 transition-colors p-6">
            <div class="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 text-green-400">
              <Icon icon="lucide:moon" width="24" />
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-200">Dark Mode Nativo</h3>
            <p class="text-gray-400">Interface desenhada para longas sessões de codificação.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="team" class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4 text-white">Quem faz acontecer</h2>
          <p class="text-gray-400">O time por trás do código.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="group relative">
            <div class="absolute inset-0 bg-linear-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl"></div>
            <div class="card bg-[#1e293b] border border-gray-800 relative p-6 text-center hover:-translate-y-1 transition-transform">
              <div class="avatar placeholder mb-4 justify-center">
                <div class="bg-neutral text-neutral-content rounded-full w-24 h-24 ring ring-primary ring-offset-base-100 ring-offset-2">
                  <span class="text-3xl">K</span>
                </div>
              </div>
              <h3 class="text-xl font-bold text-white">Kauê Victor</h3>
              <p class="text-primary text-sm mb-4">Tech Lead & Fullstack</p>
              <p class="text-gray-400 text-sm">Apaixonado por Vue e Dark Mode.</p>
            </div>
          </div>
          <div class="card bg-[#1e293b] border border-gray-800 p-6 text-center hover:-translate-y-1 transition-transform">
            <div class="avatar placeholder mb-4 justify-center">
              <div class="bg-neutral text-neutral-content rounded-full w-24 h-24">
                <span class="text-3xl">M2</span>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white">Membro 2</h3>
            <p class="text-secondary text-sm mb-4">Frontend Dev</p>
          </div>
          <div class="card bg-[#1e293b] border border-gray-800 p-6 text-center hover:-translate-y-1 transition-transform">
            <div class="avatar placeholder mb-4 justify-center">
              <div class="bg-neutral text-neutral-content rounded-full w-24 h-24">
                <span class="text-3xl">M3</span>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white">Membro 3</h3>
            <p class="text-accent text-sm mb-4">Backend & Docs</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer footer-center p-10 bg-[#0f172a] border-t border-gray-800 text-gray-500">
      <aside>
        <Icon icon="lucide:trello" width="40" class="mb-4 text-gray-600" />
        <p class="font-bold">Easy Kanban Project - UNINASSAU</p>
        <p>Copyright © 2025 - Todos os direitos reservados</p>
      </aside>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const isLoggedIn = ref(false)

onMounted(() => {
  isLoggedIn.value = !!sessionStorage.getItem('loggedInUser')
})
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
