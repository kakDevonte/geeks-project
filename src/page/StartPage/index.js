import React from "react";
import styles from "./StartPage.module.scss";
import Button from "../../components/Button";
import logo from "../../assets/image/main-logo.png";
import { useNavigate } from "react-router-dom";
import { useGeeksActions } from "../../context/geeks-context";
import inTimeSpan from "../../utils/inTimeSpan";
import { lives } from "../../utils/data";

const timezones = [
  { name: "Europe/Moscow", time: -180 },
  { name: "Europe/Samara", time: -240 },
  { name: "Europe/Kaliningrad", time: -120 },
  { name: "Asia/Yekaterinburg", time: -300 },
  { name: "Asia/Omsk", time: -360 },
  { name: "Asia/Krasnoyarsk", time: -420 },
  { name: "Asia/Irkutsk", time: -480 },
  { name: "Asia/Yakutsk", time: -540 },
  { name: "Asia/Vladivostok", time: -600 },
];

function containsTimezone(obj, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].time === obj) {
      return true;
    }
  }
  return false;
}

const StartPage = () => {
  const navigate = useNavigate();
  const { setPlug, setLive, incrementQuestNumber, setTimezone } =
    useGeeksActions();

  const onClickStart = () => {
    const now = new Date();
    const offset = new Date().getTimezoneOffset();
    const isTimezone = containsTimezone(offset, timezones);

    for (let item of timezones) {
      if (offset === item.time) {
        setTimezone(item);
      }
    }

    if (!isTimezone) {
      setPlug("not-timezone");
      navigate("/plug");
      return;
    } else if (now.getDay() !== 2) {
      setPlug("not-tuesday");
      navigate("/plug");
      return;
    } else if (
      inTimeSpan(
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 30),
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 31)
      )
    ) {
      let currLive;
      for (let i = 0; i < lives.length; i++) {
        if (inTimeSpan(new Date(lives[i].start), new Date(lives[i].end))) {
          currLive = lives[i];
          console.log(lives[i]);
          setLive(lives[i].questions);
          break;
        }
      }
      for (let i = 0; i < currLive.questions.length; i++) {
        if (
          inTimeSpan(
            new Date(currLive.questions[i].start),
            new Date(currLive.questions[i].end)
          )
        ) {
          incrementQuestNumber(i);
          break;
        }
      }
      navigate("/quest");
      return;
    } else if (
      inTimeSpan(
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 40),
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1,
          14,
          59,
          59
        )
      )
    ) {
      setPlug("completed");
      navigate("/plug");
      return;
    } else {
      setPlug("not-tuesday");
      navigate("/plug");
    }
  };

  return (
    <div className={styles.root}>
      <img className={styles.logo} src={logo} alt={""} />
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>
            ВКЛЮЧИ ПЯТНИЦУ! <br /> И УГАДАЙ <br /> ТАЛАНТ РЕБЕНКА
          </h1>
          <h2 className={styles.subTittle}>
            Трое самых быстрых <br />
            получат 500 рублей <br />
          </h2>
          <Button title={"НАЧАТЬ"} disabled={true} onClick={onClickStart} />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
