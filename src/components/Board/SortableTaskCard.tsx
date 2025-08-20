import React, { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../types/task";
import TaskCard from "./TaskCard";
import { Subtask } from "../../types/Subtask";

interface SortableTaskCardProps {
  setShowTaskDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  task: Task;
  getDoneSubtasks: (subtasks: Array<Subtask>) => number;
}

const SortableTaskCard: FC<SortableTaskCardProps> = ({
  setShowTaskDetailsModal,
  setSelectedTask,
  task,
  getDoneSubtasks,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `task-${task.id}` });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // TODO: make cards draggable to different column
  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard
        name={task.title}
        subtasks={task.subtasks}
        setShowTaskDetailsModal={setShowTaskDetailsModal}
        setSelectedTask={setSelectedTask}
        task={task}
        getDoneSubtasks={getDoneSubtasks}
        dragAttributes={attributes}
        dragListeners={listeners}
      />
    </div>
  );
};

export default SortableTaskCard;
