import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useAppDispatch } from "../../../hooks/store.hook";
import { signIn } from "../../../store/auth/auth.actions";
import ErrorModal from "../../ErrorModal/ErrorModal";
import Button from "../../../shared/Button/Button";
import Form from "../../../shared/Form/Form";
import Input from "../../../shared/Input/Input";
import Loader from "../../../shared/Loader/Loader";

import "./SignIn.css";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated)
            navigate("/images");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    useEffect(() => {
        if (error)
            setErrorMessage(error);
    }, [error]);

    const handleSignInSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        await dispatch(signIn({ email, password }));
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
                        onValueChanged={setEmail} />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="password"
                        onValueChanged={setPassword} />
                    <Button title="Sign In" type="submit" />
                    <Button title="No account. Try to sign up" onClick={handleSignUpRedirect} />
                </Form>
            </div>
            { loading && <Loader /> }
            <ErrorModal
                errorMessage={errorMessage}
                onErrorModalClose={() => setErrorMessage(null)} />
        </div>
    );
};

export default SignIn;
