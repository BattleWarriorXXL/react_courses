import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
    AiOutlinePlus,
    AiOutlineCheck,
    AiOutlineEye,
    AiOutlineDelete,
    AiOutlineClose
} from "react-icons/ai";

import AuthContext from "../../contexts/auth.context";
import TaskService from "../../services/task.service";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Modal from "../Modal/Modal";
import CreateTask from "../Task/CreateTask/CreateTask";
import TaskDetail from "../Task/TaskDetail/TaskDetail";

import "./TaskList.css";

function TaskList() {
    const {userId} = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
    const [showCompleteTaskModal, setShowCompleteTaskModal] = useState(false);
    const [showCancelTaskModal, setShowCancelTaskModal] = useState(false);
    
    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskService.getAllTasks(userId);
            setTasks(sortTasks(data));
        };

        fetchTasks();
    }, [userId]);

    const getPastTasks = () => {
        return tasks.filter(task => moment().startOf("day").utc().isAfter(moment(task.date).startOf("day").utc()));
    };

    const getCurrentTasks = () => {
        return tasks.filter(task => moment().startOf("day").utc().isSame(moment(task.date).startOf("day").utc()));
    };

    const getFutureTasks = () => {
        return tasks.filter(task => moment().startOf("day").utc().isBefore(moment(task.date).startOf("day").utc()));
    };

    const sortTasks = (tasks) => {
        return tasks
            .sort((a, b) => moment(a.date).isAfter(moment(b.date)))
            .sort((a, b) => (a.isCompleted === b.isCompleted) ? 0 : !a.isCompleted ? -1 : 1);
    };

    const onTaskCreate = () => {
        setShowCreateTaskModal(true);
    };

    const onTaskDetail = (task) => {
        setSelectedTask(task);
        setShowTaskDetailModal(true);
    };

    const onTaskComplete = (task) => {
        setSelectedTask(task);
        setShowCompleteTaskModal(true);
    };

    const onTaskCancel = (task) => {
        setSelectedTask(task);
        setShowCancelTaskModal(true);
    };

    const completeTask = async (task) => {
        const updatedTask = await TaskService.completeTask(userId, task);
        tasks[tasks.findIndex(t => t.id === updatedTask.id)] = updatedTask;

        setTasks(sortTasks(tasks));
        setShowCompleteTaskModal(false);
    };

    const cancelTask = async (task) => {
        const updatedTask = await TaskService.cancelTask(userId, task);
        tasks[tasks.findIndex(t => t.id === updatedTask.id)] = updatedTask;

        setTasks(sortTasks(tasks));
        setShowCancelTaskModal(false);
    };

    const onTaskDelete = async (task) => {
        await TaskService.deleteTask(userId, task.id);
        setTasks(tasks.filter(t => t.id !== task.id));
    };

    const onTaskCreated = (createdTask) => {
        tasks.push(createdTask);
        setTasks(tasks);
        setShowCreateTaskModal(false);
    };

    const onTaskUpdated = (updatedTask) => {
        tasks[tasks.findIndex(t => t.id === updatedTask.id)] = updatedTask;
        setTasks(tasks);
        setShowTaskDetailModal(false);
    };

    const getTaskList = (tasks) => {
        return (
            <div className="TaskList-list hidden-scroll">
                {tasks.map(task => {
                    return (
                        <div key={task.id} className={!task.isCompleted ? "TaskList-task" : "TaskList-task TaskList-task__completed"}>
                            <div className="TaskList-task_info">
                                <h3>{task.title}</h3>
                                <span>{moment(task.date).format("DD-MM-YYYY")}</span>
                            </div>
                            <div className="TaskList-task_actions">
                                {!task.isCompleted
                                    ? <AiOutlineCheck size={28} onClick={() => onTaskComplete(task)} />
                                    : <AiOutlineClose size={28} onClick={() => onTaskCancel(task)} />}
                                <AiOutlineEye size={28} onClick={() => onTaskDetail(task)} />
                                <AiOutlineDelete size={28} onClick={() => onTaskDelete(task)} />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="TaskList-container">
            <div className="TaskList-actions">
                <div className="TaskList-action" onClick={onTaskCreate}>
                    <AiOutlinePlus size={28} onClick={onTaskCreate} />
                    <h4>Create new</h4>
                </div>
            </div>
            <div className="TaskList-content">
                <div className="TaskList-list-container">
                    <div className="TaskList-list-header">
                        <h3>Past</h3>
                    </div>
                    {getTaskList(getPastTasks())}
                </div>
                <div className="TaskList-list-container">
                    <div className="TaskList-list-header">
                        <h3>Today</h3>
                    </div>
                    {getTaskList(getCurrentTasks())}
                </div>
                <div className="TaskList-list-container">
                    <div className="TaskList-list-header">
                        <h3>Future</h3>
                    </div>
                    {getTaskList(getFutureTasks())}
                </div>
            </div>
            <Modal title={"Create task"} show={showCreateTaskModal} onClose={() => setShowCreateTaskModal(false)}>
                <CreateTask onTaskCreated={createdTask => onTaskCreated(createdTask)} />
            </Modal>
            <Modal title={"Task details"} show={showTaskDetailModal} onClose={() => setShowTaskDetailModal(false)}>
                <TaskDetail task={selectedTask} onTaskUpdated={updatedTask => onTaskUpdated(updatedTask)} />
            </Modal>
            <ConfirmModal
                title={"Complete task?"}
                show={showCompleteTaskModal}
                onClose={() => setShowCompleteTaskModal(false)}
                onYes={() => completeTask(selectedTask)}
                onNo={() => setShowCompleteTaskModal(false)} />
            <ConfirmModal
                title={"Cancel task?"}
                show={showCancelTaskModal}
                onClose={() => setShowCancelTaskModal(false)}
                onYes={() => cancelTask(selectedTask)}
                onNo={() => setShowCancelTaskModal(false)} />
        </div>
            
    );
}

export default TaskList;
