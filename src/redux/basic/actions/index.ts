import {
  ADD_BOARD,
  DELETE_BOARD,
  RENAME_BOARD,
  SET_CURRENT_BOARD,
  ADD_COLUMN,
  RENAME_COLUMN,
  DELETE_COLUMN,
  ADD_CARD,
  RENAME_CARD,
  DELETE_CARD,
} from "../types";
import {
  AddBoardActionType,
  DeleteBoardActionType,
  RenameBoardActionType,
  SetCurrentBoardType,
  AddColumnActionType,
  RenameColumnActionType,
  DeleteColumnActionType,
  AddCardActionType,
  RenameCardActionType,
  DeleteCardActionType,
} from "./actionTypes";

export const addBoard = (title: string): AddBoardActionType => ({
  type: ADD_BOARD,
  payload: {
    title,
  },
});

export const deleteBoard = (id: number): DeleteBoardActionType => ({
  type: DELETE_BOARD,
  payload: {
    id,
  },
});

export const renameBoard = (
  id: number,
  newTitle: string
): RenameBoardActionType => ({
  type: RENAME_BOARD,
  payload: {
    id,
    newTitle,
  },
});

export const setCurrentBoard = (id: number): SetCurrentBoardType => ({
  type: SET_CURRENT_BOARD,
  payload: {
    id,
  },
});

export const addColumn = ( boardId: number, title: string ): AddColumnActionType => ({
  type: ADD_COLUMN,
  payload: {
    title
  }
})

export const renameColumn = ( id: number, newTitle: string ): RenameColumnActionType => ({
  type: RENAME_COLUMN,
  payload: {
    id,
    newTitle
  }
})

export const deleteColumn = ( id: number ): DeleteColumnActionType => ({
  type: DELETE_COLUMN,
  payload: {
    id
  }
})

export const addCard = ( colId: number, title: string ): AddCardActionType => ({
  type: ADD_CARD,
  payload: {
    columnId: colId,
    title
  }
})

export const renameCard = ( id: number, newTitle: string ): RenameCardActionType => ({
  type: RENAME_CARD,
  payload: {
    id, newTitle
  }
})

export const deleteCard = ( id: number ): DeleteCardActionType => ({
  type: DELETE_CARD,
  payload: {
    id
  }
})
