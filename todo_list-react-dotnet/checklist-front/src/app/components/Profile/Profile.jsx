import { React, useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import AuthContext from "../../contexts/auth.context";

import "./Profile.css";

function Profile() {
    const {currentUser} = useContext(AuthContext);

    return (
        <div className="Profile-container">
            <AiOutlineUser size={28} />
            <h3>{currentUser.userEmail}</h3>
        </div>
    );
}

export default Profile;
