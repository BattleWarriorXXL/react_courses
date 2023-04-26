import React from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../../store/store";
import { useAppDispatch } from "../../../hooks/store.hook";
import { signOut } from "../../../store/auth/auth.actions";
import { useSelector } from "react-redux";
import Button from "../../../shared/Button/Button";

import "./Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user: authUser } = useSelector((state: RootState) => state.auth);

    const handleSignOut = async () => {
        await dispatch(signOut());
        
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
