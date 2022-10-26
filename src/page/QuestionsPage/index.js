import React from "react";
import QuestionButton from "../../components/QuestionButton";
import styles from "./QuestionsPage.module.scss";
import Button from "../../components/Button";
import children from "../../assets/image/children.png";
import logo from "../../assets/image/main-logo.png";
import { useNavigate } from "react-router-dom";
import data from "../../utils/data.json";

const QuestionsPage = () => {
  const navigate = useNavigate();
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);
  const [answerText, setAnswerText] = React.useState(null);

  const onClickQuest = (index, text) => {
    setAnswer(index);
    setAnswerText(text);
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>КАКОЙ ТАЛАНТ У ЭТОГО РЕБЕНКА?</h1>
      <div className={styles.content}>
        <img className={styles.children} src={children} alt={""} />
        {isAnswered ? (
          <div className={styles.answer}>
            <QuestionButton letter={answer} answer={answerText} />
            <h2 className={styles.subTittle}>
              Правильный ответ
              <br />
              появится
              <br />в эфире Пятницы!
              <br />
              через пару минут
            </h2>
          </div>
        ) : (
          <div>
            <QuestionButton
              letter={"А"}
              answer={"ОБЛАДАЕТ ВЫДАЮЩИМИСЯ ВОКАЛЬНЫМИ ДАННЫМИ"}
              // type={"yellow"}
              isActive={answer === "A"}
              onClick={
                () =>
                  onClickQuest("A", "ОБЛАДАЕТ ВЫДАЮЩИМИСЯ ВОКАЛЬНЫМИ ДАННЫМИ") //data.ethers[0].questions[1].answers[0]
              }
            />
            <QuestionButton
              letter={"B"}
              answer={data.ethers[0].questions[1].answers[1]}
              // type={"yellow"}
              isActive={answer === "B"}
              onClick={() =>
                onClickQuest("B", data.ethers[0].questions[1].answers[1])
              }
            />
            <QuestionButton
              letter={"C"}
              answer={data.ethers[0].questions[1].answers[2]}
              // type={"yellow"}
              isActive={answer === "C"}
              onClick={() =>
                onClickQuest("C", data.ethers[0].questions[1].answers[2])
              }
            />
          </div>
        )}
        {!isAnswered && (
          <div className={styles.button}>
            <Button
              disabled={answer}
              title={"ОТПРАВИТЬ ОТВЕТ"}
              onClick={() => setIsAnswered(true)}
            />
          </div>
        )}
      </div>
      <div className={styles.footerContainer}>
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
