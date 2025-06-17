import React, { FC } from "react";
import TaskCard from "./Board/TaskCard";
import { BoardData } from "../types/BoardData";
import styles from "../styles/MainArea.module.css";
import BoardColumn from "./Board/BoardColumn";
import CreateNewBoardColumn from "./Board/CreateNewBoardColumn";

type MainAreaProps = {
  board: BoardData | undefined;
  setBoards: (boards: Array<BoardData>) => void;
  boards: Array<BoardData>;
};

const MainArea: FC<MainAreaProps> = ({ board, setBoards, boards }) => {
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
        >
          {column.tasks.map((task) => {
            return (
              <TaskCard
                key={crypto.randomUUID()}
                name={task.title}
                subtasks={task.subtasks}
              />
            );
          })}
        </BoardColumn>
      );
    });
  };

  return (
    // TODO: render the selected board
    // FIXME: columns are somehow not added to the DOM
    <div className={styles.mainArea}>
      {renderColumns()}
      {board ? (
        <CreateNewBoardColumn
          boards={boards}
          setBoards={setBoards}
          boardId={board.id}
        />
      ) : null}
    </div>
  );
};

export default MainArea;
