<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">

    <fieldset class="fieldset w-full max-w-sm bg-[#1e293b] border border-gray-700 p-8 rounded-2xl shadow-2xl">

      <legend class="fieldset-legend text-xl font-bold uppercase tracking-widest px-4 text-gray-100 bg-[#0f172a] border border-gray-700 rounded-lg">
        {{ mode === 'login' ? 'Acesso' : 'Nova Conta' }}
      </legend>

      <div class="flex justify-center mb-8 mt-4">
        <div class="p-4 bg-[#0f172a] rounded-full border border-gray-700 shadow-inner">
          <Icon icon="lucide:user" width="40" height="40" class="text-primary" />
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">

        <div v-if="mode === 'register'">
             <label class="label py-0 pb-2">
                <span class="label-text text-gray-300">Nome</span>
             </label>
             <div class="relative">
                <Icon icon="lucide:smile" class="absolute left-3 top-3 text-gray-500" width="20" />
                <input type="text" v-model="name" placeholder="Seu nome"
                class="input w-full pl-10 bg-[#0f172a] border-gray-700 text-white focus:border-primary transition-colors" required />
             </div>
        </div>

        <div>
          <label class="label py-0 pb-2">
            <span class="label-text text-gray-300">Email</span>
          </label>
          <div class="relative">
            <Icon icon="lucide:mail" class="absolute left-3 top-3 text-gray-500" width="20" />
            <input type="email" v-model="email" placeholder="seu@email.com"
            class="input w-full pl-10 bg-[#0f172a] border-gray-700 text-white focus:border-primary transition-colors" required />
          </div>
        </div>

        <div>
          <label class="label py-0 pb-2">
            <span class="label-text text-gray-300">Senha</span>
          </label>
          <div class="relative">
             <Icon icon="lucide:lock" class="absolute left-3 top-3 text-gray-500" width="20" />
             <input type="password" v-model="password" placeholder="••••••••"
             class="input w-full pl-10 bg-[#0f172a] border-gray-700 text-white focus:border-primary transition-colors" required />
          </div>
        </div>

        <div v-if="mode === 'register'">
          <label class="label py-0 pb-2">
            <span class="label-text text-gray-300">Confirmar Senha</span>
          </label>
          <div class="relative">
            <Icon icon="lucide:lock" class="absolute left-3 top-3 text-gray-500" width="20" />
            <input type="password" v-model="confirmPassword" placeholder="••••••••"
            class="input w-full pl-10 bg-[#0f172a] border-gray-700 text-white focus:border-primary transition-colors" required />
          </div>
        </div>

        <div v-if="mode === 'login'" class="text-right">
            <a href="#" class="link link-hover text-xs text-gray-400 hover:text-white transition-colors">Esqueceu a senha?</a>
        </div>

        <button type="submit" class="btn btn-primary w-full mt-6 font-bold text-white shadow-lg shadow-primary/20">
          {{ mode === 'login' ? 'Entrar na Plataforma' : 'Criar Minha Conta' }}
        </button>
      </form>

      <div class="mt-8 text-center pt-6 border-t border-gray-700/50">
        <p class="text-sm text-gray-400 mb-2">
            {{ mode === 'login' ? 'Ainda não tem acesso?' : 'Já possui cadastro?' }}
        </p>
        <button @click="mode = (mode === 'login' ? 'register' : 'login')" class="btn btn-outline btn-sm w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
          {{ mode === 'login' ? 'Criar conta gratuita' : 'Fazer Login' }}
        </button>
      </div>

    </fieldset>

    <Popup
      :isOpen="showPopup"
      :title="popupTitle"
      :message="popupMessage"
      @close="showPopup = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import store from './store.js'
import Popup from './components/PopUp.vue'

const router = useRouter()
const mode = ref('login')
const email = ref('')
const password = ref('')
const name = ref('')
const confirmPassword = ref('')

const showPopup = ref(false)
const popupMessage = ref('')
const popupTitle = ref('')

function openAlert(message, title = 'Atenção') {
    popupMessage.value = message
    popupTitle.value = title
    showPopup.value = true
}

async function handleSubmit() {
    if (mode.value === 'login') {
        try {
            const success = await store.login(email.value, password.value)
            if (success) {
                router.push('/')
            } else {
                openAlert('E-mail ou senha inválidos.', 'Erro de Acesso')
            }
        } catch (error) {
            console.error(error)
            openAlert('Erro ao tentar fazer login.')
        }
    } else {
        if (password.value !== confirmPassword.value) {
            openAlert('As senhas digitadas não coincidem.')
            return
        }
        try {
            await store.register(email.value, password.value, name.value)
            openAlert('Conta criada com sucesso! Faça login para começar.', 'Bem-vindo!')
            mode.value = 'login'
            password.value = ''
            confirmPassword.value = ''
        } catch (error) {
            console.error(error)
            openAlert(error.message || 'Erro ao registrar.')
        }
    }
}
</script>

<style scoped>
</style>
