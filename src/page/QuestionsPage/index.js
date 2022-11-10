import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionButton from "../../components/QuestionButton";
import styles from "./QuestionsPage.module.scss";
import logo from "../../assets/image/logo-footer.png";
import { useGeeksActions, useGeeksState } from "../../context/geeks-context";
import { geeksAPI } from "../../api/geeks-api";
import { clearInterval, setInterval } from "worker-timers";
const secondsInDate = (time) => {
  let date = new Date(time);
  const diff = date - new Date();
  return diff / 1000;
};

const QuestionsPage = () => {
  const navigate = useNavigate();
  const { questionNumber, live, user, currTimezone } = useGeeksState();
  const { sendAnswer, setQuest } = useGeeksActions();
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);
  const [index, setIndex] = React.useState(null);
  const [answerText, setAnswerText] = React.useState(null);
  const [seconds, setSeconds] = React.useState(0);
  const [isMount, setIsMount] = React.useState(false);

  console.log("QUESTION NUMBER === ", questionNumber);
  console.log("USER === ", user);

  React.useEffect(() => {
    if (!live) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    if (!live) return;
    (async () => {
      const now = new Date();

      const { data } = await geeksAPI.getQuest(
        now.toLocaleDateString("ru"),
        live[questionNumber].number,
        currTimezone
      );
      if (data) {
        setQuest(data);
      } else {
        await geeksAPI.createQuest({
          liveDate: now.toLocaleDateString("ru"),
          number: live[questionNumber].number,
          answers: [],
          timezone: currTimezone,
        });
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!live) return;
    (async () => {
      const now = new Date();
      const { data } = await geeksAPI.isAnswer({
        liveDate: now.toLocaleDateString("ru"),
        number: live[questionNumber].number,
        id: user.id,
        timezone: currTimezone,
      });
      if (data) {
        setIsAnswered(data.isAnswer);
        let letter, text;
        switch (data.index) {
          case 1: {
            letter = "A";
            text = live[questionNumber].answers[0];
            break;
          }
          case 2: {
            letter = "B";
            text = live[questionNumber].answers[1];
            break;
          }
          case 3: {
            letter = "C";
            text = live[questionNumber].answers[2];
            break;
          }
        }
        setAnswer(letter);
        setAnswerText(text);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!live) return;
    const date2 = new Date(live[questionNumber].end);
    setSeconds(secondsInDate(date2));
    setIsMount(true);
  }, []);

  React.useEffect(() => {
    if (!isMount) return;
    if (seconds <= 0) {
      (async () => {
        try {
          const { data } = await geeksAPI.isWin({
            liveDate: new Date().toLocaleDateString("ru"),
            number: live[questionNumber].number,
            id: user.id,
            timezone: currTimezone,
          });
          console.log("РЕЗУЛЬТАТ = ", data);
          navigate(`/result/${data}`);
        } catch (e) {
          navigate(`/result/lose`);
        }
      })();
    }

    console.log("СЕКУНД ВОПРОСА = ", seconds);
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

  console.log(answer);
  const onClickSendAnswer = () => {
    const currAns = index === live[questionNumber].correct;
    const today = new Date();
    sendAnswer(
      today.toLocaleDateString("ru"),
      live[questionNumber].number,
      currTimezone,
      {
        ...user,
        timeAnswer:
          today.toLocaleDateString("ru") + " " + today.toLocaleTimeString("ru"),
        correct: currAns,
        numberAns: index,
        numberLive: live.number,
      }
    );
    setIsAnswered(true);
    setSeconds(seconds - 1);
  };

  if (!isMount) return <></>;
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>КАКОЙ ТАЛАНТ У ЭТОГО РЕБЕНКА?</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <img
            className={styles.children}
            src={
              require(`../../assets/image/children/${live[questionNumber].number}.png`)
                .default
            }
            alt={""}
          />
        </div>
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
              answer={live[questionNumber].answers[0]}
              // type={"yellow"}
              isActive={answer === "A"}
              onClick={
                () => onClickQuest("A", 1, live[questionNumber].answers[0]) //data.ethers[0].questions[1].answers[0]
              }
            />
            <QuestionButton
              letter={"B"}
              answer={live[questionNumber].answers[1]}
              // type={"yellow"}
              isActive={answer === "B"}
              onClick={() =>
                onClickQuest("B", 2, live[questionNumber].answers[1])
              }
            />
            <QuestionButton
              letter={"C"}
              answer={live[questionNumber].answers[2]}
              // type={"yellow"}
              isActive={answer === "C"}
              onClick={() =>
                onClickQuest("C", 3, live[questionNumber].answers[2])
              }
            />
          </div>
        )}
        {!isAnswered && (
          <div className={styles.btnContainer}>
            <button
              className={styles.button}
              disabled={answer === null}
              onClick={onClickSendAnswer}
            >
              ОТПРАВИТЬ ОТВЕТ
            </button>
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
