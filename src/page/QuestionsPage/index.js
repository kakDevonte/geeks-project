import React from "react";
import QuestionButton from "../../components/QuestionButton";
import styles from "./QuestionsPage.module.scss";
import Button from "../../components/Button";
import children from "../../assets/image/children.png";
import logo from "../../assets/image/main-logo.png";
import { useNavigate } from "react-router-dom";

const QuestionsPage = () => {
  const navigate = useNavigate();
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const onClickQuest = (index) => {
    setAnswer(index);
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>КАКОЙ ТАЛАНТ У ЭТОГО РЕБЕНКА?</h1>
      <div className={styles.content}>
        <img className={styles.children} src={children} alt={""} />
        <div>
          <QuestionButton
            letter={"А"}
            answer={
              "ИГРАЕТ НА ГИТАРЕ" + "width = " + width + " height = " + height
            }
            // type={"yellow"}
            isActive={answer === "A"}
            onClick={() => onClickQuest("A")}
          />
          <QuestionButton
            letter={"B"}
            answer={"ЗАНИМАЕТСЯ ВОЗДУШНОЙ ГИМНАСТИКОй"}
            // type={"yellow"}
            isActive={answer === "B"}
            onClick={() => onClickQuest("B")}
          />
          <QuestionButton
            letter={"C"}
            answer={"МАГНИТИТ ЛОЖКИ К ТЕЛУ"}
            // type={"yellow"}
            isActive={answer === "C"}
            onClick={() => onClickQuest("C")}
          />
        </div>
      </div>

      <div className={styles.footerContainer}>
        <Button title={"ОТПРАВИТЬ ОТВЕТ"} onClick={() => navigate("/r")} />
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
