import React from "react";

import "./Button.css";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
}

const Button = (props: IButtonProps) => {
    return (
        <button className="button" onClick={props.onClick}>
            {props.title}
        </button>
    );
};

export default Button;
