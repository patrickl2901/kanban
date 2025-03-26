import { FC } from "react";
import styles from "../styles/Header.module.css";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1>Board Title</h1>
      <div className={styles.headerOptionsContainer}>
        <button>+ Add New Task</button>
      </div>
    </header>
  );
};

export default Header;
