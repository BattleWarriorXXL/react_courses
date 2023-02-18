import React from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

function Modal({children}) {
    return ReactDOM.createPortal(children, <div></div>);
}

export default Modal;
