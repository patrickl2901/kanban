import React, { FC, useState } from "react";
import styles from "./CreateNewBoardColumn.module.css";
import { BoardColumn } from "../../types/BoardColumn";
import { BoardData } from "../../types/BoardData";

type CreateNewBoardColumnProps = {
  boards: Array<BoardData>;
  setBoards: React.Dispatch<React.SetStateAction<Array<BoardData>>>;
  boardId: string;
  selectedBoard: BoardData;
};

const CreateNewBoardColumn: FC<CreateNewBoardColumnProps> = ({
  boards,
  setBoards,
  boardId,
  selectedBoard,
}) => {
  const [showTitleInput, setShowTitleInput] = useState<boolean>(false);

  const toggleShowTitleInput = () => {
    setShowTitleInput(!showTitleInput);
  };

  const columnNameExists = (columnName: string) => {
    for (let i = 0; i < selectedBoard.columns.length; i++) {
      if (selectedBoard.columns[i].name === columnName) {
        return true;
      }
    }
    return false;
  };

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("columnTitle") as string;

    if (!columnNameExists(title.trim())) {
      if (title.trim() != "") {
        const newColumn: BoardColumn = {
          name: title,
          tasks: [],
        };

        setBoards((prevBoards: BoardData[]) => {
          return prevBoards.map((board) => {
            if (board.id === boardId) {
              return {
                ...board,
                columns: [...board.columns, newColumn],
              };
            }
            return board;
          });
        });

        console.log("added column.");
        boards.forEach((board) => {
          if (board.id == boardId) {
            console.log(board);
            console.log(board.columns);
          }
        });
      }
    } else {
      // TODO: add proper error notification for user
      console.log(
        "Could not create column because a column with that name already exists."
      );
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
            autoComplete="off"
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
