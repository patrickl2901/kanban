import { useState } from "react";
import "./App.css";
import type { ColorTheme } from "./types/ColorTheme";
import type { BoardData } from "./types/BoardData";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header";
import MainArea from "./components/MainArea";
import { ColorThemeContext } from "./context/ColorThemeContext";

function App() {
  const [theme, setTheme] = useState<ColorTheme>("dark");
  const [boards, setBoards] = useState<Array<BoardData>>([]);
  const [selectedBoard, setSelectedBoard] = useState<BoardData | undefined>(
    undefined
  );

  const selectedBoardToDisplay = selectedBoard
    ? boards.find((b) => b.id === selectedBoard.id)
    : undefined;

  return (
    <div className="app">
      <ColorThemeContext.Provider value={theme}>
        <Sidebar
          setTheme={setTheme}
          setBoards={setBoards}
          boards={boards}
          setSelectedBoard={setSelectedBoard}
          selectedBoard={selectedBoard}
        />
        <div className="mainSectionContainer">
          <Header title={selectedBoard ? selectedBoard.title : ""} />
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
