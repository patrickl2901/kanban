import { FC } from "react";
import styles from "../styles/Header.module.css";

type HeaderProps = {
  title: string;
};

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <div className={styles.headerOptionsContainer}>
        <button>+ Add New Task</button>
      </div>
    </header>
  );
};

export default Header;
