import React, { FC, useContext } from "react";
import styles from "../styles/OptionsMenuItem.module.css";
import { ColorThemeContext } from "../context/ColorThemeContext";

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
  const theme = useContext(ColorThemeContext);

  return (
    <div
      className={theme === "dark" ? styles.menuItem : styles.menuItemLight}
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
