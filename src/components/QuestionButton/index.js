import React from "react";
import styles from "./QuestionButton.module.scss";

const QuestionButton = ({ letter, answer, type, isActive, onClick }) => {
  return (
    <div
      className={`${styles.button} ${
        type === "yellow" ? styles.yellow : styles.violet
      } ${isActive && styles.active}`}
      onClick={onClick}
    >
      <div
        className={`${styles.arc} ${
          type === "yellow" ? styles.yellow : styles.violet
        } ${isActive && styles.active}`}
      >
        <span>{letter}</span>
      </div>
      <span className={styles.text}>{answer}</span>
      <hr
        className={`${styles.line} ${
          type === "yellow" ? styles.yellow : styles.violet
        } ${isActive && styles.active}`}
      />
    </div>
  );
};

export default QuestionButton;
