import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";

import Input from "../../Layout/Input/Input";

import "./CanvasSavingForm.css";

interface ICanvasSavingFormProps {
    onSaveClick: (title: string) => void;
}

const CanvasSavingForm = (props: ICanvasSavingFormProps) => {
    const [imageTitle, setImageTitle] = useState<string>("New image");

    return (
        <div className="canvas-saving-form-wrapper">
            <Input
                label="Image name"
                hideLabel={true}
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)} />
            <AiOutlineSave className="canvas-action" size={38} onClick={() => props.onSaveClick(imageTitle)} />
        </div>
    );
};

export default CanvasSavingForm;
