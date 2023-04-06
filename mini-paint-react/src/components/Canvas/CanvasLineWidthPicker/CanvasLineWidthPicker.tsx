import React, { useState } from "react";
import { RxBorderWidth } from "react-icons/rx";

import Width from "../../../enums/width.enum";
import CanvasLineWidthItem from "./CanvasLineWidthItem/CanvasLineWidthItem";

import "./CanvasLineWidthPicker.css";

interface ICanvasLineWidthPickerProps {
    onWidthSelected: (width: Width) => void;
}

const CanvasLineWidthPicker = (props: ICanvasLineWidthPickerProps) => {
    const [selectedWidth, setSelectedWidth] = useState<Width>(Width.XSmall);

    const handleWidthSelect = (width: Width) => {
        setSelectedWidth(width);
        props.onWidthSelected(width);
    };

    return (
        <div className="canvas-line-witdth-picker-wrapper">
            <RxBorderWidth size={32} />
            <CanvasLineWidthItem
                isSelected={selectedWidth === Width.XSmall}
                width={Width.XSmall}
                onClick={() => handleWidthSelect(Width.XSmall)} />
            <CanvasLineWidthItem
                isSelected={selectedWidth === Width.Small}
                width={Width.Small}
                onClick={() => handleWidthSelect(Width.Small)} />
            <CanvasLineWidthItem
                isSelected={selectedWidth === Width.Medium}
                width={Width.Medium}
                onClick={() => handleWidthSelect(Width.Medium)} />
            <CanvasLineWidthItem
                isSelected={selectedWidth === Width.Large}
                width={Width.Large}
                onClick={() => handleWidthSelect(Width.Large)} />
            <CanvasLineWidthItem
                isSelected={selectedWidth === Width.XLarge}
                width={Width.XLarge}
                onClick={() => handleWidthSelect(Width.XLarge)} />
        </div>
    );
};

export default CanvasLineWidthPicker;
