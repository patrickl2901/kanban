import React, { FC, useRef, useState } from "react";
import { BoardColumn } from "../types/BoardColumn";
import styles from "../styles/AddNewTaskModal.module.css";
import { BoardData } from "../types/BoardData";
import { Subtask } from "../types/Subtask";
import { Task } from "../types/task";

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
    console.log("updatedBoard:");
    console.log(updatedBoard);

    setBoards((prevBoards) => {
      return prevBoards.map((prevBoard) => {
        return prevBoard.id === updatedBoard.id ? updatedBoard : prevBoard;
      });
    });

    console.log("task form submitted.");

    console.log(newSubtasks);
    console.log(newTask);

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
    <div className={styles.addNewTaskModal}>
      <div className={styles.addNewTask}>
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
        className={styles.addNewTaskForm}
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
          className={styles.descriptionInput}
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
              className={styles.xButton}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleNewSubtask}
          className={styles.newSubtaskButton}
        >
          + Add New Subtask
        </button>
        <label htmlFor="status">Status</label>
        <select name="status" id="status" className={styles.statusSelect}>
          {columns.map((column) => {
            return <option value={column.name}>{column.name}</option>;
          })}
        </select>
        <button type="submit" className={styles.submitButton}>
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddNewTaskModal;
