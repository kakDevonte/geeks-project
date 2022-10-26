import React from "react";
import styles from "./Button.module.scss";

const Button = ({ title, onClick, disabled }) => {
  return (
    <button disabled={!disabled} className={styles.root} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
