import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const modalRoot = document.getElementById("modal-root");

function Modal({title, show, onClose, children}) {
    const element = document.createElement("div");

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.keyCode === 27) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscape);

        modalRoot.appendChild(element);

        return () => {
            window.removeEventListener("keydown", handleEscape);
            modalRoot.removeChild(element);
        };
    }, [element, onClose]);

    return show && ReactDOM.createPortal((
        <div className="Modal-container" onClick={onClose}>
            <div className="Modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="Modal-header">
                    <h3>{title ?? "Modal"}</h3>
                </div>
                <div className="Model-body">
                    {children}
                </div>
            </div>
        </div>
    ), element);
}

export default Modal;
