class BoardManager {
    constructor() {
        this.boards = new Map();
    }

    getBoard(boardId) {
        if (!this.boards.has(boardId)) {
            this.boards.set(boardId, {
                users: [],
                strokes: [],
                cursors: {},
            });
        }

        return this.boards.get(boardId);
    }

    joinBoard(boardId, user) {
        const board = this.getBoard(boardId);

        board.users.push(user);

        return board.users;
    }

    leaveBoard(boardId, socketId) {
        const board = this.boards.get(boardId);

        if (!board) return [];

        board.users = board.users.filter(
            (u) => u.socketId !== socketId
        );

        return board.users;
    }
}

module.exports = new BoardManager();