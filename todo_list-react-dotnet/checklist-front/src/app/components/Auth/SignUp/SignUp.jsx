import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthService from "../../../services/auth.service";
import AuthType from "../../../utils/auth.types";

import "./SignUp.css";

function SignUp({onAuthTypeChanged}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmitSignUp = async (e) => {
        e.preventDefault();

        await AuthService.signUp(email, password);
        navigate(location.pathname);
    };

    return (
        <form className="SignIn-form-container" onSubmit={onSubmitSignUp}>
            <h1>Sign Up</h1>

            <div>
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" name="email" required />
            </div>
            
            <div>
                <label htmlFor="password"><b>Password</b></label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" name="password" required />
            </div>
            
            <button type="submit" className="button button-success">Sign Up</button>
            <button type="button" className="button button-info" onClick={() => onAuthTypeChanged(AuthType.SingIn)}>Try Sign In</button>
        </form>
    );
}

export default SignUp;