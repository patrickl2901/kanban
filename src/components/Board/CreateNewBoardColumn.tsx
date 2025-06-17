import React, { FC, useState } from "react";
import styles from "./CreateNewBoardColumn.module.css";
import { BoardColumn } from "../../types/BoardColumn";
import { BoardData } from "../../types/BoardData";

type CreateNewBoardColumnProps = {
  boards: Array<BoardData>;
  setBoards: (boards: Array<BoardData>) => void;
  boardId: string;
};

const CreateNewBoardColumn: FC<CreateNewBoardColumnProps> = ({
  boards,
  setBoards,
  boardId,
}) => {
  const [showTitleInput, setShowTitleInput] = useState<boolean>(false);

  const toggleShowTitleInput = () => {
    setShowTitleInput(!showTitleInput);
  };

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("columnTitle") as string;

    if (title.trim() != "") {
      // set column title here
      const newColumn: BoardColumn = {
        name: title,
        tasks: [],
      };

      // update boards with added column
      const updateBoards = (prevBoards: Array<BoardData>) => {
        const updatedBoards: Array<BoardData> = prevBoards.map((board) => {
          if (board.id === boardId) {
            const updatedBoard = {
              ...board,
              columns: [...board.columns, newColumn],
            };
            return updatedBoard;
          }
          return board;
        });
        return updatedBoards;
      };

      const gigaUpdatedBoards = updateBoards(boards);

      setBoards(gigaUpdatedBoards);
      console.log("added column.");
      boards.forEach((board) => {
        if (board.id == boardId) {
          console.log(board);
          console.log(board.columns);
        }
      });
    }

    e.currentTarget.reset();
    setShowTitleInput(false);
  };

  return (
    <div className={styles.createNewBoardColumn} onClick={toggleShowTitleInput}>
      {showTitleInput ? (
        <form
          className={styles.createNewBoardColumnForm}
          onSubmit={handleTitleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            placeholder="Enter column title"
            name="columnTitle"
            autoFocus
            className={styles.formTextInput}
          />
          <input type="submit" className={styles.formSubmit} />
        </form>
      ) : (
        <span>+ New Column</span>
      )}
    </div>
  );
};

export default CreateNewBoardColumn;
