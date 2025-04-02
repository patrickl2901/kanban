import { FC } from "react";
import { Task } from "./task";

export type BoardData = {
  title: string;
  columns: Array<FC>;
  tasks: Array<Task>;
};
