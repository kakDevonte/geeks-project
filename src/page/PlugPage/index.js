import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/main-logo.png";
import styles from "./PlugPage.module.scss";
import { useGeeksActions, useGeeksState } from "../../context/geeks-context";
import useInterval from "../../utils/useInterval";
import inTimeSpan from "../../utils/inTimeSpan";
import { lives } from "../../utils/data";
import Spinner from "../../components/Spinner";

export const PlugPage = () => {
  const navigate = useNavigate();
  const { plug, user, currTimezone } = useGeeksState();
  const { incrementQuestNumber, setLive } = useGeeksActions();
  const [isLoading, setIsLoading] = React.useState(plug === "not-tuesday");

  React.useEffect(() => {
    if (!plug) {
      navigate("/");
    }
  }, []);

  if (plug === "not-tuesday")
    useInterval(() => {
      let live = lives.find((item) => item.timezone === currTimezone);
      let currLive;
      for (let i = 0; i < live.live.length; i++) {
        if (
          inTimeSpan(new Date(live.live[i].start), new Date(live.live[i].end))
        ) {
          currLive = live.live[i];
          setLive(live.live[i]);
          break;
        }
      }
      if (!currLive) {
        setIsLoading(false);
        return;
      }
      for (let i = 0; i < currLive.questions.length; i++) {
        if (
          inTimeSpan(
            new Date(currLive.questions[i].start),
            new Date(
              i !== 9
                ? currLive.questions[i + 1].start
                : currLive.questions[i].end
            )
          )
        ) {
          incrementQuestNumber(i);
          navigate("/quest");
          break;
        }
      }
      setIsLoading(false);
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
            Угадывай таланты детей <br /> и выигрывай <br />
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
            ВИКТОРИНА <br /> ЗАВЕРШИЛАСЬ! <br /> НОВАЯ ИГРА НАЧНЕТСЯ <br /> В
            СЛЕДУЮЩИЙ
            <br />
            ВТОРНИК В 20:30!
          </h1>
          <h2 className={styles.subTittle}>
            Угадывай таланты детей <br /> и выигрывай <br />
            500 рублей!
          </h2>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className={styles.root}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <img className={styles.logo} src={logo} alt={""} />
      <div className={styles.content}>{getTittle()}</div>
    </div>
  );
};
