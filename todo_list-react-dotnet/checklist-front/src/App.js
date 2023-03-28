import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import { BiTask, BiCalendar } from "react-icons/bi";

import Header from "./app/components/Header/Header";
import Footer from "./app/components/Footer/Footer";
import Navigation from "./app/components/Navigation/Navigation";

import "./App.css";

import AuthProvider from "./app/providers/auth.provider";
import Calendar from "./app/components/Calendar/Calendar";
import TaskList from "./app/components/TaskList/TaskList";
import Modal from "./app/components/Modal/Modal";
import Loader from "./app/components/Loader/Loader";
import AuthService from "./app/services/auth.service";
import TaskDetail from "./app/components/Task/TaskDetail/TaskDetail";
import CreateTask from "./app/components/Task/CreateTask/CreateTask";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorModalShow, setIsErrorModalShow] = useState(false);
    const [errorModalTitle, setErrorModalTitle] = useState("");
    const [errorModalMessage, setErrorModalMessage] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);

    const onRequestInterceptor = (request) => {
        setIsLoading(true);
        return request;
    };

    const onResponseInterceptor = (response) => {
        setIsLoading(false);
        return response;
    };

    const onErrorResponseInterceptor = (errorResponse) => {
        setIsLoading(false);

        if (errorResponse.response) {
            if (errorResponse.response && errorResponse.response.status === 401) {
                handle401Error(errorResponse.response.data.message);
            }
            else if (errorResponse.response && errorResponse.response.status === 500) {
                handle500Error(errorResponse.response.data.message);
            }
            else {
                handleError(errorResponse.response);
            }
        }
       
        return Promise.reject(errorResponse);
    };

    const handleError = (errorMessage) => {
        setIsErrorModalShow(true);
        setErrorModalTitle("Unhandled exception");
        setErrorModalMessage(errorMessage);
    };

    const handle401Error = (errorMessage) => {
        setIsErrorModalShow(true);
        setErrorModalTitle("Access denied");
        setErrorModalMessage(errorMessage);
    };

    const handle500Error = (errorMessage) => {
        setIsErrorModalShow(true);
        setErrorModalTitle("Internal Error");
        setErrorModalMessage(errorMessage);
    };

    AuthService.authApi.interceptors.request.use(
        (request) => onRequestInterceptor(request)
    );

    AuthService.authApi.interceptors.response.use(
        (response) => onResponseInterceptor(response),
        (error) => onErrorResponseInterceptor(error)
    );

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
                        <Route path="/tasks" element={<TaskList onTaskSelected={task => setSelectedTask(task)} />} />
                        <Route path="/tasks/create" element={<CreateTask />} />
                        <Route path="/tasks/detail" element={
                            <TaskDetail
                                task={selectedTask}
                                isAllowedToChangeStatus={true}
                                isAllowedToDelete={true} />
                        } />
                        <Route path="/calendar" element={<Calendar onTaskSelected={task => setSelectedTask(task)} />} />
                        <Route path="*" element={<Navigate replace to="/calendar" />} />
                    </Routes>
                </main>
                <Footer />
            </AuthProvider>
            <Modal title={errorModalTitle} show={isErrorModalShow} onClose={() => setIsErrorModalShow(false)}>
                <div>
                    {errorModalMessage}
                </div>
            </Modal>
            <Loader isLoading={isLoading} />
        </Router>
    );
}

export default App;
