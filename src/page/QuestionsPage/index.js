import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionButton from "../../components/QuestionButton";
import styles from "./QuestionsPage.module.scss";
import Button from "../../components/Button";
import children from "../../assets/image/children.png";
import logo from "../../assets/image/logo-footer.png";
import data from "../../utils/data.json";
import { useGeeksState } from "../../context/geeks-context";

const secondsInDate = (time) => {
  let now = new Date();
  let date = new Date(time);
  const diff = date - new Date();
  return diff / 1000;
};

const QuestionsPage = () => {
  const navigate = useNavigate();
  const { live } = useGeeksState();
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);
  const [index, setIndex] = React.useState(null);
  const [answerText, setAnswerText] = React.useState(null);
  const [seconds, setSeconds] = React.useState(0);
  const [isMount, setIsMount] = React.useState(false);

  React.useEffect(() => {
    const date1 = new Date();
    const date2 = new Date(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate(),
      date1.getHours(),
      date1.getMinutes() + 1
    );
    setSeconds(secondsInDate(date2));
    setIsMount(true);
  }, []);

  React.useEffect(() => {
    if (!isMount) return;
    console.log(isAnswered);
    if (seconds <= 0 && isAnswered) {
      if (index === data.ethers[0].questions[1].correct) {
        navigate(`/result/win`);
      } else {
        navigate("/result/so-close");
      }
    }
    if (seconds <= 0 && !isAnswered) {
      navigate(`/result/lose`);
    }

    console.log(seconds);
    let myInterval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const onClickQuest = (letter, index, text) => {
    setAnswer(letter);
    setIndex(index);
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
              answer={data.ethers[0].questions[1].answers[0]}
              // type={"yellow"}
              isActive={answer === "A"}
              onClick={
                () =>
                  onClickQuest("A", 1, data.ethers[0].questions[1].answers[0]) //data.ethers[0].questions[1].answers[0]
              }
            />
            <QuestionButton
              letter={"B"}
              answer={data.ethers[0].questions[1].answers[1]}
              // type={"yellow"}
              isActive={answer === "B"}
              onClick={() =>
                onClickQuest("B", 2, data.ethers[0].questions[1].answers[1])
              }
            />
            <QuestionButton
              letter={"C"}
              answer={data.ethers[0].questions[1].answers[2]}
              // type={"yellow"}
              isActive={answer === "C"}
              onClick={() =>
                onClickQuest("C", 3, data.ethers[0].questions[1].answers[2])
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
            <span>20:30</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
