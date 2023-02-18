import axios, { HttpStatusCode } from "axios";

const taskApi = axios({
    baseURL: "http://localhost:3001/api"
});

const createTask = async (task) => {
    const response = await taskApi.post("create", task);
    if (response.status != HttpStatusCode.Ok) {
        throw new Error(response.data.message);
    }

    return response.data;
};

const TaskService = {
    createTask
};

export default TaskService;
