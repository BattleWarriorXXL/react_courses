import axios, { HttpStatusCode } from "axios";

const taskApi = axios({
    // eslint-disable-next-line no-undef
    baseURL: process.env.REACT_APP_API_BASE_URL
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
