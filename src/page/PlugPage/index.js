import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/main-logo.png";
import styles from "./PlugPage.module.scss";
import { useGeeksActions, useGeeksState } from "../../context/geeks-context";
import useInterval from "../../utils/useInterval";
import inTimeSpan from "../../utils/inTimeSpan";
import { lives } from "../../utils/data";

export const PlugPage = () => {
  const navigate = useNavigate();
  const { plug, currTimezone, live, user } = useGeeksState();
  const { incrementQuestNumber, setLive } = useGeeksActions();
  const [currLive, setCurrLive] = React.useState(null);
  React.useEffect(() => {
    if (!plug) {
      navigate("/");
    }
  }, []);

  useInterval(() => {
    for (let i = 0; i < lives.length; i++) {
      console.log("проверяем");
      console.log(user);
      if (inTimeSpan(new Date(lives[i].start), new Date(lives[i].end))) {
        console.log(lives[i]);
        setCurrLive(lives[i]);
        setLive(lives[i].questions);
        break;
      }
    }
    if (!currLive) {
      return;
    }
    for (let i = 0; i < currLive.questions.length; i++) {
      if (
        inTimeSpan(
          new Date(currLive.questions[i].start),
          new Date(currLive.questions[i].end)
        )
      ) {
        incrementQuestNumber(i);
        navigate("/quest");
        break;
      }
    }
  }, 1000);

  const getTittle = () => {
    if (plug === "not-tuesday") {
      return (
        <div>
          <h1 className={styles.title}>
            ВИКТОРИНА НАЧНЁТСЯ <br /> ВО ВТОРНИК В 20:30 <br /> НА ТЕЛЕКАНАЛЕ
            ПЯТНИЦА!
          </h1>
          <h2 className={styles.subTittle}>
            Угадывай <br />
            таланты детей <br /> и выйграй <br />
            500 рублей!
          </h2>
        </div>
      );
    }
    if (plug === "not-timezone") {
      return (
        <div>
          <h1 className={styles.title}>
            ИЗВИНИТЕ, В ВАШЕМ <br /> ЧАСОВОМ ПОЯСЕ <br /> ВИКТОРИНА <br /> НЕ
            ПРОВОДИТСЯ
          </h1>
        </div>
      );
    }
    if (plug === "completed") {
      return (
        <div>
          <h1 className={styles.title}>
            ВИКТОРИНА ЗАВЕРШИЛАСЬ! <br /> НОВАЯ ИГРА НАЧНЕТСЯ <br /> В СЛЕДУЮЩИЙ
            ВТОРНИК В 20:30
          </h1>
          <h2 className={styles.subTittle}>
            Угадывай <br />
            таланты детей <br /> и выйграй <br />
            500 рублей!
          </h2>
        </div>
      );
    }
  };

  return (
    <div className={styles.root}>
      <img className={styles.logo} src={logo} alt={""} />
      <div className={styles.content}>{getTittle()}</div>
    </div>
  );
};
