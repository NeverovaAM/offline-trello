import React from "react";
import Button from "../../elements/button";
import InputText from "../../elements/inputText";
import './styles.scss'

type PropType = {
  placeholder: string;
  inputValue: string;
  handleInput: (text: string) => void;
  handleEnter: () => void;
  handleSetClick: () => void;
  handleCancelClick: () => void;
};

const Dialog: React.FC<PropType> = (props) => {
  const {
    placeholder,
    inputValue,
    handleInput,
    handleCancelClick,
    handleEnter,
    handleSetClick,
  } = props;
  return (
    <dialog className="create-dialog">
      <div className="create-dialog_content">
        <InputText
          placeholder={placeholder}
          handleInput={handleInput}
          value={inputValue}
          handleEnter={handleEnter}
        ></InputText>
        <div className="create-dialog_content_buttons">
          <Button text="Готово" handleClick={handleSetClick}></Button>
          <Button text="Отмена" handleClick={handleCancelClick}></Button>
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
