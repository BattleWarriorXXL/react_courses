import React from "react";

import "./Footer.css";

function Footer() {
    return (
        <footer className="Footer-container">
            <p>Copyright © {new Date().getFullYear()}</p>
        </footer>
    );
}

export default Footer;
