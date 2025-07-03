import React, { FC } from "react";
import TaskCard from "./Board/TaskCard";
import { BoardData } from "../types/BoardData";
import styles from "../styles/MainArea.module.css";
import BoardColumn from "./Board/BoardColumn";
import CreateNewBoardColumn from "./Board/CreateNewBoardColumn";
import { Task } from "../types/task";
import { Subtask } from "../types/Subtask";

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
}) => {
  const renderColumns = () => {
    if (!board) {
      return null;
    }
    if (!board.columns) {
      return null;
    }
    return board.columns.map((column) => {
      return (
        <BoardColumn
          key={crypto.randomUUID()}
          name={column.name}
          tasksCount={column.tasks.length}
          boards={boards}
          setBoards={setBoards}
          selectedBoard={board}
          setShowConfirmationModal={setShowConfirmationModal}
          setConfirmationModalOpenedBy={setConfirmationModalOpenedBy}
          setColumnToDelete={setColumnToDelete}
        >
          {column.tasks.map((task) => {
            return (
              <TaskCard
                key={crypto.randomUUID()}
                name={task.title}
                subtasks={task.subtasks}
                setShowTaskDetailsModal={setShowTaskDetailsModal}
                setSelectedTask={setSelectedTask}
                task={task}
                getDoneSubtasks={getDoneSubtasks}
              />
            );
          })}
        </BoardColumn>
      );
    });
  };

  return (
    <div className={styles.mainArea}>
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
