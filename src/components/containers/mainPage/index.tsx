import React, { useState } from "react";
import Button from "../../elements/button";
import Dialog from "../../elements/dialog";
import BoardCard from "../../elements/boardCard";
import { addBoard, setCurrentBoard } from "../../../redux/basic/actions";
import {
  AddBoardActionType,
  SetCurrentBoardType,
} from "../../../redux/basic/actions/actionTypes";
import "./styles.scss";
import { connect } from "react-redux";
import { FullStateType } from "../../../redux/store";
import { BoardType } from "../../../models";

type PropType = {
  addBoard: (text: string) => AddBoardActionType;
  setCurrentBoard: (id: number) => SetCurrentBoardType;
  boards: BoardType[];
};

const MainPage: React.FC<PropType> = (props) => {
  const { boards, addBoard } = props;

  const [inputValue, setInputValue] = useState("");

  const openDialog = () => {
    const dialog: any = document.querySelector(".create-board-dialog");
    dialog.showModal();
  };

  const closeDialog = () => {
    const dialog: any = document.querySelector(".create-board-dialog");
    dialog.close();
  };

  const closeAndSet = () => {
    if (inputValue.length > 0) {
      const dialog: any = document.querySelector(".create-board-dialog");
      dialog.close();
      addBoard(inputValue);
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
    <div className="main-page">
      <div className="main-page_header">
        <div className="main-page_header_heading">Доски</div>
      </div>
      <div className="board-cards-container">
        <div className="main-page_button">
          <Button text="Создать Доску" handleClick={handleClick}></Button>
        </div>
        <Dialog
          placeholder="Введите название доски"
          inputValue={inputValue}
          handleCancelClick={closeDialog}
          handleSetClick={closeAndSet}
          handleEnter={handleEnter}
          handleInput={handleInput}
          className="create-board-dialog"
        ></Dialog>
        <div className="board-cards">
          {boards.length ? (
            boards.map((b) => <BoardCard board={b} key={b.id}></BoardCard>)
          ) : (
            <div> Нажмите "Создать Доску", чтобы создать новую Доску </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: FullStateType) => ({
  boards: state.basic.boards,
});

export default connect(mapStateToProps, {
  addBoard,
  setCurrentBoard,
})(MainPage);
