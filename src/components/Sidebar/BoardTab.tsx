import { FC } from "react";
import boardIcon from "../../assets/book-solid.svg";
import styles from "./BoardTab.module.css";
import { BoardData } from "../../types/BoardData";

type BoardTabProps = {
  title: string;
  id: string;
  setSelectedBoard: (board: BoardData) => void;
  boards: Array<BoardData>;
};

const BoardTab: FC<BoardTabProps> = ({
  title,
  setSelectedBoard,
  boards,
  id,
}) => {
  const handleOnClick = () => {
    if (getBoardById(id) === undefined) {
      throw new Error("Board ID not found.");
    } else {
      setSelectedBoard(getBoardById(id)!);
    }
  };

  const getBoardById = (boardId: string) => {
    for (const element of boards) {
      if (element.id == boardId) {
        return element;
      }
    }
  };

  return (
    <div className={styles.boardTab} onClick={handleOnClick}>
      <img src={boardIcon} alt="Board" className={styles.boardIcon} />
      <span>{title}</span>
    </div>
  );
};

export default BoardTab;
