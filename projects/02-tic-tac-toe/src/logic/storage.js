export const storage = {
    get: (key) => {
        console.log(localStorage.getItem(key));
        return JSON.parse(localStorage.getItem(key));
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove: (key) => {
        localStorage.removeItem(key);
    },
    saveGame: ({ board, turn }) => {
        storage.set('board', board);
        storage.set('turn', turn);
    },
    resetGame: () => {
        storage.remove('board');
        storage.remove('turn');
    }
};