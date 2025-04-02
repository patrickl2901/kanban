import { FC } from "react";
import boardIcon from "../../assets/book-solid.svg";
import styles from "./BoardTab.module.css";

const BoardTab: FC = () => {
  return (
    <div className={styles.boardTabCreate}>
      <img src={boardIcon} alt="Board" className={styles.boardIconCreate} />
      <span>+ Create New Board</span>
    </div>
  );
};

export default BoardTab;
