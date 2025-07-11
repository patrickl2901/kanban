import React, { FC, useContext, useState } from "react";
import ellipsis from "../assets/ellipsis-vertical-solid.svg";
import styles from "../styles/OptionsMenu.module.css";
import { OptionsMenuItemProps } from "./OptionsMenuItem";
import { ColorThemeContext } from "../context/ColorThemeContext";

type OptionsMenuProps = {
  children:
    | React.ReactElement<OptionsMenuItemProps>
    | React.ReactElement<OptionsMenuItemProps>[];
  disabled: boolean;
};

const OptionsMenu: FC<OptionsMenuProps> = ({ children, disabled }) => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useContext(ColorThemeContext);

  const handleOnClick = () => {
    setOpen(!open);
  };

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<OptionsMenuItemProps>(child)) {
      return React.cloneElement(child, { setOpen });
    }
    return child;
  });

  return (
    <div>
      <button
        className={styles.optionsButton}
        onClick={handleOnClick}
        disabled={disabled}
      >
        <img
          src={ellipsis}
          alt="options"
          className={
            theme === "dark" ? styles.optionsIcon : styles.optionsIconLight
          }
        />
      </button>
      <div className={styles.dropdown}>{open && enhancedChildren}</div>
    </div>
  );
};

export default OptionsMenu;
