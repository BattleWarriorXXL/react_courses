import React, { useCallback, useState } from "react";
import { Guid } from "guid-typescript";

import { debounce } from "../../utils/debounce.utils";

import "./Input.css";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hideLabel?: boolean;
    defaultValue?: string;
    delay?: number;
    onValueChanged: (value: string) => void;
}

const Input = (props: IInputProps) => {
    const [value, setValue] = useState<string>("");

    const inputId = Guid.create().toString();

    const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setValue(value);
        debounceOnChange(value);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceOnChange = useCallback(
        debounce((value: string) => {
            props.onValueChanged(value);
        }, props.delay ?? 0),
        [props.delay, props.onValueChanged]
    );

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
                value={value}
                onChange={handleInputChanged} />
        </div>
        
    );
};

export default Input;
