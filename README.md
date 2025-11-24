# 🚀 Easy Kanban

> **Organize ideias. Domine o fluxo.**
> A ferramenta definitiva para estudantes e times ágeis.

## 📖 Sobre o Projeto

O **Easy Kanban** é uma aplicação web de gerenciamento de tarefas baseada na metodologia ágil Kanban. Desenvolvido com foco em **minimalismo**, **performance** e **usabilidade**, o projeto oferece uma experiência fluida com tema escuro nativo (Dark Mode) para longas sessões de estudo ou trabalho.

Este projeto foi desenvolvido como parte da disciplina de **Análise e Desenvolvimento de Sistemas (ADS)** da **UNINASSAU**.

## ✨ Principais Recursos

* **⚡ Interface Reativa:** Construído com Vue 3 (Composition API) e Vite para máxima velocidade.
* **🎨 Dark Mode Nativo:** Design System elegante utilizando TailwindCSS e DaisyUI com paleta de cores Slate/Dark.
* **🖱️ Drag & Drop Fluido:** Arraste e solte tarefas entre colunas com facilidade (powered by `vuedraggable`).
* **💾 Persistência Local:** Seus dados nunca somem! Utilizamos **Dexie.js (IndexedDB)** para salvar usuários, quadros e tarefas direto no navegador.
* **🔐 Autenticação:** Sistema completo de Login e Cadastro de usuários.
* **📱 Design Responsivo:** Funciona perfeitamente em desktops e dispositivos móveis.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** [Vue.js 3](https://vuejs.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
* **Banco de Dados Local:** [Dexie.js](https://dexie.org/) (Wrapper para IndexedDB)
* **Ícones:** [Iconify](https://iconify.design/) (Lucide Icons)
* **Drag and Drop:** [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar o projeto em sua máquina local:

### Pré-requisitos

* Node.js instalado (versão 16 ou superior).
* Gerenciador de pacotes (NPM ou Yarn).

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/kauevictor30/easy-kamban.git](https://github.com/kauevictor30/easy-kamban.git)
    cd easy-kamban
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador:**
    O projeto estará rodando em `http://localhost:5173` (ou a porta indicada no terminal).

## 📂 Estrutura do Projeto

```text
src/
├── assets/          # Imagens e CSS global
├── components/      # Componentes Vue (Board, KanbanList, Cards, Modais)
├── layouts/         # Layouts padrão (Navbar, Footer)
├── router/          # Configuração de rotas (Vue Router)
├── views/           # Páginas principais (Login)
├── store.js         # Gerenciamento de estado e lógica do banco
├── db.js            # Configuração do Dexie.js
└── App.vue          # Componente Raiz
