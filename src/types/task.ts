import { Subtask } from "./Subtask";

export type Task = {
  title: string;
  description?: string;
  status: string;
  subtasks: Array<Subtask>;
};
