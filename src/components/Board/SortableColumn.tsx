import React, { FC } from "react";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as Column from "../../types/BoardColumn";
import BoardColumn from "./BoardColumn";
import SortableTaskCard from "./SortableTaskCard";
import { Subtask } from "../../types/Subtask";
import { Task } from "../../types/task";
import { BoardData } from "../../types/BoardData";

interface SortableColumnProps {
  column: Column.BoardColumn;
  setShowTaskDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  getDoneSubtasks: (subtasks: Array<Subtask>) => number;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmationModalOpenedBy: React.Dispatch<
    React.SetStateAction<"boardOptions" | "boardColumn" | undefined>
  >;
  setColumnToDelete: React.Dispatch<React.SetStateAction<string | undefined>>;
  boards: Array<BoardData>;
  setBoards: React.Dispatch<React.SetStateAction<Array<BoardData>>>;
  selectedBoard: BoardData | undefined;
}

const SortableColumn: FC<SortableColumnProps> = ({
  column,
  setShowTaskDetailsModal,
  setShowConfirmationModal,
  setSelectedTask,
  getDoneSubtasks,
  setConfirmationModalOpenedBy,
  setColumnToDelete,
  boards,
  setBoards,
  selectedBoard,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `col-${column.name}` });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <BoardColumn
        name={column.name}
        tasksCount={column.tasks.length}
        setShowConfirmationModal={setShowConfirmationModal}
        setConfirmationModalOpenedBy={setConfirmationModalOpenedBy}
        setColumnToDelete={setColumnToDelete}
        boards={boards}
        setBoards={setBoards}
        selectedBoard={selectedBoard}
        dragAttributes={attributes}
        dragListeners={listeners}
      >
        <SortableContext
          items={column.tasks.map((task) => `task-${task.id}`)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              setShowTaskDetailsModal={setShowTaskDetailsModal}
              setSelectedTask={setSelectedTask}
              getDoneSubtasks={getDoneSubtasks}
            />
          ))}
        </SortableContext>
      </BoardColumn>
    </div>
  );
};

export default SortableColumn;
