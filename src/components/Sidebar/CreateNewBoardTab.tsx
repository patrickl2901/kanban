import { FC, useState } from "react";
import boardIcon from "../../assets/book-solid.svg";
import styles from "./BoardTab.module.css";
import { BoardData } from "../../types/BoardData";

type CreateNewBoardTabProps = {
  setBoards: (boards: Array<BoardData>) => void;
  boards: Array<BoardData>;
};

const CreateNewBoardTab: FC<CreateNewBoardTabProps> = ({
  boards,
  setBoards,
}) => {
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
      columns: undefined,
      tasks: undefined,
    };

    if (title.trim() != "") {
      setBoards([...boards, newBoard]);
    }
    e.currentTarget.reset();
    setShowTitleInput(false);
    console.log(boards);
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
            className={styles.formTextInput}
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
