import moment from "moment";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/auth.context";
import TaskService from "../../../services/task.service";

import "./TaskDetail.css";

function TaskDetail({ task, isAllowedToChangeStatus, isAllowedToDelete }) {
    const { userId } = useContext(AuthContext);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [date, setDate] = useState(task.date);
    const navigate = useNavigate();

    const onUpdateTask = async () => {
        await TaskService.updateTask(userId, task.id, {
            title,
            description,
            date
        });

        navigate(-1);
    };

    const onDeleteTask = async () => {
        await TaskService.deleteTask(userId, task.id);
        navigate(-1);
    };

    const onCompleteTask = async () => {
        await TaskService.completeTask(userId, task);
        navigate(-1);
    };

    const onCancelTask = async () => {
        await TaskService.cancelTask(userId, task);
        navigate(-1);
    };

    return (
        <div className="TaskDetail-container">
            <form className="TaskDetail-form" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="title"><b>Title</b></label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter Title" name="title" required />
                </div>
                <div>
                    <label htmlFor="description"><b>Description</b></label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter Description" name="description" />
                </div>
                <div>
                    <label htmlFor="date"><b>Date</b></label>
                    <input type="date" value={moment(date).format("YYYY-MM-DD")} onChange={e => setDate(e.target.value)} placeholder="Enter Title" name="date" />
                </div>

                {isAllowedToChangeStatus && (
                    !task.isCompleted
                        ? <button className="button button-info" onClick={onCompleteTask}>Complete Task</button>
                        : <button className="button button-warning" onClick={onCancelTask}>Cancel Task</button>
                )}
                
                {!task.isCompleted && (
                    <button className="button button-success" onClick={onUpdateTask}>Update</button>
                )}

                {isAllowedToDelete &&
                    <button className="button button-danger" onClick={onDeleteTask}>Delete</button>}
            </form>
        </div>
    );
}

export default TaskDetail;
