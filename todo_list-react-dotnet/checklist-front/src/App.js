import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import { BiTask, BiCalendar } from "react-icons/bi";

import Header from "./app/components/Header/Header";
import Footer from "./app/components/Footer/Footer";
import Navigation from "./app/components/Navigation/Navigation";

import "./App.css";
import AuthProvider from "./app/providers/auth.provider";

function App() {

    return (
        <Router>
            <AuthProvider>
                <Header />
                <Navigation>
                    <Link to="/tasks"><BiTask size={28} /> <span>My Tasks</span></Link>
                    <Link to="/calendar"><BiCalendar size={28} /> <span>Calendar</span></Link>
                </Navigation>
                <main className="App-main-container">
                    <Routes>
                        <Route path="/tasks" element={<div>tasks</div>} />
                        <Route path="/calendar" element={<div>calendar</div>} />
                        <Route path="*" element={<Navigate replace to="/calendar" />} />
                    </Routes>
                </main>
                <Footer />
            </AuthProvider>
        </Router>
    );
}

export default App;
