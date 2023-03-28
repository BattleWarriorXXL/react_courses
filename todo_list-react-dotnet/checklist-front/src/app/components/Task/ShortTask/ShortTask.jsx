import React from "react";

import "./ShortTask.css";

function ShortTask({ task, onTaskClicked }) {
    const onShortTaskClicked = (e) => {
        e.stopPropagation();
        onTaskClicked(task);
    };

    return (
        <div
            className={!task.isCompleted ? "ShortTask-task" : "ShortTask-task ShortTask-task__completed"}
            onClick={onShortTaskClicked}>
            <span>{task.title}</span>
        </div>
    );
}

export default ShortTask;
