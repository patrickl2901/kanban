import { FC, useContext } from "react";
import boardIcon from "../../assets/book-solid.svg";
import styles from "./BoardTab.module.css";
import { BoardData } from "../../types/BoardData";
import { ColorThemeContext } from "../../context/ColorThemeContext";

type BoardTabProps = {
  title: string;
  id: string;
  setSelectedBoard: (board: BoardData) => void;
  selectedBoard: BoardData | undefined;
  boards: Array<BoardData>;
};

const BoardTab: FC<BoardTabProps> = ({
  title,
  setSelectedBoard,
  selectedBoard,
  boards,
  id,
}) => {
  const theme = useContext(ColorThemeContext);

  const handleOnClick = () => {
    if (getBoardById(id) === undefined) {
      throw new Error("Board ID not found.");
    } else {
      setSelectedBoard(getBoardById(id)!);
    }
  };

  const isSelected = () => {
    if (selectedBoard === undefined) {
      return false;
    }
    return id == selectedBoard.id;
  };

  const getBoardById = (boardId: string) => {
    for (const element of boards) {
      if (element.id == boardId) {
        return element;
      }
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? styles.boardTab : styles.boardTabLight
      } ${isSelected() ? styles.boardTabSelected : null}`}
      onClick={handleOnClick}
    >
      <img
        src={boardIcon}
        alt="Board"
        className={theme === "dark" ? styles.boardIcon : styles.boardIconLight}
      />
      <span>{title}</span>
    </div>
  );
};

export default BoardTab;
