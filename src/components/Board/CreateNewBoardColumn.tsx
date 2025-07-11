import React, { FC, useContext, useState } from "react";
import styles from "./CreateNewBoardColumn.module.css";
import { BoardColumn } from "../../types/BoardColumn";
import { BoardData } from "../../types/BoardData";
import { ColorThemeContext } from "../../context/ColorThemeContext";

type CreateNewBoardColumnProps = {
  boards: Array<BoardData>;
  setBoards: React.Dispatch<React.SetStateAction<Array<BoardData>>>;
  boardId: string;
  selectedBoard: BoardData;
};

const CreateNewBoardColumn: FC<CreateNewBoardColumnProps> = ({
  setBoards,
  boardId,
  selectedBoard,
}) => {
  const theme = useContext(ColorThemeContext);
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

        setBoards((prev) => {
          return prev.map((board) => {
            if (board.id === boardId) {
              return {
                ...board,
                columns: [...board.columns, newColumn],
              };
            }
            return board;
          });
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
    <div
      className={
        theme === "dark"
          ? styles.createNewBoardColumn
          : styles.createNewBoardColumnLight
      }
      onClick={toggleShowTitleInput}
    >
      {showTitleInput ? (
        <form
          className={
            theme === "dark"
              ? styles.createNewBoardColumnForm
              : styles.createNewBoardColumnFormLight
          }
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
