import React, { useState } from "react";
import { CardType, ColumnType } from "../../../models";
import Card from "../card";
import Button from "../button";
import Dialog from "../dialog";
import ThreeDotMenu from "../three-dot-menu";
import InputText from "../inputText";
import { THREE_DOT_MENU_ITEMS } from "../../../constants";
import { connect } from "react-redux";
import {
  addCard,
  renameColumn,
  deleteColumn,
} from "../../../redux/basic/actions";
import {
  AddCardActionType,
  RenameColumnActionType,
  DeleteColumnActionType,
} from "../../../redux/basic/actions/actionTypes";
import "./styles.scss";
import { getCardsForColumn, getCurrentColumns } from "../../../selectors";
import { FullStateType } from "../../../redux/store";

type PropType = {
  cards: CardType[];
  column: ColumnType;
  addCard: (colId: number, title: string) => AddCardActionType;
  renameColumn: (id: number, newTitle: string) => RenameColumnActionType;
  deleteColumn: (id: number) => DeleteColumnActionType;
};

const Column: React.FC<PropType> = (props) => {
  const { id, title, boardId } = props.column;
  const { cards, addCard, renameColumn, deleteColumn } = props;

  const [inputValue, setInputValue] = useState("");
  const [renaming, setRenaming] = useState(false);

  const dialogClassName = `dialog-create-card-${id}`;

  const openDialog = () => {
    const dialog: any = document.querySelector(`.${dialogClassName}`);
    dialog.showModal();
  };

  const closeDialog = () => {
    const dialog: any = document.querySelector(`.${dialogClassName}`);
    dialog.close();
  };

  const closeAndSet = () => {
    if (inputValue.length > 0) {
      const dialog: any = document.querySelector(`.${dialogClassName}`);
      dialog.close();
      addCard(id, inputValue);
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

  const handleRenameInput = (val: string) => {
    renameColumn(id, val);
  };

  const handleRenameClick = () => {
    setRenaming(true);
  };

  const handleDeleteClick = () => {
    deleteColumn(id);
  };

  const handleColumnMenuClick = (item: string) => {
    switch (item) {
      case THREE_DOT_MENU_ITEMS[0]:
        setRenaming(true);
        break;

      case THREE_DOT_MENU_ITEMS[1]:
        deleteColumn(id);
        break;

      default:
        break;
    }
  };

  return (
    <div className="column-common">
      <div className="column-common_heading">
        <div className="column-common_heading_title">
          {renaming ? (
            <InputText
              placeholder="Введите название колонки"
              handleInput={handleRenameInput}
              handleEnter={() => setRenaming(false)}
              value={title}
            ></InputText>
          ) : (
            <div className="column-common_heading_text">{title}</div>
          )}
        </div>
        <div className="column-common_heading_buttons">
          <Button text="Переименовать" handleClick={handleRenameClick}></Button>
          <Button text="Удалить" handleClick={handleDeleteClick}></Button>
        </div>
      </div>
      <Dialog
        placeholder="Введите название карточки"
        inputValue={inputValue}
        handleInput={handleInput}
        handleSetClick={closeAndSet}
        handleCancelClick={closeDialog}
        handleEnter={handleEnter}
        className={dialogClassName}
      ></Dialog>
      <div className="column-common_cards-container">
        <div className="column-common_button-container">
          <Button text="Создать Карточку" handleClick={handleClick}></Button>
        </div>
        {cards.length ? (
          cards.map((c) => <Card key={c.id} card={c}></Card>)
        ) : (
          <div className="column-common_no-cards">
            Нажмите "Создать Карточку"
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: FullStateType, props: any) => ({
  // @ts-ignore
  cards: getCardsForColumn(state, props),
});

export default connect(mapStateToProps, {
  addCard,
  renameColumn,
  deleteColumn,
})(Column);
