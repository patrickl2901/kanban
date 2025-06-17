import React, { FC } from "react";
import { Subtask } from "../../types/Subtask";
import styles from "./TaskCard.module.css";

type TaskCardProps = {
  name: string;
  subtasks: Array<Subtask>;
};

const TaskCard: FC<TaskCardProps> = ({ name, subtasks }) => {
  return (
    <div className={styles.taskCard}>
      {name}
      <p className={styles.subtasks}>0 of {subtasks.length} subtasks</p>
    </div>
  );
};

export default TaskCard;
