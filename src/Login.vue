<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import store from './store.js'

const router = useRouter()

const mode = ref('login')

const email = ref('')
const password = ref('')
const name = ref('')
const confirmPassword = ref('')

async function handleSubmit() {
    if (mode.value === 'login') {
        try {
            const success = await store.login(email.value, password.value)
            if (success) {
                router.push('/')
            } else {
                alert('E-mail ou senha inválidos.')
            }
        } catch (error) {
            console.error(error)
            alert('Erro ao tentar fazer login.')
        }
    } else {
        if (password.value !== confirmPassword.value) {
            alert('As senhas não coincidem.')
            return
        }
        try {
            await store.register(email.value, password.value, name.value)
            alert('Usuário registrado com sucesso! Faça login para continuar.')
            mode.value = 'login'
            password.value = ''
            confirmPassword.value = ''
        } catch (error) {
            console.error(error)
            alert(error.message || 'Erro ao registrar.')
        }
    }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-300 p-4">

    <fieldset class="fieldset w-full max-w-sm bg-base-100 border border-base-300 p-6 rounded-box shadow-xl">

      <legend class="fieldset-legend text-xl font-bold uppercase tracking-widest px-2">
        {{ mode === 'login' ? 'Acesso' : 'Cadastro' }}
      </legend>

      <div class="flex justify-center mb-6 mt-2">
        <div class="avatar placeholder">
          <div class="bg-neutral text-neutral-content rounded-full w-20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">

        <div v-if="mode === 'register'">
             <label class="label py-0 pb-1">
                <span class="label-text">Nome</span>
             </label>
             <input type="text" v-model="name" placeholder="Seu nome"
             class="input input-bordered w-full" required />
        </div>

        <div>
          <label class="label py-0 pb-1">
            <span class="label-text">Email</span>
          </label>
          <input type="email" v-model="email" placeholder="usuario@exemplo.com"
          class="input input-bordered w-full" required />
        </div>

        <div>
          <label class="label py-0 pb-1">
            <span class="label-text">Senha</span>
          </label>
          <input type="password" v-model="password" placeholder="••••••••"
          class="input input-bordered w-full" required />
        </div>

        <div v-if="mode === 'register'">
          <label class="label py-0 pb-1">
            <span class="label-text">Confirmar Senha</span>
          </label>
          <input type="password" v-model="confirmPassword" placeholder="••••••••"
          class="input input-bordered w-full" required />
        </div>

        <div v-if="mode === 'login'" class="text-right">
            <a href="#" class="link link-hover text-xs text-base-content/70">Esqueceu a senha?</a>
        </div>

        <button type="submit" class="btn btn-primary w-full mt-4 font-bold">
          {{ mode === 'login' ? 'Entrar' : 'Cadastrar' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <button @click="mode = (mode === 'login' ? 'register' : 'login')" class="link link-hover text-sm text-base-content/70">
          {{ mode === 'login' ? 'Não tem conta? Crie uma agora' : 'Já tem conta? Faça login' }}
        </button>
      </div>

    </fieldset>
  </div>
</template>
