import React from "react";
import { ImSpinner8 } from "react-icons/im";

import "./Loader.css";

const Loader = () => {
    return (
        <div className="Loader">
            <ImSpinner8 className="Loader__spinner" size={64} />
        </div>
    );
};

export default Loader;
