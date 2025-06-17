import { FC } from "react";
import { ColorTheme } from "../../types/ColorTheme";
import styles from "../Sidebar/Sidebar.module.css";
import barsIcon from "../../assets/bars-staggered-solid.svg";
import sunIcon from "../../assets/sun-solid.svg";
import moonIcon from "../../assets/moon-solid.svg";
import hideIcon from "../../assets/eye-slash-solid.svg";
import BoardTab from "./BoardTab";
import Switch from "./Switch";
import CreateNewBoardTab from "./CreateNewBoardTab";
import { BoardData } from "../../types/BoardData";

type SidebarProps = {
  setTheme: (colorTheme: ColorTheme) => void;
  setBoards: (boards: Array<BoardData>) => void;
  boards: Array<BoardData>;
  setSelectedBoard: (board: BoardData) => void;
  selectedBoard: BoardData | undefined;
};

const Sidebar: FC<SidebarProps> = ({
  setTheme,
  setBoards,
  boards,
  setSelectedBoard,
  selectedBoard,
}) => {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logoContainer}>
        <img src={barsIcon} alt="Logo" className={styles.barsImg} />
        <h1>Kanban</h1>
      </div>
      <div className={styles.sidebarMenuContainer}>
        <span className={styles.allBoards}>All Boards ({boards.length})</span>
        <div className={styles.selectBoardSectionContainer}>
          {boards.map((board, index) => {
            return (
              <BoardTab
                title={board.title}
                key={index}
                setSelectedBoard={setSelectedBoard}
                selectedBoard={selectedBoard}
                id={board.id}
                boards={boards}
              />
            );
          })}
          <CreateNewBoardTab
            setBoards={setBoards}
            boards={boards}
            setSelectedBoard={setSelectedBoard}
          />
        </div>
        <div className={styles.sidebarOptionsContainer}>
          <div className={styles.switchThemeContainer}>
            <img src={sunIcon} alt="Light" className={styles.themeIcon} />
            <Switch />
            <img src={moonIcon} alt="Dark" className={styles.themeIcon} />
          </div>
          <div className={styles.hideSidebarContainer}>
            <img
              src={hideIcon}
              alt="Hide Sidebar"
              className={styles.hideIcon}
            />
            <span>Hide Sidebar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
