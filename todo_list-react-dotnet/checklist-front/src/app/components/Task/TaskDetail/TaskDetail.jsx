import moment from "moment";
import React, { useContext, useState } from "react";
import AuthContext from "../../../contexts/auth.context";
import TaskService from "../../../services/task.service";

import "./TaskDetail.css";

function TaskDetail({ task, onTaskCompleted, onTaskCancelled, onTaskUpdated, onTaskDeleted, isAllowedToChangeStatus, isAllowedToDelete }) {
    const { userId } = useContext(AuthContext);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [date, setDate] = useState(task.date);

    const onUpdateTask = async () => {
        const updatedTask = await TaskService.updateTask(userId, task.id, {
            title,
            description,
            date
        });

        onTaskUpdated(updatedTask);
    };

    const onDeleteTask = async () => {
        await TaskService.deleteTask(userId, task.id);
        onTaskDeleted(task);
    };

    const onCompleteTask = async () => {
        // eslint-disable-next-line no-debugger
        debugger;
        const completedTask = await TaskService.completeTask(userId, task);
        onTaskCompleted(completedTask);
    };

    const onCancelTask = async () => {
        const canceledTask = await TaskService.cancelTask(userId, task);
        onTaskCancelled(canceledTask);
    };

    return (
        <form className="TaskDetail-form-container" onSubmit={(e) => e.preventDefault()}>
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
    );
}

export default TaskDetail;
