import { FC } from "react";
import { Task } from "./task";

export type BoardData = {
  title: string;
  columns: Array<FC> | undefined;
  tasks: Array<Task> | undefined;
  id: string;
};
