import { FirebaseError } from "firebase/app";
import React, { FormEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../../contexts/auth.context";
import AuthService from "../../../services/auth.service";
import ErrorModal from "../../ErrorModal/ErrorModal";
import Button from "../../Layout/Button/Button";
import Form from "../../Layout/Form/Form";
import Input from "../../Layout/Input/Input";

import "./SignIn.css";

const SignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { setAuthUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSignInSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            const user = await AuthService.signIn(email, password);
            setAuthUser(user);
            navigate("/");
        }
        catch (error: unknown) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                case "auth/invalid-email":
                    setErrorMessage("Please enter a valid email address.");
                    break;
                case "auth/user-not-found":
                    setErrorMessage(`User with ${email} email doesn't found.`);
                    break;
                case "auth/wrong-password":
                    setErrorMessage("Wrong password.");
                    break;
                case "auth/too-many-requests":
                    setErrorMessage("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.");
                    break;
                default:
                    console.log(error);
                    setErrorMessage("An error occurred. Please try again later.");
                }
            }
        }
    };

    const handleSignUpRedirect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate("/sign-up");
    };

    return (
        <div className="sign-in">
            <div className="sign-in-form-container">
                <Form title={"Sign In"} onSubmit={handleSignInSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Button title="Sign In" type="submit" />
                    <Button title="No account. Try to sign up" onClick={handleSignUpRedirect} />
                </Form>
            </div>
            <ErrorModal
                errorMessage={errorMessage}
                onErrorModalClose={() => setErrorMessage(null)} />
        </div>
    );
};

export default SignIn;
