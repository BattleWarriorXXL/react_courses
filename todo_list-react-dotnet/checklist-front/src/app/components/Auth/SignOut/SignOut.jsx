import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/auth.context";
import AuthService from "../../../services/auth.service";

import "./SignOut.css";

function SignOut() {
    const {setCurrentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        AuthService.signOut();
        setCurrentUser(null);
        navigate("/");
    };

    return (
        <button className="button button-info" onClick={handleSignOut}>Logout</button>
    );
}

export default SignOut;
