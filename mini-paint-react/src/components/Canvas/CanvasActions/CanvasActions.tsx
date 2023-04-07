import React from "react";
import { AiOutlineClear } from "react-icons/ai";
import { VscSymbolColor } from "react-icons/vsc";
import { BiColorFill } from "react-icons/bi";

import CanvasColorPicker from "../CanvasColorPicker/CanvasColorPicker";
import CanvasLineWidthPicker from "../CanvasLineWidthPicker/CanvasLineWidthPicker";
import CanvasSavingForm from "../CanvasSavingForm/CanvasSavingForm";
import Color from "../../../enums/color.enum";
import Width from "../../../enums/width.enum";

import "./CanvasActions.css";

interface ICanvasActionsProps {
    onCanvasColorSelected: (color: Color) => void;
    onCanvasFillColorSelected: (color: Color) => void;
    onCanvasLineWidthSelected: (width: Width) => void;
    onCanvasSave: (title: string) => void;
    onCanvasClear: () => void;
}

const CanvasActions = (props: ICanvasActionsProps) => {
    const handleClear = () => {
        props.onCanvasClear();
    };

    return (
        <div className="canvas-actions-wrapper">
            <div className="canvas-actions">
                <CanvasColorPicker
                    title={(<VscSymbolColor size={32} />)}
                    onColorSelected={props.onCanvasColorSelected} />
            </div>
            <div className="canvas-actions">
                <CanvasColorPicker
                    title={(<BiColorFill size={32} />)}
                    hasTransparentColor={true}
                    onColorSelected={props.onCanvasFillColorSelected} />
            </div>
            <div className="canvas-actions">
                <CanvasLineWidthPicker onWidthSelected={props.onCanvasLineWidthSelected} />
            </div>
            <div className="canvas-actions">
                <AiOutlineClear className="canvas-action" size={32} onClick={handleClear} />
            </div>
            <div className="canvas-actions">
                <CanvasSavingForm
                    onSaveClick={(title) => props.onCanvasSave(title) } />
            </div>
        </div>
    );
};

export default CanvasActions;
