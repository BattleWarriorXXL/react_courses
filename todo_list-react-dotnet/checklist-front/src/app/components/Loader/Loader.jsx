import { React, useEffect } from "react";
import ReactDOM from "react-dom";

import "./Loader.css";

const spinnerRoot = document.getElementById("spinner-root");

function Loader({ isLoading }) {
    const element = document.createElement("div");

    useEffect(() => {
        spinnerRoot.appendChild(element);

        return () => {
            spinnerRoot.removeChild(element);
        };
    }, [element]);

    return isLoading && ReactDOM.createPortal((
        <div className="Loader-container">
            <div className="Loader-spinner">

            </div>
        </div>
    ), element);
}

export default Loader;
