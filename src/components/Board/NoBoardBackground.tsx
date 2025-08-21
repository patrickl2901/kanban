import React, { useContext } from "react";
import noBoardBackground from "../../assets/no-boards-bg.png";
import styles from "./NoBoardBackground.module.css";
import { ColorThemeContext } from "../../context/ColorThemeContext";

const NoBoardBackground = () => {
  const theme = useContext(ColorThemeContext);
  return (
    <div className={styles.noBoardBackground}>
      <img
        src={noBoardBackground}
        alt="No Board Selected"
        className={styles.noBoardBackgroundImg}
      />
      <h1
        className={
          theme === "dark" ? styles.noBoardText : styles.noBoardTextLight
        }
      >
        Create or Select a Board to start.
      </h1>
    </div>
  );
};

export default NoBoardBackground;
