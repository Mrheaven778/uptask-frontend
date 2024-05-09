export interface Task {
  id?: string;
  name: string;
  description: string;
  postId?: string;
  taskStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  completedBy?: User;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  managerId: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}
export interface User {
  id: string;
  email: string;
  username?: string;
  password: string;
  isActivated: boolean;
  createdAt: string;
  updatedAt: string;
  roles: string[];
  project: Post[];
  team?: Post;
  teamId?: string;
  completedTasks: Task[];
}