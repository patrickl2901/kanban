import { FC } from "react";
import boardIcon from "../../assets/book-solid.svg";
import styles from "./BoardTab.module.css";

type BoardTabProps = {
  title: string;
};

const BoardTab: FC<BoardTabProps> = ({ title }) => {
  return (
    <div className={styles.boardTab}>
      <img src={boardIcon} alt="Board" className={styles.boardIcon} />
      <span>{title}</span>
    </div>
  );
};

export default BoardTab;
