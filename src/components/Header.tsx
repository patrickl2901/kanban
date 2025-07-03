import { FC } from "react";
import styles from "../styles/Header.module.css";
import OptionsMenu from "./OptionsMenu";
import OptionsMenuItem from "./OptionsMenuItem";
import TrashIcon from "./TrashIcon";
import { BoardData } from "../types/BoardData";

type HeaderProps = {
  title: string;
  selectedBoard: BoardData | undefined;
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  enableAddButton: boolean;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: FC<HeaderProps> = ({
  title,
  selectedBoard,
  setShowTaskModal,
  enableAddButton,
  setShowConfirmationModal,
}) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <div className={styles.headerOptionsContainer}>
        <button
          onClick={() => setShowTaskModal(true)}
          disabled={!enableAddButton}
          className={enableAddButton ? undefined : styles.addButtonDisabled}
        >
          + Add New Task
        </button>
        <OptionsMenu disabled={selectedBoard ? false : true}>
          <OptionsMenuItem
            title="Delete Board"
            icon={<TrashIcon />}
            warn={true}
            handleOnClick={() => setShowConfirmationModal(true)}
          />
        </OptionsMenu>
      </div>
    </header>
  );
};

export default Header;
