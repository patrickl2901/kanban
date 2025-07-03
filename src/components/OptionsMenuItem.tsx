import React, { FC } from "react";
import styles from "../styles/OptionsMenuItem.module.css";

export type OptionsMenuItemProps = {
  title: string;
  icon: React.ReactNode;
  warn: boolean;
  handleOnClick: () => void;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const OptionsMenuItem: FC<OptionsMenuItemProps> = ({
  title,
  icon,
  warn,
  handleOnClick,
  setOpen,
}) => {
  return (
    <div
      className={styles.menuItem}
      onClick={() => {
        handleOnClick();
        if (setOpen) {
          setOpen(false);
        }
      }}
    >
      {icon}
      <span className={warn ? styles.warnColor : undefined}>{title}</span>
    </div>
  );
};

export default OptionsMenuItem;
