import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { FaImages, FaPaintBrush, FaUsers } from "react-icons/fa";

import PrivateRoutes from "./components/Auth/PrivateRoutes/PrivateRoutes";
import AuthorizationRoutes from "./components/Auth/AuthorizationRoutes/AuthorizationRoutes";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import Header from "./components/Layout/Header/Header";
import Main from "./components/Layout/Main/Main";
import SideMenu from "./components/Layout/Menu/SideMenu/SideMenu";
import MenuItem from "./components/Layout/Menu/MenuItem/MenuItem";
import AuthProvider from "./providers/auth.provider";

import "./App.css";
import UserList from "./components/UserList/UserList";
import ImagesList from "./components/ImagesList/ImagesList";
import Canvas from "./components/Canvas/Canvas";

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
                        <Route element={<AuthorizationRoutes />}>
                            <Route path="/sign-in" element={<SignIn />} />
                            <Route path="/sign-up" element={<SignUp />} />
                        </Route>
                        <Route element={<PrivateRoutes />}>
                            <Route path="/canvas" element={<Canvas />} />
                            <Route path="/images" element={<ImagesList />} />
                            <Route path="/users" element={<UserList />} />
                        </Route>
                        <Route path="*" element={<Navigate replace to={"/canvas"} />} />
                    </Routes>
                </Main>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
