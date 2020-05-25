import React, { useState } from "react";
import Button from "../../elements/button";
import Dialog from "../../elements/dialog";
import Column from "../../elements/column";
import { ColumnType } from "../../../models";
import { addColumn, moveCard } from "../../../redux/basic/actions";
import {
  getCurrentColumns,
  getCurrentBoardName,
} from "../../../selectors";
import { connect } from "react-redux";
import { FullStateType } from "../../../redux/store";
import {
  AddColumnActionType,
  MoveCardActionType,
} from "../../../redux/basic/actions/actionTypes";
import "./styles.scss";
import { Link } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

type PropType = {
  columns: ColumnType[];
  currentBoard: number;
  boardName: string;
  addColumn: (boardId: number, title: string) => AddColumnActionType;
  moveCard: (
    cardId: number,
    sourceId: number,
    targetId: number
  ) => MoveCardActionType;
};

const BoardPage: React.FC<PropType> = (props) => {
  const { columns, currentBoard, boardName, addColumn, moveCard } = props;

  const openDialog = () => {
    const dialog: any = document.querySelector(".create-column-dialog");
    dialog.showModal();
  };

  const closeDialog = () => {
    const dialog: any = document.querySelector(".create-column-dialog");
    dialog.close();
  };

  const [inputValue, setInputValue] = useState("");

  const closeAndSet = () => {
    if (inputValue.length > 0) {
      const dialog: any = document.querySelector(".create-column-dialog");
      dialog.close();
      addColumn(currentBoard, inputValue);
      setInputValue("");
    }
  };

  const handleClick = () => {
    openDialog();
  };

  const handleEnter = () => {
    closeAndSet();
  };

  const handleInput = (val: any) => {
    setInputValue(val);
  };

  const onDragEnd = (result: any, columns: any) => {
    if (result.source.droppableId !== result.destination.droppableId) {
      const cardId = +result.draggableId;
      const sourceId = +result.source.droppableId;
      const targetId = +result.destination.droppableId;
      moveCard(cardId, sourceId, targetId);
    }
  };

  return (
    <div className="board-page">
      <div className="board-page_button-container">
        <Link to="/">
          <Button text="Назад к списку досок" handleClick={() => {}}></Button>
        </Link>
      </div>
      <div className="board-page_title">
        <div className="board-page_title_heading">{boardName}</div>
      </div>
      <div className="board-page_button-container">
        <Button text="Создать Колонку" handleClick={handleClick}></Button>
      </div>
      <Dialog
        placeholder="Введите название колонки"
        inputValue={inputValue}
        handleCancelClick={closeDialog}
        handleSetClick={closeAndSet}
        handleEnter={handleEnter}
        handleInput={handleInput}
        className="create-column-dialog"
      ></Dialog>
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns)}>
        <div className="board-page_columns-container">
          {columns.length ? (
            columns.map((col) => <Column key={col.id} column={col}></Column>)
          ) : (
            <div>Нажмите "Создать колонку"</div>
          )}
        </div>
      </DragDropContext>
    </div>
  );
};
const mapStateToProps = (state: FullStateType) => ({
  columns: getCurrentColumns(state),
  currentBoard: state.basic.currentBoard,
  boardName: getCurrentBoardName(state),
});

export default connect(mapStateToProps, {
  addColumn,
  moveCard,
})(BoardPage);
