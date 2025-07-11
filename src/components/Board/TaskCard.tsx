import React, { FC, useContext } from "react";
import { Subtask } from "../../types/Subtask";
import styles from "./TaskCard.module.css";
import { Task } from "../../types/task";
import { ColorThemeContext } from "../../context/ColorThemeContext";

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
  const theme = useContext(ColorThemeContext);

  const handleOnClick = () => {
    setSelectedTask(task);
    setShowTaskDetailsModal(true);
  };

  return (
    <div
      className={theme === "dark" ? styles.taskCard : styles.taskCardLight}
      onClick={handleOnClick}
    >
      {name}
      <p className={theme === "dark" ? styles.subtasks : styles.subtasksLight}>
        {getDoneSubtasks(subtasks)} of {subtasks.length} subtasks
      </p>
    </div>
  );
};

export default TaskCard;
