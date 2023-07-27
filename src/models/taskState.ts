import { Task } from './task';

export interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "failed"
  error: string | null;
}