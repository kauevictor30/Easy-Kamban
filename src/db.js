import Dexie from "dexie";

const db = new Dexie("EasyKanbanDB");

db.version(1).stores({
    users: '++id, &email',
    boards: '++id, userId, title',
    lists: '++id, boardId, title, position',
    tasks: '++id, listId, title, description, color, position'
});

export default db;
