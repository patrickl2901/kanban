import { useState } from "react";
import "./App.css";
import type { ColorTheme } from "./types/ColorTheme";
import type { BoardData } from "./types/BoardData";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header";
import MainArea from "./components/MainArea";
import { ColorThemeContext } from "./context/ColorThemeContext";
import AddNewTaskModal from "./components/AddNewTaskModal";
import TaskDetailsModal from "./components/TaskDetailsModal";
import { Task } from "./types/task";
import { Subtask } from "./types/Subtask";
import ConfirmationModal from "./components/ConfirmationModal";

function App() {
  const [theme, setTheme] = useState<ColorTheme>("dark");
  const [boards, setBoards] = useState<Array<BoardData>>([]);
  const [selectedBoard, setSelectedBoard] = useState<BoardData | undefined>(
    undefined
  );
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [showTaskDetailsModal, setShowTaskDetailsModal] =
    useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [confirmationModalOpenedBy, setConfirmationModalOpenedBy] = useState<
    "boardOptions" | "boardColumn" | undefined
  >(undefined);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [columnToDelete, setColumnToDelete] = useState<string | undefined>(
    undefined
  );

  const selectedBoardToDisplay = selectedBoard
    ? boards.find((b) => b.id === selectedBoard.id)
    : undefined;

  const enableAddTaskButton =
    selectedBoardToDisplay !== undefined &&
    selectedBoardToDisplay.columns.length !== 0;

  const getDoneSubtasks = (subtasks: Array<Subtask> | undefined) => {
    let doneCount = 0;
    if (!subtasks) {
      return 0;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (subtasks[i].done) {
        doneCount++;
      }
    }
    return doneCount;
  };

  const deleteSelectedBoard = (
    selected: BoardData,
    setBoards: React.Dispatch<React.SetStateAction<Array<BoardData>>>,
    setSelectedBoard: React.Dispatch<
      React.SetStateAction<BoardData | undefined>
    >
  ) => {
    setBoards((prev) => {
      return prev.filter((board) => {
        return selected.id !== board.id;
      });
    });
    setSelectedBoard(undefined);
  };

  const deleteSelectedColumn = () => {
    console.log("column deleted");
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].id === selectedBoard!.id) {
        const updatedBoard: BoardData = {
          ...boards[i],
          columns: [
            ...boards[i].columns.filter((prev) => {
              return prev.name !== columnToDelete;
            }),
          ],
        };
        setBoards((prev) => {
          return prev.map((board) => {
            return board.id === selectedBoard!.id ? updatedBoard : board;
          });
        });
      }
    }
  };

  const confirmationModalHandlers = {
    boardOptions: () =>
      deleteSelectedBoard(selectedBoard!, setBoards, setSelectedBoard),
    boardColumn: () => deleteSelectedColumn(),
  };

  return (
    <div className="app">
      <ColorThemeContext.Provider value={theme}>
        {showAddTaskModal && (
          <div className="overlay">
            <AddNewTaskModal
              columns={selectedBoardToDisplay!.columns}
              board={selectedBoardToDisplay!}
              setBoards={setBoards}
              setShowTaskModal={setShowAddTaskModal}
            />
          </div>
        )}
        {showTaskDetailsModal && (
          <div className="overlay">
            <TaskDetailsModal
              boards={boards}
              setBoards={setBoards}
              selectedBoard={selectedBoardToDisplay!}
              selectedTask={selectedTask!}
              setShowTaskDetailsModal={setShowTaskDetailsModal}
              getDoneSubtasks={getDoneSubtasks}
            />
          </div>
        )}
        {showConfirmationModal && (
          <div className="overlay">
            <ConfirmationModal
              onConfirm={
                confirmationModalOpenedBy !== undefined
                  ? confirmationModalHandlers[confirmationModalOpenedBy]
                  : () =>
                      console.error(
                        "ConfirmationModal: No handler for undefined."
                      )
              }
              setShowConfirmationModal={setShowConfirmationModal}
              setConfirmationModalOpenedBy={setConfirmationModalOpenedBy}
            />
          </div>
        )}
        <Sidebar
          setTheme={setTheme}
          setBoards={setBoards}
          boards={boards}
          setSelectedBoard={setSelectedBoard}
          selectedBoard={selectedBoard}
        />
        <div className="mainSectionContainer">
          <Header
            title={selectedBoard ? selectedBoard.title : ""}
            selectedBoard={selectedBoard}
            setShowTaskModal={setShowAddTaskModal}
            enableAddButton={enableAddTaskButton}
            setShowConfirmationModal={setShowConfirmationModal}
            setConfirmationModalOpenedBy={setConfirmationModalOpenedBy}
          />
          <MainArea
            board={selectedBoardToDisplay}
            setBoards={setBoards}
            boards={boards}
            setShowTaskDetailsModal={setShowTaskDetailsModal}
            setSelectedTask={setSelectedTask}
            getDoneSubtasks={getDoneSubtasks}
            setShowConfirmationModal={setShowConfirmationModal}
            setConfirmationModalOpenedBy={setConfirmationModalOpenedBy}
            setColumnToDelete={setColumnToDelete}
          />
        </div>
      </ColorThemeContext.Provider>
    </div>
  );
}

export default App;
