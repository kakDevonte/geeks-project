import React from "react";
import styles from "./Button.module.scss";

const Button = ({ title, onClick }) => {
  return (
    <button className={styles.root} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
