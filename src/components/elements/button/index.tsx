import React from 'react';
import './styles.scss';

type PropType = {
    handleClick: () => void,
    text: string,
    className?: string
}

const Button: React.FC<PropType> = (props) => {
    const { handleClick, text, className } = props
    const classes = className? `button-common ${className}` : 'button-common'

    return (
    <button className={classes} onClick={handleClick}>{ text }</button>

    )
} 

export default Button