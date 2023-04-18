import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/auth.context";
import AuthService from "../../../services/auth.service";
import Button from "../../../shared/Button/Button";

import "./Profile.css";

const Profile = () => {
    const { authUser, setAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await AuthService.signOut();
        setAuthUser(null);
        
        navigate("/sign-in");
    };

    return (
        <div className="profile-wrapper">
            <label>Hi, {authUser?.username}!</label>
            <Button
                title="Sign out"
                onClick={handleSignOut} />
        </div>
    );
};

export default Profile;
