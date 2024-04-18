import { User } from "@/interface/user.interface";

export const isManager = (user: User, managerId: string) => {
    return user.id === managerId;
}