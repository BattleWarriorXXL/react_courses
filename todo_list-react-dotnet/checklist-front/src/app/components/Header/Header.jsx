import React from "react";
import { Link } from "react-router-dom";

import Profile from "../Profile/Profile";
import SignOut from "../Auth/SignOut/SignOut";

import "./Header.css";

function Header() {
    return (
        <header className="Header-container">
            <Link to="/"><h2>Check List</h2></Link>
            <div className="Header-profile_section">
                <Profile />
                <SignOut />
            </div>
        </header>
    );
}

export default Header;
