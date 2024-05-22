import { UserLogin, UserRegister } from "@/interface/user.interface";
import instance from "../../lib/axios";
import { setCookie } from "@/utils/cookis";
import { redirect } from "next/navigation";

export async function registerUser(formData: UserRegister) {
  try {
    const { email, name, password } = formData;
    const { data } = await instance.post<string>("auth/register", {
      email,
      username: name,
      password,
    });
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response.data.message);
  }
}

export async function loginUser(formData: UserLogin): Promise<string> {
  try {
    const { email, password } = formData;
    const response = await instance.post("auth/login", {
      email,
      password,
    });
    return response.data.data.token;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response.data.message);
  }
}

export async function checkAuthStatus() {
  try {
    const response = await instance.get("auth/check-status");
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response.data.message);
  }
}

export async function getAuthUser() {
  try {
    const response = await instance.get("auth/user");
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response.data.message);
  }
}
