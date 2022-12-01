import React from "react";
import { clearInterval, setInterval } from "worker-timers";
import styles from "./ResultPage.module.scss";
import late from "../../assets/image/late-face.png";
import lose from "../../assets/image/lose-face.png";
import win from "../../assets/image/win-face.png";
import logo from "../../assets/image/logo-footer.png";
import { useNavigate, useParams } from "react-router-dom";
import { useGeeksActions, useGeeksState } from "../../context/geeks-context";
import data from "../../utils/data.json";
import { time } from "../../App";
import { geeksAPI } from "../../api/geeks-api";
import calcTime from "../../utils/calcTime";
import getTimezone from "../../utils/getTimezone";

const state = [
  {
    image: late,
    title: [
      "КТО-ТО ОТВЕТИЛ БЫСТРЕЕ",
      // <br />,
      "ЧЕМ ТЫ. НО ИНТУИЦИЯ",
      // <br />,
      "ТЕБЯ НЕ ПОДВЕЛА",
    ],
    subTitle: [
      "Следующий вопрос",
      // <br />,
      "появится тут через",
      // <br />,
      "несколько минут",
    ],
  },
  {
    image: win,
    title: ["ПОЗДРАВЛЯЕМ,", "500 РУБЛЕЙ ТВОИ!"],
    subTitle: ["Свяжись с нами,", "чтобы забрать приз"],
  },
  {
    image: lose,
    title: ["ИЗВИНИ. В ЭТОТ РАЗ", "ИНТУИЦИЯ", "ТЕБЯ ПОДВЕЛА."],
    subTitle: [
      "Ничего страшного,",
      "следующий вопрос",
      "появится тут через",
      "несколько минут",
    ],
  },
];

const secondsInDate = (currTime) => {
  let date = new Date(currTime);
  const diff = date - new Date(time.time);
  return diff / 1000;
};

const ResultPage = () => {
  const [seconds, setSeconds] = React.useState(10);
  const [isMount, setIsMount] = React.useState(false);
  const { incrementQuestNumber, setPlug } = useGeeksActions();
  const { questionNumber, live } = useGeeksState();
  const { status } = useParams();
  const navigate = useNavigate();
  let index;

  React.useEffect(() => {
    (async () => {
      const { data } = await geeksAPI.getTime();
      const date = new Date(data.slice(0, -1));
      time.setTime(calcTime(date.getTime(), getTimezone()).getTime());
    })();
  }, []);

  React.useEffect(() => {
    if (!live) return;
    if (live.questions[questionNumber + 1]?.start) {
      const date2 = new Date(live.questions[questionNumber + 1]?.start);
      setSeconds(secondsInDate(date2));
    } else {
      setSeconds(45);
    }
    setIsMount(true);
  }, []);

  React.useEffect(() => {
    if (!isMount) return;

    if (seconds <= 0) {
      if (questionNumber + 1 >= data.ethers[0].questions.length) {
        setPlug("completed");
        navigate("/plug");
      } else {
        incrementQuestNumber(questionNumber + 1);
        navigate("/quest");
      }
      // navigate("/quest");
    }

    let myInterval = setInterval(() => {
      let currSeconds;
      console.log("До начала вопроса = ", seconds);
      if (
        isNaN(seconds) ||
        seconds === undefined ||
        seconds < -100 ||
        seconds > 3000
      )
        navigate("/");

      if (live.questions[questionNumber + 1]?.start) {
        const date2 = new Date(live.questions[questionNumber + 1]?.start);
        currSeconds = secondsInDate(date2);
        setSeconds(currSeconds - 1);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  switch (status) {
    case "win": {
      index = 1;
      break;
    }
    case "so-close": {
      index = 0;
      break;
    }
    case "lose": {
      index = 2;
      break;
    }
  }

  return (
    <div className={styles.root}>
      <div>
        <img className={styles.face} src={state[index].image} alt={""} />
        <div className={styles.content}>
          {state[index].title.map((item, index) => (
            <h1 className={styles.title} key={index}>
              {item}
            </h1>
          ))}
        </div>
        <div className={styles.content}>
          {state[index].subTitle.map((item, index) => (
            <h2 className={styles.subTitle} key={index}>
              {item}
            </h2>
          ))}
        </div>
        {status === "win" && (
          <div className={styles.btnContainer}>
            {/*<a href="https://ok.ru/group/54070567370772/messages">*/}
            {/*  <button className={styles.btnVk}>СВЯЗАТЬСЯ В ВК</button>*/}
            {/*</a>*/}
            <a
              target="_blank"
              href="https://ok.ru/group/54070567370772/messages"
            >
              <button className={styles.btnOk}>СВЯЗАТЬСЯ В ОК</button>
            </a>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <img className={styles.logo} src={logo} alt={""} />
        <h1 className={styles.time}>
          ВТОРНИК
          <br />
          <span>20:30</span>
        </h1>
      </div>
    </div>
  );
};

export default ResultPage;
