import instance from "../../lib/axios";

export async function createNote(content: string, idTask: string) {
  try {
    const { data } = await instance.post(`note/tasks/${idTask}`, {
      content,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteNoteById(idNote: string) {
  try {
    const { data } = await instance.delete(`note/${idNote}`);
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getTasksNote(idTask: string) {
  try {
    const { data } = await instance.get(`note/tasks/${idTask}`);
    return data;
  } catch (error: any) {
    throw error;
  }
}
