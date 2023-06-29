import React from 'react';
import './Button.css';

export default function Button(props) {
    let classNameButton = 'button ';
    classNameButton += props.operation ? 'operation': '';
    classNameButton += props.double ? 'double': '';
    classNameButton += props.triple ? 'triple': '';

    return (
        <button 
        onClick={e => props.click && props.click(props.label)}
        className={classNameButton}
        > 
        {props.label} 
        </button>
    );
};