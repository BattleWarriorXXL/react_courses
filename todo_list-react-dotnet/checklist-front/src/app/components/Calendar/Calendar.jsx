import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import AuthContext from "../../contexts/auth.context";
import TaskService from "../../services/task.service";
// import Modal from "../Modal/Modal";
// import TaskDetail from "../Task/TaskDetail/TaskDetail";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarBody from "./CalendarBody/CalendarBody";

import "./Calendar.css";

function Calendar({ onTaskSelected }) {
    const {userId} = useContext(AuthContext);
    const [date, setDate] = useState(moment());
    //const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskService.getAllTasks(userId);
            setTasks(data);
        };

        fetchTasks();
    }, [userId]);    

    // const onTaskUpdated = (updatedTask) => {
    //     tasks[tasks.findIndex(t => t.id === updatedTask.id)] = updatedTask;
    //     setShowTaskDetailModal(false);
    // };

    // const onTaskDeleted = (task) => {
    //     setTasks(tasks.filter(t => t.id !== task.id));
    //     setShowTaskDetailModal(false);
    // };

    // const onTaskCompleted = (completedTask) => {
    //     tasks[tasks.findIndex(t => t.id === completedTask.id)] = completedTask;
    //     setShowTaskDetailModal(false);
    // };
    
    // const onTaskCancelled = (cancelledTask) => {
    //     tasks[tasks.findIndex(t => t.id === cancelledTask.id)] = cancelledTask;
    //     setShowTaskDetailModal(false);
    // };

    return (
        <>
            <div className="Calendar-container">
                <CalendarHeader
                    date={date}
                    onDateChange={(date) => setDate(date)} />
                <CalendarBody
                    date={date}
                    tasks={tasks}
                    onTasksChanged={tasks => setTasks(tasks)}
                    onTaskSelected={(task) => onTaskSelected(task)} />
            </div>
            
            {/* <Modal title={"Task details"} show={showTaskDetailModal} onClose={() => setShowTaskDetailModal(false)}>
                <TaskDetail
                    task={null}
                    onTaskUpdated={(updatedTask) => onTaskUpdated(updatedTask)}
                    onTaskDeleted={onTaskDeleted}
                    onTaskCompleted={(completedTask) => onTaskCompleted(completedTask)}
                    onTaskCancelled={(cancelledTask) => onTaskCancelled(cancelledTask)}
                    isAllowedToChangeStatus={true}
                    isAllowedToDelete={true} />
            </Modal> */}
        </>
    );
}

export default Calendar;
