import React from "react";

import "./Form.css";

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    title: string;
    children: React.ReactNode;
}

const Form = (props: IFormProps) => {
    return (
        <form className="form" onSubmit={props.onSubmit}>
            <h3>{props.title}</h3>
            {React.Children.map(props.children, (child) => {
                if (React.isValidElement(child)) {
                    return (
                        <>
                            {child}
                        </>
                    );
                }

                return null;
            })}
        </form>
    );
};

export default Form;
