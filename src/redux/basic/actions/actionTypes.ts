export type AddBoardActionType = {
  type: string;
  payload: {
    title: string;
  };
};

export type DeleteBoardActionType = {
  type: string;
  payload: {
    id: number;
  };
};

export type RenameBoardActionType = {
  type: string;
  payload: {
    id: number;
    newTitle: string;
  };
};

export type SetCurrentBoardType = {
  type: string;
  payload: {
    id: number;
  };
};

export type AddColumnActionType = {
  type: string;
  payload: {
    title: string;
  };
};

export type RenameColumnActionType = {
  type: string;
  payload: {
    id: number;
    newTitle: string;
  };
};

export type DeleteColumnActionType = {
  type: string;
  payload: {
    id: number;
  };
};

export type AddCardActionType = {
  type: string;
  payload: {
    title: string;
    columnId: number;
  };
};

export type RenameCardActionType = {
  type: string;
  payload: {
    newTitle: string;
    id: number;
  };
};

export type DeleteCardActionType = {
  type: string;
  payload: {
    id: number;
  };
};

export type MoveCardActionType = {
  type: string;
  payload: {
    cardId: number;
    sourceColId: number;
    targetColId: number;
  };
};
