import { FC, useContext, useState } from "react";
import boardIcon from "../../assets/book-solid.svg";
import styles from "./BoardTab.module.css";
import { BoardData } from "../../types/BoardData";
import { ColorThemeContext } from "../../context/ColorThemeContext";

type CreateNewBoardTabProps = {
  setBoards: React.Dispatch<React.SetStateAction<Array<BoardData>>>;
  boards: Array<BoardData>;
  setSelectedBoard: React.Dispatch<React.SetStateAction<BoardData | undefined>>;
};

const CreateNewBoardTab: FC<CreateNewBoardTabProps> = ({
  boards,
  setBoards,
  setSelectedBoard,
}) => {
  const theme = useContext(ColorThemeContext);

  const [showTitleInput, setShowTitleInput] = useState<boolean>(false);

  const toggleShowTitleInput = () => {
    setShowTitleInput(!showTitleInput);
  };

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("boardTitle") as string;

    const newBoard: BoardData = {
      title,
      columns: [],
      id: crypto.randomUUID(),
    };

    if (title.trim() != "") {
      setBoards([...boards, newBoard]);
      setSelectedBoard(newBoard);
    }

    e.currentTarget.reset();
    setShowTitleInput(false);
  };

  return (
    <div className={styles.boardTabCreate} onClick={toggleShowTitleInput}>
      <img src={boardIcon} alt="Board" className={styles.boardIconCreate} />
      {showTitleInput ? (
        <form
          className={styles.createNewBoardForm}
          onSubmit={handleTitleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            placeholder="Enter board title"
            name="boardTitle"
            autoFocus
            autoComplete="off"
            className={
              theme === "dark"
                ? styles.formTextInput
                : styles.formTextInputLight
            }
          />
          <input type="submit" className={styles.formSubmit} />
        </form>
      ) : (
        <span>+ Create New Board</span>
      )}
    </div>
  );
};

export default CreateNewBoardTab;
