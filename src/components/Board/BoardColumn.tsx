import React, { FC } from "react";
import styles from "./BoardColumn.module.css";

type BoardColumnProps = {
  children: React.ReactNode;
  name: string;
  tasksCount: number;
};

const BoardColumn: FC<BoardColumnProps> = ({ children, name, tasksCount }) => {
  return (
    <div className={styles.boardColumn}>
      <div className={styles.columnStatus}>
        {name} ({tasksCount})
      </div>
      {children}
    </div>
  );
};

export default BoardColumn;
