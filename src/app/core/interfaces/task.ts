export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  deadline?: string;
  createdAt: string;
}
