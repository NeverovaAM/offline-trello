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

  return (
    <div className={classes}>
      <div className="menu-container">
        <ThreeDotMenu
          handleClick={onMenuItemClick}
          items={THREE_DOT_MENU_ITEMS}
        ></ThreeDotMenu>
      </div>
      {renaming ? (
        <InputText placeholder="Enter name" handleInput={handleInput} />
      ) : (
        <div>{title}</div>
      )}
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
