export type BoardType = {
    id: number,
    title: string
}

export type ColumnType = {
    boardId: number,
    id: number,
    title: string
}

export type CardType = {
    colId: number,
    id: number,
    title: string,
    boardId: number
}

export type InitialStateType = {
    boards: Array<BoardType>,
    columns: Array<ColumnType>,
    cards: Array<CardType>,
    currentBoard: number
}

export type BoardsInitialsStateType = {
    boards: Array<BoardType>
    currentBoard: number
}