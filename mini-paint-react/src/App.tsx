import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { FaImages, FaPaintBrush, FaUsers } from "react-icons/fa";

import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import PrivateRoutes from "./components/Auth/PrivateRoutes/PrivateRoutes";
import Header from "./components/Layout/Header/Header";
import Main from "./components/Layout/Main/Main";

import "./App.css";
import SideMenu from "./components/Layout/Menu/SideMenu/SideMenu";
import MenuItem from "./components/Layout/Menu/MenuItem/MenuItem";
import AuthProvider from "./providers/auth.provider";

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const onToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <BrowserRouter>
            <AuthProvider>
                <Header isOpen={isMenuOpen} onToggleMenu={onToggleMenu} />
                <SideMenu isOpen={isMenuOpen} onClose={onToggleMenu}>
                    <MenuItem title="Canvas" path="/canvas" icon={<FaPaintBrush size={20} />} />
                    <MenuItem title="Images" path="/images" icon={<FaImages size={20} />} />
                    <MenuItem title="Users" path="/users" icon={<FaUsers size={20} />} />
                </SideMenu>
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
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
