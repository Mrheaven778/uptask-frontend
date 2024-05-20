import { User } from "@/interface/user.interface";
import instance from "../../lib/axios";

export async function changeUser(email: string, username: string) {
  try {
    return await instance.patch("user/profile", {
      email: email,
      username: username,
    });
  } catch (error) {
    throw error;
  }
}

export async function changePassword(oldPassword: string, newPassword: string) {
  try {
    console.log(oldPassword, newPassword);
    return await instance.patch("user/profile/change-password", {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  } catch (error) {
    throw error;
  }
}
