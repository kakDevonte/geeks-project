import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionButton from "../../components/QuestionButton";
import styles from "./QuestionsPage.module.scss";
import logo from "../../assets/image/logo-footer.png";
import { useGeeksActions, useGeeksState } from "../../context/geeks-context";
import { geeksAPI } from "../../api/geeks-api";
import { clearInterval, setInterval } from "worker-timers";
import inTimeSpan from "../../utils/inTimeSpan";
import { time } from "../../App";
import calcTime from "../../utils/calcTime";
import getTimezone from "../../utils/getTimezone";
import Spinner from "../../components/Spinner";

const secondsInDate = (currTime) => {
  let date = new Date(currTime);
  const diff = date - new Date(time.time);
  return diff / 1000;
};

const QuestionsPage = () => {
  const navigate = useNavigate();
  const { questionNumber, live, user, currTimezone, name, correctTime } =
    useGeeksState();
  const { sendAnswer, setQuest } = useGeeksActions();
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);
  const [index, setIndex] = React.useState(null);
  const [answerText, setAnswerText] = React.useState(null);
  const [seconds, setSeconds] = React.useState(0);
  const [isMount, setIsMount] = React.useState(false);
  const [isLate, setIsLate] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!live) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      const { data } = await geeksAPI.getTime();
      const date = new Date(data.slice(0, -1));
      time.setTime(calcTime(date.getTime(), getTimezone()).getTime());
    })();
  }, []);

  React.useEffect(() => {
    if (
      inTimeSpan(
        new Date(live.questions[questionNumber].start),
        new Date(live.questions[questionNumber].end)
      )
    ) {
      const date = new Date(live.questions[questionNumber].end);
      setSeconds(secondsInDate(date));
    } else {
      const date = new Date(live.questions[questionNumber + 1]?.start);
      setSeconds(secondsInDate(date));
      setIsLate(true);
    }
  }, []);

  React.useEffect(() => {
    let currSeconds;
    let currIsLate = false;
    let currIsAnswered = false;
    // создание или получение квеста
    (async () => {
      const { data } = await geeksAPI.getQuest(
        live.number,
        live.questions[questionNumber].number,
        name
      );
      if (data) {
        setQuest(data);
      } else {
        await geeksAPI.createQuest({
          liveNumber: live.number,
          number: live.questions[questionNumber].number,
          answers: [],
          winners: [],
          timezone: name,
          isSentWinners: false,
        });
      }
    })();

    // ответил или нет
    (async () => {
      const now = new Date(time.time);
      const { data } = await geeksAPI.isAnswer({
        liveNumber: live.number,
        number: live.questions[questionNumber].number,
        id: user.id,
        timezone: name,
      });
      if (data) {
        currIsAnswered = data.isAnswer;
        setIsAnswered(data.isAnswer);
        let letter, text;
        switch (data.index) {
          case 1: {
            letter = "A";
            text = live.questions[questionNumber].answers[0];
            break;
          }
          case 2: {
            letter = "B";
            text = live.questions[questionNumber].answers[1];
            break;
          }
          case 3: {
            letter = "C";
            text = live.questions[questionNumber].answers[2];
            break;
          }
        }
        setAnswer(letter);
        setAnswerText(text);
      }

      if (
        !inTimeSpan(
          new Date(live.questions[questionNumber].start),
          new Date(live.questions[questionNumber].end)
        ) &&
        currIsAnswered
      ) {
        const { data } = await geeksAPI.isWin({
          liveNumber: live.number,
          number: live.questions[questionNumber].number,
          id: user.id,
          timezone: name,
        });
        navigate(`/result/${data}`);
        return;
      }

      setIsMount(true);
      setIsLoading(false);
    })();

    // получение секунд до конца вопроса
  }, []);

  React.useEffect(() => {
    if (!isMount) return;

    if (seconds <= 0) {
      const today = new Date(time.time);

      if (!isAnswered) {
        sendAnswer(live.number, live.questions[questionNumber].number, name, {
          ...user,
          timeAnswer:
            today.toLocaleDateString("ru") +
            " " +
            today.toLocaleTimeString("ru"),
          correct: false,
          numberAns: index,
          numberLive: live.number,
          isLate,
        });
      }

      (async () => {
        try {
          const { data } = await geeksAPI.isWin({
            liveNumber: live.number,
            number: live.questions[questionNumber].number,
            id: user.id,
            timezone: name,
          });
          navigate(`/result/${data}`);
        } catch (e) {
          navigate(`/result/lose`);
        }
      })();
    }

    let myInterval = setInterval(() => {
      let currSeconds;
      console.log("До конца вопроса = ", seconds);
      if (
        isNaN(seconds) ||
        seconds === undefined ||
        seconds < -100 ||
        seconds > 3000
      )
        navigate("/");

      if (isLate) {
        if (live.questions[questionNumber + 1]?.start) {
          const date = new Date(live.questions[questionNumber + 1]?.start);
          currSeconds = secondsInDate(date);
        } else {
          const date = new Date(live.questions[questionNumber].end);
          currSeconds = secondsInDate(date);
        }
      } else {
        const date = new Date(live.questions[questionNumber].end);
        currSeconds = secondsInDate(date);
      }
      if (isLate && isAnswered) {
        currSeconds = 0;
      }
      setSeconds(currSeconds - 1);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }); // таймер

  const onClickQuest = (letter, index, text) => {
    setAnswer(letter);
    setIndex(index);
    setAnswerText(text);
  };

  const onClickSendAnswer = () => {
    const currAns = index === live.questions[questionNumber].correct;
    const today = new Date(time.time);
    const now = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      today.getHours() + correctTime,
      today.getMinutes(),
      today.getSeconds()
    );
    sendAnswer(live.number, live.questions[questionNumber].number, name, {
      ...user,
      timeAnswer:
        now.toLocaleDateString("ru") + " " + now.toLocaleTimeString("ru"),
      correct: currAns,
      numberAns: index,
      numberLive: live.number,
      isLate,
    });
    setIsAnswered(true);
    setSeconds(seconds - 1);
  };

  if (isLoading) {
    return (
      <div className={styles.root}>
        <Spinner />
      </div>
    );
  }

  if (!isMount) return <></>;

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>КАКОЙ ТАЛАНТ У ЭТОГО РЕБЕНКА?</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <img
            className={styles.children}
            src={
              require(`../../assets/image/children/${live.questions[questionNumber].number}.png`)
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
              answer={live.questions[questionNumber].answers[0]}
              // type={"yellow"}
              isActive={answer === "A"}
              onClick={
                () =>
                  onClickQuest(
                    "A",
                    1,
                    live.questions[questionNumber].answers[0]
                  ) //data.ethers[0].questions[1].answers[0]
              }
            />
            <QuestionButton
              letter={"B"}
              answer={live.questions[questionNumber].answers[1]}
              // type={"yellow"}
              isActive={answer === "B"}
              onClick={() =>
                onClickQuest("B", 2, live.questions[questionNumber].answers[1])
              }
            />
            <QuestionButton
              letter={"C"}
              answer={live.questions[questionNumber].answers[2]}
              // type={"yellow"}
              isActive={answer === "C"}
              onClick={() =>
                onClickQuest("C", 3, live.questions[questionNumber].answers[2])
              }
            />
          </div>
        )}
        {!isAnswered && (
          <div className={`${styles.btnContainer}`}>
            <button
              className={`${styles.button} ${isAnswered && styles.active}`}
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
