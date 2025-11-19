import { reactive, readonly } from 'vue';
import db from './db';

const state = reactive({
    currentUser: null,
    currentBoard: null,
    lists: [],
    tasks: []
});

const actions = {
    async initialize() {
        const userEmail = sessionStorage.getItem('loggedInUser');
        if (userEmail) {
            const user = await db.users.where('email').equals(userEmail).first();
            if (user) {
                state.currentUser = user;
                await this.loadBoard();
            }
        }
    },

    async login(email, password) {
        const user = await db.users.where('email').equals(email).first();
        if (user && user.password === password) {
            state.currentUser = user;
            sessionStorage.setItem('loggedInUser', user.email);
            await this.loadBoard();
            return true;
        }
        return false;
    },

    async register(email, password, name) {
        const existing = await db.users.where('email').equals(email).first();
        if (existing) throw new Error('Email already in use');

        const userId = await db.users.add({ email, password, name });
        // Create default board for new user
        await db.boards.add({ userId, title: 'My Board' });

        return userId;
    },

    logout() {
        state.currentUser = null;
        state.currentBoard = null;
        state.lists = [];
        state.tasks = [];
        sessionStorage.removeItem('loggedInUser');
    },

    async loadBoard() {
        if (!state.currentUser) return;

        let board = await db.boards.where('userId').equals(state.currentUser.id).first();
        if (!board) {
            // Fallback if no board exists (shouldn't happen for new users due to register logic, but good for safety)
            const boardId = await db.boards.add({ userId: state.currentUser.id, title: 'My Board' });
            board = await db.boards.get(boardId);

            // Create default lists
            await this.addList(board.id, 'A Fazer');
            await this.addList(board.id, 'Em Andamento');
            await this.addList(board.id, 'Concluído');
        }
        state.currentBoard = board;
        await this.loadLists();
    },

    async loadLists() {
        if (!state.currentBoard) return;
        state.lists = await db.lists.where('boardId').equals(state.currentBoard.id).sortBy('position');

        // Load tasks for all lists
        const listIds = state.lists.map(l => l.id);
        state.tasks = await db.tasks.where('listId').anyOf(listIds).toArray();
    },

    async addList(boardId, title) {
        const count = await db.lists.where('boardId').equals(boardId).count();
        await db.lists.add({ boardId, title, position: count });
        await this.loadLists();
    },

    async addTask(listId, task) {
        const count = await db.tasks.where('listId').equals(listId).count();
        await db.tasks.add({ ...task, listId, position: count });
        await this.loadLists();
    },

    async updateTask(taskId, updates) {
        await db.tasks.update(taskId, updates);
        await this.loadLists();
    },

    async deleteTask(taskId) {
        await db.tasks.delete(taskId);
        await this.loadLists();
    },

    async moveTask(taskId, newListId, newPosition) {
        // This is a simplified move. For full drag and drop reordering, we need more complex logic
        // to update positions of other items.
        // For now, we just update listId.
        await db.tasks.update(taskId, { listId: newListId });
        await this.loadLists();
    },

    async deleteList(listId) {
        await db.tasks.where('listId').equals(listId).delete();
        await db.lists.delete(listId);
        await this.loadLists();
    }
};

export default {
    state: readonly(state),
    ...actions
};
