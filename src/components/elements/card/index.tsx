import React, { useState } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import { FullStateType } from "../../../redux/store";
import InputText from "../inputText";
import { renameCard, deleteCard } from "../../../redux/basic/actions";
import {
  RenameCardActionType,
  DeleteCardActionType,
} from "../../../redux/basic/actions/actionTypes";
import { CardType } from "../../../models";
import ThreeDotMenu from "../three-dot-menu";
import Button from "../button";
import { THREE_DOT_MENU_ITEMS } from "../../../constants";

type PropType = {
  card: CardType;
  className?: string;
  renameCard: (id: number, newTitle: string) => RenameCardActionType;
  deleteCard: (id: number) => DeleteCardActionType;
};

const Card: React.FC<PropType> = (props) => {
  const { renameCard, deleteCard, className } = props;
  const { id, title, boardId, colId } = props.card;
  const classes = className ? `card-common ${className}` : "card-common";

  const [inputValue, setInputValue] = useState(title);
  const [renaming, setRenaming] = useState(false);

  const handleInput = (val: string) => {
    renameCard(id, val);
  };

  const handleRenameClick = () => {
    setRenaming(true);
  };

  const handleDeleteClick = () => {
    deleteCard(id);
  };

  const onMenuItemClick = (item: string) => {
    switch (item) {
      case THREE_DOT_MENU_ITEMS[0]: //rename
        setRenaming(true);
        break;
      case THREE_DOT_MENU_ITEMS[1]: //delete
        deleteCard(id);
        break;
      default:
        break;
    }
  };

  const handleEnter = () => {
    setRenaming(false);
  };

  return (
    <div className={classes}>
      <div className="card-common_title-container">
        {renaming ? (
          <InputText
            value={title}
            handleEnter={handleEnter}
            placeholder="Enter name"
            handleInput={handleInput}
          />
        ) : (
          <div className="card-common_title">{title}</div>
        )}
      </div>
      <div className="card-common_buttons">
        <Button text="Переименовать" handleClick={handleRenameClick}></Button>
        <Button text="Удалить" handleClick={handleDeleteClick}></Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: FullStateType) => ({
  boardId: state.basic.currentBoard,
});

export default connect(mapStateToProps, {
  renameCard,
  deleteCard,
})(Card);
