import { React } from "react";

import "./Navigation.css";

function Navigation({children}) {
    return (
        <nav className="Navigation-container">
            {children}
        </nav>
    );
}

export default Navigation;
