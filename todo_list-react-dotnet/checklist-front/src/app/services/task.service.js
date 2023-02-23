import axios, { HttpStatusCode } from "axios";
import AuthService from "./auth.service";

const taskApi = axios.create({
    // eslint-disable-next-line no-undef
    baseURL: process.env.REACT_APP_API_BASE_URL
});

const getAuthorizationHeader = () => {
    return { headers: { "Authorization": `Bearer ${AuthService.getAccessToken()}` } };
};

const createTask = async (userId, task) => {
    let url = `users/${userId}/tasks/create`;
    const response = await taskApi.post(url, task, getAuthorizationHeader());
    if (response.status != HttpStatusCode.Ok) {
        throw new Error(response.data.message);
    }

    return response.data;
};

const getTask = async (userId, taskId) => {
    const url = `users/${userId}/tasks/${taskId}`;
    const response = await taskApi.get(url, getAuthorizationHeader());
    if (response.status != HttpStatusCode.Ok) {
        throw new Error(response.data.message);
    }

    return response.data;
};

const getAllTasks = async (userId) => {
    const url = `users/${userId}/tasks/get-all`;
    const response = await taskApi.get(url, getAuthorizationHeader());
    if (response.status != HttpStatusCode.Ok) {
        throw new Error(response.data.message);
    }

    return response.data;
};

const updateTask = async (userId, taskId, task) => {
    const url = `users/${userId}/tasks/${taskId}`;
    const response = await taskApi.put(url, task, getAuthorizationHeader());
    if (response.status != HttpStatusCode.Ok) {
        throw new Error(response.data.message);
    }

    return response.data;
};

const deleteTask = async (userId, taskId) => {
    const url = `users/${userId}/tasks/${taskId}`;
    const response = await taskApi.delete(url, getAuthorizationHeader());
    if (response.status != HttpStatusCode.Ok) {
        throw new Error(response.data.message);
    }

    return response.data;
};

const completeTask = async (userId, task) => {
    task.isCompleted = true;
    const data = await updateTask(userId, task.id, task);

    return data;
};

const cancelTask = async (userId, task) => {
    task.isCompleted = false;
    const data = await updateTask(userId, task.id, task);

    return data;
};


const TaskService = {
    createTask,
    getTask,
    getAllTasks,
    updateTask,
    deleteTask,
    completeTask,
    cancelTask
};

export default TaskService;
