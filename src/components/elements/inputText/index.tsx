import React from "react";
import './styles.scss';

type PropType = {
  placeholder: string;
  handleInput: (text: string) => void;
  handleEnter?: () => void;
  className?: string;
  value?: string;
};

const InputText: React.FC<PropType> = (props) => {    
  const { placeholder, handleInput, className, value, handleEnter } = props;
  const classes = className ? `input-common ${className}` : "input-common";
  const initValue = value ? value : "";

  const handleChange = (evt: any) => {
      handleInput(evt.target.value)
  }

  const onKeyUp = (evt: any) => {
      if (evt.keyCode === 13) {
        handleEnter && handleEnter()
      }
  }

  return (
    <input
      placeholder={placeholder}
      value={initValue}
      className={classes}
      onChange={handleChange}
      onKeyUp={onKeyUp}
    ></input>
  );
};

export default InputText
