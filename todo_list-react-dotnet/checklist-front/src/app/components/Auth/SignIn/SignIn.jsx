import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/auth.context";

import AuthService from "../../../services/auth.service";
import AuthType from "../../../utils/auth.types";

import "./SignIn.css";

function SignIn({onAuthTypeChanged}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setCurrentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmitSignIn = async (e) => {
        e.preventDefault();
    
        const currentUser = await AuthService.signIn(email, password);
        setCurrentUser(currentUser);
        
        navigate(location.pathname);
    };

    return (
        <form className="SignIn-form-container" onSubmit={onSubmitSignIn}>
            <h1>Sign In</h1>

            <div>
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" name="email" required />
            </div>
            
            <div>
                <label htmlFor="password"><b>Password</b></label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" name="password" required />
            </div>
            
            <button type="submit" className="button button-success">Sign In</button>
            <button type="button" className="button button-info" onClick={() => onAuthTypeChanged(AuthType.SingUp)}>Try Sign Up</button>
        </form>
    );
}

export default SignIn;
