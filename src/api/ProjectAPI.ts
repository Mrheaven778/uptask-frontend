import { ProjectFormData } from "@/types";
import instance from "../../lib/axios";
import exp from "constants";
import { Task } from "@/interface/project";

export async function createProject(formaData: ProjectFormData) {
    try {
        const { data } = await instance.post("post", formaData);
    } catch (error) {
        console.log(error);
    }
}


export async function getProjects() {
    try {
        const { data } = await instance.get("post");
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getProject(id: string) {
    try {
        const { data } = await instance.get(`post/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }

}

export async function updateProject(id: string, formData: ProjectFormData) {
    try {
        await instance.patch(`post/${id}`, {
            ...formData
        });

    } catch (error) {
        console.log(error);
    }
}

export async function deleteProject(id: string) {
    try {
        await instance.delete(`post/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export async function getTaks(projectId: string) {
    try {
        const { data } = await instance.get(`post/${projectId}/task`);
        return data;
    } catch (error) {
        console.log(error);
    }

}

export async function createTask(id: string, formData: Task) {
    try {
        await instance.post(`post/${id}/task`, { ...formData });
        console.log(formData);

    } catch (error) {
        console.log(error);
    }
}

export async function updateTask(projectId: string, taskId: string, formData: Task) {
    try {
        await instance.patch(`post/${projectId}/task/${taskId}`, { ...formData });

    } catch (error) {
        console.log(error);
    }
}


export async function deleteTask(projectId: string, taskId: string) {
    try {
        await instance.delete(`post/${projectId}/task/${taskId}`);
    } catch (error) {
        console.log(error);
    }
}


export async function updateSatatusTask(projectId: string, taskId: string, status: string) {
    try {
        await instance.patch(`post/${projectId}/task/${taskId}/status`, { taskStatus: status });
    } catch (error) {
        console.log(error);
    }
}
