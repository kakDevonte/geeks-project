import React from "react";
import QuestionButton from "../../components/QuestionButton";
import styles from "./QuestionsPage.module.scss";
import Button from "../../components/Button";
import children from "../../assets/image/children.png";
import logo from "../../assets/image/main-logo.png";

const QuestionsPage = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>КАКОЙ ТАЛАНТ У ЭТОГО РЕБЕНКА?</h1>
      <div>
        <img className={styles.children} src={children} alt={""} />

        <QuestionButton
          letter={"А"}
          answer={"ИГРАЕТ НА ГИТАРЕ"}
          type={"yellow"}
        />
        <QuestionButton
          letter={"B"}
          answer={"ЗАНИМАЕТСЯ ВОЗДУШНОЙ ГИМНАСТИКОй"}
          // type={"yellow"}
        />
        <QuestionButton
          letter={"C"}
          answer={"МАГНИТИТ ЛОЖКИ К ТЕЛУ"}
          type={"yellow"}
        />
      </div>

      <div className={styles.footerContainer}>
        <Button title={"ОТПРАВИТЬ ОТВЕТ"} />
        <div className={styles.footer}>
          <img className={styles.logo} src={logo} alt={""} />
          <h1 className={styles.time}>
            ВТОРНИК
            <br />
            <span>19:00</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
