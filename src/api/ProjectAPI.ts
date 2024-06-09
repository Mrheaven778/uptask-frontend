'use server';
import { ProjectFormData } from "@/types";
import instance from "../../lib/axios";
import { Task } from "@/interface/project";


export async function createProject(formaData: ProjectFormData) {
  try {
    const { data } = await instance.post("post", formaData);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getProjects() {
  try {
    const { data } = await instance.get("post");
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getProject(id: string) {
  try {
    const { data } = await instance.get(`post/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getTaksById(id: string) {
    try {
        const { data } = await instance.get(`task/${id}`);
        return data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }

}

export async function updateProject(id: string, formData: ProjectFormData) {
  try {
    await instance.patch(
      `post/${id}`,
      {
        ...formData,
      },
    );
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteProject(id: string) {
  try {
    await instance.delete(`post/${id}`);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getTasks(projectId: string) {
  try {
    const { data } = await instance.get(`post/${projectId}/task`);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function createTask(id: string, formData: Task) {
  try {
    await instance.post(
      `post/${id}/task`,
      { ...formData },
      
    );
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateTask(
  projectId: string,
  taskId: string,
  formData: Task
) {
  try {
    await instance.patch(
      `post/${projectId}/task/${taskId}`,
      { ...formData },
     
    );
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteTask(projectId: string, taskId: string) {
  try {
    await instance.delete(`post/${projectId}/task/${taskId}`);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateSatatusTask(
  projectId: string,
  taskId: string,
  status: string,
  userId: string
) {
  try {
    await instance.patch(
      `post/${projectId}/task/${taskId}/status`,
      {
        taskStatus: status,
        completedById: userId,
      },
    );
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
  
}
