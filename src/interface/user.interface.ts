
export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister extends UserLogin {
    name: string;
    password_confirmation: string;
}


export interface User {
    id: string;
    username: string;
    email: string;
    created_at?: string;
    updated_at?: string;
roles?: string[];
}