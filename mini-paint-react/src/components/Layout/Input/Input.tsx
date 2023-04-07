import React from "react";
import { Guid } from "guid-typescript";

import "./Input.css";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hideLabel?: boolean;
    defaultValue?: string;
}

const Input = (props: IInputProps) => {
    const inputId = Guid.create().toString();

    return (
        <div className="input-wrapper">
            {!props.hideLabel &&
                <label>{props.label}</label>
            }
            <input
                id={inputId}
                className="input"
                required={props.required}
                type={props.type}
                placeholder={`Type ${props.label.toLocaleLowerCase()} here...`}
                value={props.value}
                onChange={props.onChange} />
        </div>
        
    );
};

export default Input;
