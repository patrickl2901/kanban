import React, { FC, useContext } from "react";
import { BoardData } from "../types/BoardData";
import styles from "../styles/MainArea.module.css";
import CreateNewBoardColumn from "./Board/CreateNewBoardColumn";
import { Task } from "../types/task";
import { Subtask } from "../types/Subtask";
import { ColorThemeContext } from "../context/ColorThemeContext";
import moveItem from "../util/moveItem";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableColumn from "./Board/SortableColumn";
import { BoardColumn } from "../types/BoardColumn";

type MainAreaProps = {
  board: BoardData | undefined;
  setBoards: React.Dispatch<React.SetStateAction<Array<BoardData>>>;
  boards: Array<BoardData>;
  setShowTaskDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  getDoneSubtasks: (subtasks: Array<Subtask>) => number;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmationModalOpenedBy: React.Dispatch<
    React.SetStateAction<"boardOptions" | "boardColumn" | undefined>
  >;
  setColumnToDelete: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedBoard: BoardData | undefined;
};

const MainArea: FC<MainAreaProps> = ({
  board,
  setBoards,
  boards,
  setShowTaskDetailsModal,
  setSelectedTask,
  getDoneSubtasks,
  setShowConfirmationModal,
  setConfirmationModalOpenedBy,
  setColumnToDelete,
  selectedBoard,
}) => {
  const theme = useContext(ColorThemeContext);

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    if (!over) return;

    setBoards((prevBoards: BoardData[]) => {
      return prevBoards.map((board) => {
        if (board.id !== selectedBoard!.id) return board;

        // Column move
        if (
          String(active.id).startsWith("col-") &&
          String(over.id).startsWith("col-")
        ) {
          const oldIndex = board.columns.findIndex(
            (c) => `col-${c.name}` === active.id
          );
          const newIndex = board.columns.findIndex(
            (c) => `col-${c.name}` === over.id
          );
          return {
            ...board,
            columns: moveItem<BoardColumn>(board.columns, oldIndex, newIndex),
          };
        }

        // Task move
        if (
          String(active.id).startsWith("task-") &&
          String(over.id).startsWith("task-")
        ) {
          const sourceColIndex = board.columns.findIndex((c) =>
            c.tasks.some((t) => `task-${t.id}` === active.id)
          );
          const targetColIndex = board.columns.findIndex((c) =>
            c.tasks.some((t) => `task-${t.id}` === over.id)
          );

          const sourceCol = board.columns[sourceColIndex];
          const targetCol = board.columns[targetColIndex];

          const oldIndex = sourceCol.tasks.findIndex(
            (t) => `task-${t.id}` === active.id
          );
          const newIndex = targetCol.tasks.findIndex(
            (t) => `task-${t.id}` === over.id
          );

          if (sourceColIndex === targetColIndex) {
            // reorder inside same column
            const updatedCol: BoardColumn = {
              ...sourceCol,
              tasks: moveItem<Task>(sourceCol.tasks, oldIndex, newIndex),
            };
            const newCols = [...board.columns];
            newCols[sourceColIndex] = updatedCol;
            return { ...board, columns: newCols };
          } else {
            // move between columns
            const sourceTasks = [...sourceCol.tasks];
            const [movedTask] = sourceTasks.splice(oldIndex, 1);

            const targetTasks = [...targetCol.tasks];
            targetTasks.splice(newIndex, 0, movedTask);

            const newCols = [...board.columns];
            newCols[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
            newCols[targetColIndex] = { ...targetCol, tasks: targetTasks };

            return { ...board, columns: newCols };
          }
        }

        return board;
      });
    });
  };

  const renderColumns = () => {
    if (!board) {
      return null;
    }
    if (!board.columns) {
      return null;
    }
    return (
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={board.columns.map((col) => `col-${col.name}`)}
          strategy={horizontalListSortingStrategy}
        >
          {board.columns.map((col) => (
            <SortableColumn
              key={col.name}
              column={col}
              setShowTaskDetailsModal={setShowTaskDetailsModal}
              setSelectedTask={setSelectedTask}
              getDoneSubtasks={getDoneSubtasks}
              setShowConfirmationModal={setShowConfirmationModal}
              setConfirmationModalOpenedBy={setConfirmationModalOpenedBy}
              setColumnToDelete={setColumnToDelete}
              boards={boards}
              setBoards={setBoards}
              selectedBoard={selectedBoard}
            />
          ))}
        </SortableContext>
      </DndContext>
    );
  };

  return (
    <div className={theme === "dark" ? styles.mainArea : styles.mainAreaLight}>
      {renderColumns()}
      {board ? (
        <CreateNewBoardColumn
          boards={boards}
          setBoards={setBoards}
          selectedBoard={board}
          boardId={board.id}
        />
      ) : null}
    </div>
  );
};

export default MainArea;
