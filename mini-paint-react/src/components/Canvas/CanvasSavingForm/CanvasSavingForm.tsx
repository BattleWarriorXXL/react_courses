import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";

import Input from "../../../shared/Input/Input";

import "./CanvasSavingForm.css";

interface ICanvasSavingFormProps {
    onSaveClick: (title: string) => void;
}

const CanvasSavingForm = ({ onSaveClick }: ICanvasSavingFormProps) => {
    const [imageTitle, setImageTitle] = useState<string>("New image");

    return (
        <div className="canvas-saving-form-wrapper">
            <Input
                label="Image name"
                hideLabel={true}
                onValueChanged={setImageTitle} />
            <AiOutlineSave className="canvas-action" size={38} onClick={() => onSaveClick(imageTitle)} />
        </div>
    );
};

export default CanvasSavingForm;
