import { FirebaseError } from "firebase/app";
import React, { FormEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../../contexts/auth.context";
import AuthService from "../../../services/auth.service";
import ErrorModal from "../../ErrorModal/ErrorModal";
import Button from "../../Layout/Button/Button";
import Form from "../../Layout/Form/Form";
import Input from "../../Layout/Input/Input";

import "./SignUp.css";

const SignUp = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { setAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUpSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            const user = await AuthService.signUp(email, password, username);
            setAuthUser(user);
            navigate("/");
        }
        catch (error: unknown) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                case "auth/invalid-email":
                    setErrorMessage("Please enter a valid email address.");
                    break;
                case "auth/email-already-in-use":
                    setErrorMessage(`Email ${email} already in use.`);
                    break;
                case "auth/weak-password":
                    setErrorMessage("Password should be at least 6 characters.");
                    break;
                default:                    
                    setErrorMessage("An error occurred. Please try again later.");
                }
            }
        }
    };

    const handleSignInRedirect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate("/sign-in");
    };

    return (
        <>
            <div className="sign-up-form-container">
                <Form title={"Sign Up"} onSubmit={handleSignUpSubmit}>
                    <Input
                        required={true}
                        label="Name"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    <Input
                        required={true}
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Input
                        required={true}
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Button title="Sign Up" type="submit" />
                    <Button title="Already have account? Try to Sign In" onClick={handleSignInRedirect} />
                </Form>
            </div>
            <ErrorModal
                errorMessage={errorMessage}
                onErrorModalClose={() => setErrorMessage(null)} />
        </>
    );
};

export default SignUp;
