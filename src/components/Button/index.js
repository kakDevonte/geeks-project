import React from "react";
import styles from "./Button.module.scss";

const Button = ({ title }) => {
  return <button className={styles.root}>{title}</button>;
};

export default Button;
