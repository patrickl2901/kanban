import React, { FC, useContext, useRef, useState } from "react";
import styles from "../styles/TaskDetailsModal.module.css";
import { Task } from "../types/task";
import { BoardData } from "../types/BoardData";
import { Subtask } from "../types/Subtask";
import { BoardColumn } from "../types/BoardColumn";
import { ColorThemeContext } from "../context/ColorThemeContext";

type TaskDetailsModalProps = {
  setShowTaskDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  boards: Array<BoardData>;
  setBoards: React.Dispatch<React.SetStateAction<Array<BoardData>>>;
  selectedBoard: BoardData | undefined;
  selectedTask: Task;
  getDoneSubtasks: (subtasks: Array<Subtask> | undefined) => number;
};

const TaskDetailsModal: FC<TaskDetailsModalProps> = ({
  setShowTaskDetailsModal,
  boards,
  setBoards,
  selectedBoard,
  selectedTask,
  getDoneSubtasks,
}) => {
  const theme = useContext(ColorThemeContext);
  const [formState, setFormState] = useState<Task>(selectedTask);
  const [selectedStatus, setSelectedStatus] = useState<string>(
    selectedTask.status
  );
  const [deleteButtonText, setDeleteButtonText] = useState<
    "Delete" | "Confirm Delete"
  >("Delete");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // status not changed
    if (formState?.status === selectedTask.status) {
      for (let i = 0; i < boards.length; i++) {
        if (boards[i].id === selectedBoard?.id) {
          for (let j = 0; j < boards[i].columns.length; j++) {
            if (boards[i].columns[j].name === selectedStatus) {
              const updatedColumn: BoardColumn = {
                ...boards[i].columns[j],
                tasks: [
                  ...boards[i].columns[j].tasks.map((prev) => {
                    return prev.id === formState.id ? formState : prev;
                  }),
                ],
              };
              const updatedBoard: BoardData = {
                ...boards[i],
                columns: [
                  ...boards[i].columns.map((prev) => {
                    return prev.name === formState.status
                      ? updatedColumn
                      : prev;
                  }),
                ],
              };
              setBoards((prev) => {
                return prev.map((board) => {
                  return board.id === selectedBoard.id ? updatedBoard : board;
                });
              });
            }
          }
        }
      }
      handleCloseModal();
      return;
    }

    // status changed
    // delete task from old column and update it
    for (let i = 0; i < boards.length; i++) {
      let newBoard: BoardData | undefined;
      if (boards[i].id === selectedBoard?.id) {
        for (let j = 0; j < boards[i].columns.length; j++) {
          if (boards[i].columns[j].name === selectedTask.status) {
            const updatedColumn: BoardColumn = {
              ...boards[i].columns[j],
              tasks: [
                ...boards[i].columns[j].tasks.filter((prev) => {
                  return prev.id !== selectedTask.id;
                }),
              ],
            };
            const updatedBoard: BoardData = {
              ...boards[i],
              columns: [
                ...boards[i].columns.map((prev) => {
                  return prev.name === selectedTask.status
                    ? updatedColumn
                    : prev;
                }),
              ],
            };
            newBoard = updatedBoard;
          }
        }

        // find new column
        // add task to selected status column
        for (let j = 0; j < boards[i].columns.length; j++) {
          if (boards[i].columns[j].name === selectedStatus) {
            const updatedColumn: BoardColumn = {
              ...boards[i].columns[j],
              tasks: [...boards[i].columns[j].tasks, formState],
            };
            const updatedBoard: BoardData = {
              ...newBoard!,
              columns: [
                ...newBoard!.columns.map((prev) => {
                  return prev.name === formState.status ? updatedColumn : prev;
                }),
              ],
            };
            setBoards((prev) => {
              return prev.map((board) => {
                return board.id === selectedBoard.id ? updatedBoard : board;
              });
            });
          }
        }
      }
    }
    selectedTask = formState;
    handleCloseModal();
  };

  const handleCheckboxChange = (subtask: Subtask, index: number) => {
    const updatedSubtask: Subtask = {
      ...subtask,
      done: !subtask.done,
    };

    const updatedFormState: Task = {
      ...formState!,
      subtasks: [
        ...formState!.subtasks.map((prev, i) => {
          return i === index ? updatedSubtask : prev;
        }),
      ],
    };

    setFormState(updatedFormState);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);

    const updatedFormState: Task = {
      ...formState!,
      status: e.target.value,
    };

    setFormState(updatedFormState);
  };

  const handleCloseModal = () => {
    formRef.current?.reset();
    setShowTaskDetailsModal(false);
  };

  const handleDeleteTask = () => {
    if (deleteButtonText === "Delete") {
      setDeleteButtonText("Confirm Delete");
      return;
    }
    setDeleteButtonText("Delete");

    for (let i = 0; i < boards.length; i++) {
      if (boards[i].id === selectedBoard?.id) {
        for (let j = 0; j < boards[i].columns.length; j++) {
          if (boards[i].columns[j].name === selectedTask.status) {
            const updatedColumn: BoardColumn = {
              ...boards[i].columns[j],
              tasks: [
                ...boards[i].columns[j].tasks.filter((prev) => {
                  return prev.id !== selectedTask.id;
                }),
              ],
            };
            const updatedBoard: BoardData = {
              ...boards[i],
              columns: [
                ...boards[i].columns.map((prev) => {
                  return prev.name === selectedTask.status
                    ? updatedColumn
                    : prev;
                }),
              ],
            };
            setBoards((prev) => {
              return prev.map((board) => {
                return board.id === selectedBoard.id ? updatedBoard : board;
              });
            });
          }
        }
      }
    }
    handleCloseModal();
  };

  // TODO: style custom checkbox to use accent color
  return (
    <div
      className={
        theme === "dark"
          ? styles.taskDetailsModal
          : styles.taskDetailsModalLight
      }
    >
      <div
        className={
          theme === "dark"
            ? styles.taskTitleContainer
            : styles.taskTitleContainerLight
        }
      >
        <p>{selectedTask?.title}</p>
        <button
          type="button"
          className={theme === "dark" ? styles.xButton : styles.xButtonLight}
          onClick={handleCloseModal}
        >
          ✕
        </button>
      </div>
      <p
        className={
          theme === "dark"
            ? styles.taskDescription
            : styles.taskDescriptionLight
        }
      >
        {selectedTask?.description}
      </p>
      <form onSubmit={handleSubmit} ref={formRef}>
        {formState!.subtasks.length > 0 ? (
          <label
            className={
              theme === "dark"
                ? styles.subtasksLabel
                : styles.subtasksLabelLight
            }
          >
            Subtasks ({getDoneSubtasks(formState?.subtasks)} of{" "}
            {formState?.subtasks.length})
          </label>
        ) : null}
        {formState?.subtasks.map((subtask, index) => {
          return (
            <div
              className={
                theme === "dark"
                  ? styles.subtaskInputContainer
                  : styles.subtaskInputContainerLight
              }
              key={index}
            >
              <input
                type="checkbox"
                name={`subtask${index}`}
                id={`subtask${index}`}
                className={styles.checkbox}
                checked={subtask.done}
                onChange={() => handleCheckboxChange(subtask, index)}
              />
              <label htmlFor={`subtask${index}`}>{subtask.task}</label>
            </div>
          );
        })}
        <div
          className={
            theme === "dark"
              ? styles.statusSelectContainer
              : styles.statusSelectContainerLight
          }
        >
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            className={
              theme === "dark" ? styles.statusSelect : styles.statusSelectLight
            }
            value={selectedStatus}
            onChange={handleSelectChange}
          >
            {selectedBoard?.columns.map((column, index) => {
              return (
                <option value={column.name} key={index}>
                  {column.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.submitButtonContainer}>
          <button
            type="button"
            className={
              theme === "dark" ? styles.deleteButton : styles.deleteButtonLight
            }
            onClick={handleDeleteTask}
          >
            {deleteButtonText}
          </button>
          <button type="submit">Save & Close</button>
        </div>
      </form>
    </div>
  );
};

export default TaskDetailsModal;
