import { isAxiosError } from "axios";
import instance from "../../lib/axios";
import { TeamMemberForm } from "@/interface/team.interface";
import { User } from "@/interface/user.interface";



export async function findUserByEmail({
  email,
}: TeamMemberForm): Promise<User> {
  try {
    const { data } = await instance.post(`post/team/find`, {
      email,
    });
    
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function daleteUerFromTeam({
  idUser,
  idProject,
}: {
  idUser: string;
  idProject: string;
}) {
  try {
    const { data } = await instance.delete(`post/${idProject}/team/${idUser}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function addUserToProject({
  id,
  projectId,
}: {
  id: string;
  projectId: string;
}) {
  try {
    if (!id) {
      throw new Error("No se ha encontrado el usuario");
    }
    const { data } = await instance.post(`post/${projectId}/team`, {
      id: id,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getTeamProject({
  projectId,
}: {
  projectId: string;
}): Promise<User[]> {
  try {
    const { data } = await instance.get(`post/${projectId}/team`);
    return data.team;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }

}