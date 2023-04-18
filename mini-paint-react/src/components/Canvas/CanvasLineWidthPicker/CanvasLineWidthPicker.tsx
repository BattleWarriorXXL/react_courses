import React, { useState } from "react";
import { RxBorderWidth } from "react-icons/rx";

import Width from "../../../enums/width.enum";
import CanvasLineWidthItem from "./CanvasLineWidthItem/CanvasLineWidthItem";

import "./CanvasLineWidthPicker.css";

interface ICanvasLineWidthPickerProps {
    widths: Width[];
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
            {props.widths.map((width) => 
                <CanvasLineWidthItem
                    key={width}
                    isSelected={selectedWidth === width}
                    width={width}
                    onClick={() => handleWidthSelect(width)} />
            )}
        </div>
    );
};

export default CanvasLineWidthPicker;
