import React, { useState } from "react";
import Button from "../../elements/button";
import Card from "../../elements/card";
import Dialog from "../../elements/dialog";
import Column from "../../elements/column";
import { ColumnType } from "../../../models";
import { addColumn } from "../../../redux/basic/actions";
import {
  getCurrentColumns,
  getCardsForColumn,
  getCurrentBoardName,
} from "../../../selectors";
import { connect } from "react-redux";
import { FullStateType } from "../../../redux/store";
import { AddColumnActionType } from "../../../redux/basic/actions/actionTypes";

type PropType = {
  columns: ColumnType[];
  currentBoard: number;
  boardName: string;
  addColumn: (boardId: number, title: string) => AddColumnActionType;
};

const BoardPage: React.FC<PropType> = (props) => {
  const { columns, currentBoard, boardName, addColumn } = props;

  const openDialog = () => {
    const dialog: any = document.querySelector(".create-dialog");
    dialog.showModal();
  };

  const closeDialog = () => {
    const dialog: any = document.querySelector(".create-dialog");
    dialog.close();
  };

  const [inputValue, setInputValue] = useState("");

  const closeAndSet = () => {
    if (inputValue.length > 0) {
      const dialog: any = document.querySelector(".create-dialog");
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

  return (
    <div className="board-page">
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
      ></Dialog>
      <div className="board-page_columns-container">
          { columns.length? columns.map( col => (
              <Column key={col.id} column={col}></Column>
          )) : <div>Нажмите "Создать колонку"</div>}
      </div>
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
})(BoardPage);
