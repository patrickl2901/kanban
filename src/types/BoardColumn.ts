import { Task } from "./task";

export type BoardColumn = {
  name: string;
  tasks: Array<Task>;
};
