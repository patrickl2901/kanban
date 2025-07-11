import React, { FC, useContext, useRef, useState } from "react";
import { BoardColumn } from "../types/BoardColumn";
import styles from "../styles/AddNewTaskModal.module.css";
import { BoardData } from "../types/BoardData";
import { Subtask } from "../types/Subtask";
import { Task } from "../types/task";
import { ColorThemeContext } from "../context/ColorThemeContext";

type AddNewTaskModalProps = {
  columns: Array<BoardColumn>;
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  board: BoardData;
  setBoards: React.Dispatch<React.SetStateAction<Array<BoardData>>>;
};

const AddNewTaskModal: FC<AddNewTaskModalProps> = ({
  columns,
  setShowTaskModal,
  board,
  setBoards,
}) => {
  const [subtasks, setSubtasks] = useState<Array<string>>([""]);
  const formRef = useRef<HTMLFormElement>(null);
  const theme = useContext(ColorThemeContext);

  const resetForm = () => {
    formRef.current?.reset();
  };

  const getColumnByName = (columnName: string) => {
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].name === columnName) {
        return columns[i];
      }
    }
    throw new Error(`Could not find column with name: ${columnName}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const taskTitle = formData.get("taskTitle") as string;
    const taskDescription = formData.get("taskDescription") as string;
    const taskStatus = formData.get("status") as string;

    const newSubtasks: Array<Subtask> = subtasks.map((subtask) => {
      const newSubtask: Subtask = {
        task: subtask,
        done: false,
      };
      return newSubtask;
    });

    const newTask: Task = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      subtasks: newSubtasks,
      id: crypto.randomUUID(),
    };

    const updatedColumn: BoardColumn = {
      ...getColumnByName(taskStatus),
      tasks: [...getColumnByName(taskStatus).tasks, newTask],
    };

    const updatedBoard: BoardData = {
      ...board,
      columns: [
        ...columns.map((prev) => {
          return prev.name === updatedColumn.name ? updatedColumn : prev;
        }),
      ],
    };

    setBoards((prevBoards) => {
      return prevBoards.map((prevBoard) => {
        return prevBoard.id === updatedBoard.id ? updatedBoard : prevBoard;
      });
    });

    setSubtasks([""]);
    e.currentTarget.reset();
    setShowTaskModal(false);
  };

  const handleNewSubtask = () => {
    setSubtasks((prev) => [...prev, ""]);
  };

  const handleSubtaskChange = (index: number, value: string) => {
    setSubtasks((prev) => {
      const newSubtasks = [...prev];
      newSubtasks[index] = value;
      return newSubtasks;
    });
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCloseModal = () => {
    resetForm();
    setShowTaskModal(false);
  };

  return (
    <div
      className={
        theme === "dark" ? styles.addNewTaskModal : styles.addNewTaskModalLight
      }
    >
      <div
        className={
          theme === "dark" ? styles.addNewTask : styles.addNewTaskLight
        }
      >
        <p className={styles.addNewTaskHeading}>Add New Task</p>
        <button
          type="button"
          onClick={handleCloseModal}
          className={styles.xButton}
        >
          ✕
        </button>
      </div>
      <form
        className={
          theme === "dark" ? styles.addNewTaskForm : styles.addNewTaskFormLight
        }
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="taskTitle"
          autoComplete="off"
          placeholder="e.g. Take coffee break"
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="taskDescription"
          autoComplete="off"
          rows={6}
          className={
            theme === "dark"
              ? styles.descriptionInput
              : styles.descriptionInputLight
          }
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
        />
        <label>Subtasks</label>
        {subtasks.map((value, index) => (
          <div key={index} className={styles.subtaskInput}>
            <input
              type="text"
              value={value}
              onChange={(e) => handleSubtaskChange(index, e.target.value)}
              placeholder="e.g. Make coffee"
            />
            <button
              type="button"
              onClick={() => handleRemoveSubtask(index)}
              className={
                theme === "dark" ? styles.xButton : styles.xButtonLight
              }
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleNewSubtask}
          className={
            theme === "dark"
              ? styles.newSubtaskButton
              : styles.newSubtaskButtonLight
          }
        >
          + Add New Subtask
        </button>
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          className={
            theme === "dark" ? styles.statusSelect : styles.statusSelectLight
          }
        >
          {columns.map((column) => {
            return <option value={column.name}>{column.name}</option>;
          })}
        </select>
        <button
          type="submit"
          className={
            theme === "dark" ? styles.submitButton : styles.submitButtonLight
          }
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddNewTaskModal;
