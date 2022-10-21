import React from "react";
import styles from "./QuestionButton.module.scss";

const QuestionButton = ({ letter, answer, type }) => {
  return (
    <a
      href="#"
      className={`${styles.button} ${
        type === "yellow" ? styles.yellow : styles.violet
      }`}
    >
      <div
        className={`${styles.arc} ${
          type === "yellow" ? styles.yellow : styles.violet
        }`}
      >
        {letter}
      </div>
      <span className={styles.text}>{answer}</span>
      <hr
        className={`${styles.line} ${
          type === "yellow" ? styles.yellow : styles.violet
        }`}
      />
    </a>
  );
};

export default QuestionButton;
