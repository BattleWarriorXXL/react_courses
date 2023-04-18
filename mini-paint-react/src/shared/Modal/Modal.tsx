import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const modalRoot = document.getElementById("modal-root")!;

interface IModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = (props: IModalProps) => {
    const element = document.createElement("div");

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                props.onClose();
            }
        };

        window.addEventListener("keydown", handleEscape);

        modalRoot.appendChild(element);

        return () => {
            window.removeEventListener("keydown", handleEscape);
            modalRoot.removeChild(element);
        };
    });

    if (!props.isOpen)
        return null;

    return ReactDOM.createPortal((
        <div className="Modal-container" onClick={props.onClose}>
            <div className="Modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="Modal-header" onClick={() => props.onClose()}>
                    <h3>{props.title ?? "Modal"}</h3>
                </div>
                <div className="Modal-body">
                    {props.children}
                </div>
            </div>
        </div>
    ), element);
};

export default Modal;
