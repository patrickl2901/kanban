import { useState } from "react";
import "./App.css";
import type { ColorTheme } from "./types/ColorTheme";
import type { BoardData } from "./types/BoardData";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header";
import { ColorThemeContext } from "./context/ColorThemeContext";

function App() {
  const [theme, setTheme] = useState<ColorTheme>("dark");
  const [boards, setBoards] = useState<Array<BoardData>>([]);
  return (
    <div className="app">
      <ColorThemeContext.Provider value={theme}>
        <Sidebar setTheme={setTheme} setBoards={setBoards} boards={boards} />
        <div className="mainSectionContainer">
          <Header />
          <h1>kanban board</h1>
        </div>
      </ColorThemeContext.Provider>
    </div>
  );
}

export default App;
