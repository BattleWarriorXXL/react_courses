import React, { useState } from "react";
import AuthType from "../../../utils/auth.types";

import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

import "./AuthForm.css";

function AuthForm() {
    const [authType, setAuthType] = useState(AuthType.SingIn);

    return (
        <div className="AuthForm-container">
            {authType == AuthType.SingIn
                ? <SignIn onAuthTypeChanged={setAuthType} />
                : <SignUp onAuthTypeChanged={setAuthType} />
            }
        </div>
    );
}

export default AuthForm;
