import React, { FC, useContext, useState } from "react";
import styles from "./Switch.module.css";
import { ColorTheme } from "../../types/ColorTheme";
import { ColorThemeContext } from "../../context/ColorThemeContext";

type SwitchProps = {
  setTheme: React.Dispatch<React.SetStateAction<ColorTheme>>;
};

const Switch: FC<SwitchProps> = ({ setTheme }) => {
  const [isOn, setIsOn] = useState(true);
  const theme = useContext(ColorThemeContext);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div
      className={`${styles.switchContainer} ${
        isOn ? styles.containerOn : styles.containerOff
      }`}
      onClick={toggleSwitch}
    >
      <div
        className={`${isOn ? styles.on : styles.off} ${styles.switch}`}
      ></div>
    </div>
  );
};

export default Switch;
