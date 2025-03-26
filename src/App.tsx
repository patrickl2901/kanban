import { useState } from "react";
import "./App.css";
import type { ColorTheme } from "./types/ColorTheme";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header";
import { ColorThemeContext } from "./context/ColorThemeContext";

function App() {
  const [theme, setTheme] = useState<ColorTheme>("dark");
  return (
    <div className="app">
      <ColorThemeContext.Provider value={theme}>
        <Sidebar setTheme={setTheme} />
        <div className="mainSectionContainer">
          <Header />
          <h1>kanban board</h1>
        </div>
      </ColorThemeContext.Provider>
    </div>
  );
}

export default App;
