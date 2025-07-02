import React, { FC } from "react";
import { Subtask } from "../../types/Subtask";
import styles from "./TaskCard.module.css";
import { Task } from "../../types/task";

type TaskCardProps = {
  name: string;
  subtasks: Array<Subtask>;
  setShowTaskDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  task: Task;
  getDoneSubtasks: (subtasks: Array<Subtask>) => number;
};

const TaskCard: FC<TaskCardProps> = ({
  name,
  subtasks,
  setShowTaskDetailsModal,
  setSelectedTask,
  task,
  getDoneSubtasks,
}) => {
  const handleOnClick = () => {
    setSelectedTask(task);
    setShowTaskDetailsModal(true);
  };

  return (
    <div className={styles.taskCard} onClick={handleOnClick}>
      {name}
      <p className={styles.subtasks}>
        {getDoneSubtasks(subtasks)} of {subtasks.length} subtasks
      </p>
    </div>
  );
};

export default TaskCard;
