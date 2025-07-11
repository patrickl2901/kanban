import React, { useContext } from "react";
import styles from "../styles/ConfirmationModal.module.css";
import { ColorThemeContext } from "../context/ColorThemeContext";

type ConfirmationModalProps<F extends (...args: unknown[]) => unknown> = {
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: F;
  setConfirmationModalOpenedBy: React.Dispatch<
    React.SetStateAction<"boardOptions" | "boardColumn" | undefined>
  >;
};

const ConfirmationModal = <F extends (...args: unknown[]) => unknown>({
  setShowConfirmationModal,
  onConfirm,
  setConfirmationModalOpenedBy,
}: ConfirmationModalProps<F>) => {
  const theme = useContext(ColorThemeContext);

  const handleCancelClick = () => {
    setShowConfirmationModal(false);
    setConfirmationModalOpenedBy(undefined);
  };

  const handleConfirmClick = () => {
    onConfirm();
    setShowConfirmationModal(false);
    setConfirmationModalOpenedBy(undefined);
  };

  return (
    <div
      className={
        theme === "dark"
          ? styles.confirmationModal
          : styles.confirmationModalLight
      }
    >
      <span>Are you sure?</span>
      <div>
        <button className={styles.cancelButton} onClick={handleCancelClick}>
          Cancel
        </button>
        <button className={styles.confirmButton} onClick={handleConfirmClick}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
