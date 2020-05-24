import React, { useState } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import InputText from "../inputText";
import Button from "../button";
import { renameBoard, deleteBoard, setCurrentBoard } from "../../../redux/basic/actions";
import {
  RenameBoardActionType,
  DeleteBoardActionType,
  SetCurrentBoardType,
} from "../../../redux/basic/actions/actionTypes";
import { BoardType } from "../../../models";
import ThreeDotMenu from "../three-dot-menu";
import { THREE_DOT_MENU_ITEMS } from "../../../constants";
import { Link } from "react-router-dom";

type PropType = {
  board: BoardType;
  className?: string;
  renameBoard: (id: number, newTitle: string) => RenameBoardActionType;
  deleteBoard: (id: number) => DeleteBoardActionType;
  setCurrentBoard: (id: number) => SetCurrentBoardType
};

const BoardCard: React.FC<PropType> = (props) => {

  const { renameBoard, deleteBoard, className, setCurrentBoard } = props;
  const { id, title } = props.board;
  const classes = className
    ? `board-card-common ${className}`
    : "board-card-common";

  const [renaming, setRenaming] = useState(false);

  const handleInput = (val: string) => {
    renameBoard(id, val);
  };

  const handleEnter = () => {
    setRenaming(false)
  }

  const onMenuItemClick = (item: string) => {
    switch (item) {
      case THREE_DOT_MENU_ITEMS[0]: //rename
        setRenaming(true);
        break;
      case THREE_DOT_MENU_ITEMS[1]: //delete
        deleteBoard(id);
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes}>
      <div className="menu-container">
        <ThreeDotMenu
          handleClick={onMenuItemClick}
          items={THREE_DOT_MENU_ITEMS}
        ></ThreeDotMenu>
      </div>
      {renaming ? (
        <div className="input-text-container">
          <InputText handleEnter={handleEnter} value={title} placeholder="Enter name" handleInput={handleInput} />
        </div>
      ) : (
        <div>{title}</div>
      )}
      <Link to={`/board/${id}`}>
        <Button handleClick={() => { setCurrentBoard(id)}} text="Открыть"></Button>
      </Link>
    </div>
  );
};

export default connect(null, {
  renameBoard,
  deleteBoard,
  setCurrentBoard
})(BoardCard);
