import { FC, useContext } from "react";
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
import { ColorThemeContext } from "../../context/ColorThemeContext";

type SidebarProps = {
  setTheme: React.Dispatch<React.SetStateAction<ColorTheme>>;
  setBoards: React.Dispatch<React.SetStateAction<Array<BoardData>>>;
  boards: Array<BoardData>;
  setSelectedBoard: React.Dispatch<React.SetStateAction<BoardData | undefined>>;
  selectedBoard: BoardData | undefined;
};

const Sidebar: FC<SidebarProps> = ({
  setTheme,
  setBoards,
  boards,
  setSelectedBoard,
  selectedBoard,
}) => {
  const theme = useContext(ColorThemeContext);

  return (
    <div
      className={
        theme === "dark"
          ? styles.sidebarContainer
          : styles.sidebarContainerLight
      }
    >
      <div
        className={
          theme === "dark" ? styles.logoContainer : styles.logoContainerLight
        }
      >
        <img
          src={barsIcon}
          alt="Logo"
          className={theme === "dark" ? styles.barsImg : styles.barsImgLight}
        />
        <h1>Kanban</h1>
      </div>
      <div className={styles.sidebarMenuContainer}>
        <span
          className={
            theme === "dark" ? styles.allBoards : styles.allBoardsLight
          }
        >
          All Boards ({boards.length})
        </span>
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
          <div
            className={
              theme === "dark"
                ? styles.switchThemeContainer
                : styles.switchThemeContainerLight
            }
          >
            <img
              src={sunIcon}
              alt="Light"
              className={
                theme === "dark" ? styles.themeIcon : styles.themeIconLight
              }
            />
            <Switch setTheme={setTheme} />
            <img
              src={moonIcon}
              alt="Dark"
              className={
                theme === "dark" ? styles.themeIcon : styles.themeIconLight
              }
            />
          </div>
          <div
            className={
              theme === "dark"
                ? styles.hideSidebarContainer
                : styles.hideSidebarContainerLight
            }
          >
            <img
              src={hideIcon}
              alt="Hide Sidebar"
              className={
                theme === "dark" ? styles.hideIcon : styles.hideIconLight
              }
            />
            <span>Hide Sidebar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
