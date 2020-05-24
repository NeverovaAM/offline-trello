import { createSelector } from "reselect";
import {
  InitialStateType,
  ColumnType,
  CardType,
  BoardType,
} from "../models/index";
import filter from "lodash/filter";
import { FullStateType } from "../redux/store";

const getCurrentBoardId = (state: FullStateType): number =>
  state.basic.currentBoard;

const getBoards = (state: FullStateType): Array<BoardType> =>
  state.basic.boards;

const getColumns = (state: FullStateType): Array<ColumnType> =>
  state.basic.columns;

const getCards = (state: FullStateType): Array<CardType> => state.basic.cards;

const getCurrentColumn = (state: FullStateType, props: any): number =>
  props.column.id;

export const getCurrentBoardName = createSelector(
  getCurrentBoardId,
  getBoards,
  (id, boards) => {
    const currentBoard: any = boards.find((item) => item.id === id)
    if (currentBoard) {
        return currentBoard.title
    } else {
        return ''
    }
  }
);

export const getCurrentColumns = createSelector(
  getCurrentBoardId,
  getColumns,
  (id, columns) => filter(columns, ["boardId", id])
);

export const getCardsForColumn = createSelector(
  getCurrentColumn,
  getCards,
  (id, cards) => filter(cards, ["colId", id])
);
