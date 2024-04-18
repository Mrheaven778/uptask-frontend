export interface Task {
  id?: string;
  name: string;
  description: string;
  postId?: string;
  taskStatus?: string;
  createdAt?: string;
  updatedAt?: string;
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
