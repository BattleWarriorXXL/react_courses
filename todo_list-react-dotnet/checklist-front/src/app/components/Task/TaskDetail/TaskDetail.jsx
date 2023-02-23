import moment from "moment";
import React, { useContext, useState } from "react";
import AuthContext from "../../../contexts/auth.context";
import TaskService from "../../../services/task.service";

import "./TaskDetail.css";

function TaskDetail({ task, onTaskUpdated }) {
    const { userId } = useContext(AuthContext);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [date, setDate] = useState(task.date);

    const onSubmitUpdateTask = async (e) => {
        e.preventDefault();

        const updatedTask = await TaskService.updateTask(userId, task.id, {
            title,
            description,
            date
        });

        onTaskUpdated(updatedTask);
    };

    return (
        <form className="TaskDetail-form-container" onSubmit={onSubmitUpdateTask}>
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

            <button type="submit" className="button button-success">Update</button>
        </form>
    );
}

export default TaskDetail;
