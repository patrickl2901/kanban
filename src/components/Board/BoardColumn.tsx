import React, { FC } from "react";
import styles from "./BoardColumn.module.css";
import { BoardData } from "../../types/BoardData";

type BoardColumnProps = {
  children: React.ReactNode;
  name: string;
  tasksCount: number;
  boards: Array<BoardData>;
  setBoards: React.Dispatch<React.SetStateAction<Array<BoardData>>>;
  selectedBoard: BoardData;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmationModalOpenedBy: React.Dispatch<
    React.SetStateAction<"boardOptions" | "boardColumn" | undefined>
  >;
  setColumnToDelete: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const BoardColumn: FC<BoardColumnProps> = ({
  children,
  name,
  tasksCount,
  boards,
  setBoards,
  selectedBoard,
  setShowConfirmationModal,
  setConfirmationModalOpenedBy,
  setColumnToDelete,
}) => {
  const handleDeleteColumn = () => {
    console.log("delete column clicked");
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].id === selectedBoard.id) {
        for (let j = 0; j < boards[i].columns.length; j++) {
          if (boards[i].columns[j].name === name) {
            if (tasksCount === 0) {
              // delete and return
              const updatedBoard: BoardData = {
                ...boards[i],
                columns: [
                  ...boards[i].columns.filter((prev) => {
                    return prev.name !== name;
                  }),
                ],
              };
              setBoards((prev) => {
                return prev.map((board) => {
                  return board.id === selectedBoard.id ? updatedBoard : board;
                });
              });
              return;
            }
            // show ConfirmationModal
            setShowConfirmationModal(true);
            setConfirmationModalOpenedBy("boardColumn");
            setColumnToDelete(name);
          }
        }
      }
    }
  };

  return (
    <div className={styles.boardColumn}>
      <div className={styles.columnHeader}>
        <div className={styles.columnStatus}>
          {name} ({tasksCount})
        </div>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteColumn}
        >
          ✕
        </button>
      </div>
      {children}
    </div>
  );
};

export default BoardColumn;
