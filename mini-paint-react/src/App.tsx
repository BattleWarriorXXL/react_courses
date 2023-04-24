import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { FaImages, FaPaintBrush, FaUsers } from "react-icons/fa";

import PrivateRoutes from "./components/Auth/PrivateRoutes/PrivateRoutes";
import AuthorizationRoutes from "./components/Auth/AuthorizationRoutes/AuthorizationRoutes";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import Header from "./shared/Header/Header";
import Main from "./shared/Main/Main";
import SideMenu from "./shared/Menu/SideMenu/SideMenu";
import MenuItem from "./shared/Menu/MenuItem/MenuItem";
import AuthProvider from "./providers/auth.provider";
import UserList from "./components/UserList/UserList";
import ImagesList from "./components/ImagesList/ImagesList";
import Canvas from "./components/Canvas/Canvas";
import LocationProvider from "./providers/location.provider";

import "./App.css";
import LocationService from "./services/location.service";

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
   
    const onToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <BrowserRouter>
            <LocationProvider>
                <AuthProvider>
                    <Header isOpen={isMenuOpen} onToggleMenu={onToggleMenu} />
                    <SideMenu isOpen={isMenuOpen} onClose={onToggleMenu}>
                        <MenuItem title="Images" path="/images" icon={<FaImages size={20} />} />
                        <MenuItem title="Canvas" path="/canvas" icon={<FaPaintBrush size={20} />} />
                        <MenuItem title="Users" path="/users" icon={<FaUsers size={20} />} />
                    </SideMenu>
                    <Main>
                        <Routes>
                            <Route element={<AuthorizationRoutes />}>
                                <Route path="/sign-in" element={<SignIn />} />
                                <Route path="/sign-up" element={<SignUp />} />
                            </Route>
                            <Route element={<PrivateRoutes />}>
                                <Route path="/images" element={<ImagesList />} />
                                <Route path="/canvas" element={<Canvas />} />
                                <Route path="/users" element={<UserList />} />
                            </Route>
                            <Route path="*" element={<Navigate replace to={LocationService.getLastLocation()} />} />
                        </Routes>
                    </Main>
                </AuthProvider>
            </LocationProvider>
        </BrowserRouter>
    );
};

export default App;
