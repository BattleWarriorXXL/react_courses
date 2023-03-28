import moment from "moment";
import React, { useContext, useState } from "react";

import AuthContext from "../../../contexts/auth.context";
import TaskService from "../../../services/task.service";

import "./CreateTask.css";

function CreateTask({ selectedDate, onTaskCreated }) {
    const { userId } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(moment(selectedDate));
    
    const onSubmitCreateTask = async (e) => {
        e.preventDefault();
        
        const task = {
            title,
            description,
            date: moment(date)
        };

        const createdTask = await TaskService.createTask(userId, task);
        onTaskCreated(createdTask);
    };

    return (
        <form className="CreateTask-form-container" onSubmit={onSubmitCreateTask}>
            <div>
                <label htmlFor="title"><b>Title</b></label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter Title" name="title" required />
            </div>
            <div>
                <label htmlFor="description"><b>Description</b></label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter Description" name="description" />
            </div>

            {!selectedDate &&
                <div>
                    <label htmlFor="date"><b>Date</b></label>
                    <input type="date" value={moment(date).format("YYYY-MM-DD")} onChange={e => setDate(moment(e.target.value))} name="date" required />
                </div>
            }
            
            <button type="submit" className="button button-success">Create</button>
        </form>
    );
}

export default CreateTask;
