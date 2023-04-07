import React, { useState } from "react";

import CanvasColorItem from "./CanvasColorItem/CanvasColorItem";
import Color from "../../../enums/color.enum";

import "./CanvasColorPicker.css";

interface ICanvasColorPickerProps {
    title: React.ReactNode;
    onColorSelected: (color: Color) => void;
    hasTransparentColor?: boolean;
}

const CanvasColorPicker = (props: ICanvasColorPickerProps) => {
    const [selectedColor, setSelectedColor] = useState<Color>(Color.Black);

    const onColorClick = (color: Color) => {
        setSelectedColor(color);
        props.onColorSelected(color);
    };

    return (
        <div className="canvas-color-picker-wrapper">
            {props.title}
            <CanvasColorItem color={Color.Black} isSelected={selectedColor === Color.Black} onClick={() => onColorClick(Color.Black)} />
            <CanvasColorItem color={Color.White} isSelected={selectedColor === Color.White} onClick={() => onColorClick(Color.White)} />
            <CanvasColorItem color={Color.Red} isSelected={selectedColor === Color.Red} onClick={() => onColorClick(Color.Red)} />
            <CanvasColorItem color={Color.Green} isSelected={selectedColor === Color.Green} onClick={() => onColorClick(Color.Green)} />
            <CanvasColorItem color={Color.Blue} isSelected={selectedColor === Color.Blue} onClick={() => onColorClick(Color.Blue)} />
            {props.hasTransparentColor &&
                <CanvasColorItem color={Color.Transparent} isSelected={selectedColor === Color.Transparent} onClick={() => onColorClick(Color.Transparent)} />
            }
        </div>
    );
};

export default CanvasColorPicker;
