import { BoardColumn } from "./BoardColumn";

export type BoardData = {
  title: string;
  columns: Array<BoardColumn>;
  id: string;
};
