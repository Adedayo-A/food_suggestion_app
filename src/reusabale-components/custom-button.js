import React from 'react';

import '../static/reusable-components/custom-button.scss'

export const CustomButton = ({style, onClick, children, disabled}) => {
    return (
        <button className="custom-button" style={style} onClick={onClick} disabled={disabled}>
            { children }
        </button>
    )
}