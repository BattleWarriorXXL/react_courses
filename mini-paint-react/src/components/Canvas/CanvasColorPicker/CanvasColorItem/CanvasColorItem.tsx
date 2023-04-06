import React from "react";

import Color from "../../../../enums/color.enum";

import "./CanvasColorItem.css";

interface ICanvasColorItemProps {
    color: Color;
    isSelected: boolean;
    onClick: () => void;
}

const CanvasColorItem = (props: ICanvasColorItemProps) => {
    return (
        <div
            className={`canvas-color-item ${props.isSelected ? "active" : ""}`}
            style={{backgroundColor: props.color.toString()}}
            onClick={props.onClick}>
        </div>
    );
};

export default CanvasColorItem;
