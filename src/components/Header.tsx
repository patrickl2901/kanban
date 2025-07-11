import { FC, useContext } from "react";
import styles from "../styles/Header.module.css";
import OptionsMenu from "./OptionsMenu";
import OptionsMenuItem from "./OptionsMenuItem";
import TrashIcon from "./TrashIcon";
import { BoardData } from "../types/BoardData";
import { ColorThemeContext } from "../context/ColorThemeContext";

type HeaderProps = {
  title: string;
  selectedBoard: BoardData | undefined;
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  enableAddButton: boolean;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmationModalOpenedBy: React.Dispatch<
    React.SetStateAction<"boardOptions" | "boardColumn" | undefined>
  >;
};

const Header: FC<HeaderProps> = ({
  title,
  selectedBoard,
  setShowTaskModal,
  enableAddButton,
  setShowConfirmationModal,
  setConfirmationModalOpenedBy,
}) => {
  const theme = useContext(ColorThemeContext);

  return (
    <header className={theme === "dark" ? styles.header : styles.headerLight}>
      <h1>{title}</h1>
      <div className={styles.headerOptionsContainer}>
        <button
          onClick={() => setShowTaskModal(true)}
          disabled={!enableAddButton}
          className={
            enableAddButton
              ? undefined
              : theme === "dark"
              ? styles.addButtonDisabled
              : styles.addButtonDisabledLight
          }
        >
          + Add New Task
        </button>
        <OptionsMenu disabled={selectedBoard ? false : true}>
          <OptionsMenuItem
            title="Delete Board"
            icon={<TrashIcon />}
            warn={true}
            handleOnClick={() => {
              setShowConfirmationModal(true);
              setConfirmationModalOpenedBy("boardOptions");
            }}
          />
        </OptionsMenu>
      </div>
    </header>
  );
};

export default Header;
