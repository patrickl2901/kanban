import { useState } from "react";
import "./App.css";
import type { ColorTheme } from "./types/ColorTheme";
import type { BoardData } from "./types/BoardData";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header";
import MainArea from "./components/MainArea";
import { ColorThemeContext } from "./context/ColorThemeContext";
import AddNewTaskModal from "./components/AddNewTaskModal";

function App() {
  const [theme, setTheme] = useState<ColorTheme>("dark");
  const [boards, setBoards] = useState<Array<BoardData>>([]);
  const [selectedBoard, setSelectedBoard] = useState<BoardData | undefined>(
    undefined
  );
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

  const selectedBoardToDisplay = selectedBoard
    ? boards.find((b) => b.id === selectedBoard.id)
    : undefined;

  const enableAddTaskButton =
    selectedBoardToDisplay !== undefined &&
    selectedBoardToDisplay.columns.length !== 0;

  return (
    <div className="app">
      <ColorThemeContext.Provider value={theme}>
        {showTaskModal && (
          <div className="overlay">
            <AddNewTaskModal
              columns={selectedBoardToDisplay!.columns}
              board={selectedBoardToDisplay!}
              setBoards={setBoards}
              setShowTaskModal={setShowTaskModal}
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
            setShowTaskModal={setShowTaskModal}
            enableAddButton={enableAddTaskButton}
          />
          <MainArea
            board={selectedBoardToDisplay}
            setBoards={setBoards}
            boards={boards}
          />
        </div>
      </ColorThemeContext.Provider>
    </div>
  );
}

export default App;
