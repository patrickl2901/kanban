import React, { useState } from "react";
import styles from "./Switch.module.css";

const Switch = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
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
