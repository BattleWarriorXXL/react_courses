import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";

import "./App.css";
import PrivateRoutes from "./components/Auth/PrivateRoutes/PrivateRoutes";
import Navigation from "./components/Navigation/Navigation";
import NavigationItem from "./components/Navigation/NavigationItem/NavigationItem";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Navigation>
                <NavigationItem title="Canvas" path="/canvas" icon={<div></div>} />
            </Navigation>
            <Main>
                <Routes>
                    <Route path="/auth/sign-in" element={<SignIn />} />
                    <Route path="/auth/sign-up" element={<SignUp />} />
                    <Route path="/" element={"Main"} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/canvas" element={"Canvas"} />
                        <Route path="/users" element={"Users"} />
                        <Route path="/images" element={"Images"} />
                    </Route>
                    <Route path="*" element={<Navigate replace to={"/"} />} />
                </Routes>
            </Main>
        </BrowserRouter>
    );
}

export default App;
