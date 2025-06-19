import { FC } from "react";
import styles from "../styles/Header.module.css";

type HeaderProps = {
  title: string;
  setShowTaskModal: (show: boolean) => void;
  enableAddButton: boolean;
};

const Header: FC<HeaderProps> = ({
  title,
  setShowTaskModal,
  enableAddButton,
}) => {
  /* TODO: disable 'Add New Task' button by default and only enable
   *    when a board is selected
   **/

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
      </div>
    </header>
  );
};

export default Header;
