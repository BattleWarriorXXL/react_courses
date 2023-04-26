import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { signUp } from "../../../store/auth/auth.actions";
import { useAppDispatch } from "../../../hooks/store.hook";

import ErrorModal from "../../ErrorModal/ErrorModal";
import Button from "../../../shared/Button/Button";
import Form from "../../../shared/Form/Form";
import Input from "../../../shared/Input/Input";
import Loader from "../../../shared/Loader/Loader";

import "./SignUp.css";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated, error, loading } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated)
            navigate("/images");
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (error)
            setErrorMessage(error);
    }, [error]);

    const handleSignUpSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        await dispatch(signUp({ email, password, name: username }));
    };

    const handleSignInRedirect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate("/sign-in");
    };

    return (
        <div className="sign-up">
            <div className="sign-up-form-container">
                <Form title={"Sign Up"} onSubmit={handleSignUpSubmit}>
                    <Input
                        required={true}
                        label="Name"
                        type="text"
                        onValueChanged={(value) => setUsername(value.toLocaleLowerCase())} />
                    <Input
                        required={true}
                        label="Email"
                        type="email"
                        onValueChanged={setEmail} />
                    <Input
                        required={true}
                        label="Password"
                        type="password"
                        onValueChanged={setPassword} />
                    <Button title="Sign Up" type="submit" />
                    <Button title="Already have account? Try to Sign In" onClick={handleSignInRedirect} />
                </Form>
            </div>
            { loading && <Loader /> }
            <ErrorModal
                errorMessage={errorMessage}
                onErrorModalClose={() => setErrorMessage(null)} />
        </div>
    );
};

export default SignUp;
