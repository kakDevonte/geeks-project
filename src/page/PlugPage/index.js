import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import inTimeSpan from "../../utils/inTimeSpan";
import data from "../../utils/data.json";
import logo from "../../assets/image/main-logo.png";
import styles from "./PlugPage.module.scss";

function getTimeZoneOffset(date, timeZone) {
  let iso = date
    .toLocaleString("en-CA", { timeZone, hour12: false })
    .replace(", ", "T");
  iso += "." + date.getMilliseconds().toString().padStart(3, "0");
  const lie = new Date(iso + "Z");

  return -(lie - date) / 60 / 1000;
}

export const PlugPage = () => {
  const [isTuesday, setIsTuesday] = React.useState(false);
  const [isInterval, setIsInterval] = React.useState(false);
  const [isInTimeZone, setIsInTimeZone] = React.useState(false);
  const [timeZone, setTimeZone] = React.useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    const now = new Date();
    now.getDay();
    if (now.getDay() !== 2) {
      return;
    }
    setIsTuesday(true);

    for (let i = 0; i < data.ethers.length; i++) {
      if (inTimeSpan(data.ethers[i].start, data.ethers[i].end)) {
        setIsInterval(true);
        return;
      }
    }
  }, []);
  // let now = new Date();
  // const moscow = getTimeZoneOffset(
  //   new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  //   "Europe/Moscow"
  // );
  // const vlad = getTimeZoneOffset(new Date(2020, 3, 13), "Asia/Vladivostok");
  // const diff = -1 * (moscow / 60);

  const onClickNext = () => {
    navigate("/q");
  };

  const getTittle = () => {
    if (!isInterval) {
      return (
        <div>
          <h1 className={styles.title}>
            ВКЛЮЧАЙ ПЯТНИЦУ! <br /> ПО ВТОРИНКАМ <br /> В 19:00
          </h1>
          <h2 className={styles.subTittle}>
            Угадывай <br />
            таланты детей <br /> и выйграй <br />
            500 рублей!
          </h2>
        </div>
      );
    }
    if (isTuesday && isInterval) {
      return (
        <div>
          <h1 className={styles.title}>
            ВКЛЮЧИ ПЯТНИЦУ! <br /> И УГАДАЙ <br /> ТАЛАНТ РЕБЕНКА
          </h1>
          <h2 className={styles.subTittle}>
            Трое самых быстрых <br />
            получат 500 рублей <br />
          </h2>
          <Button title={"НАЧАТЬ"} onClick={onClickNext} />
        </div>
      );
    }
    // {
    //   content = (
    //     <div className={styles.notTimeZoneContainer}>
    //       <h1 className={styles.title}>
    //         ИЗВИНИТЕ, ВЫ НАХОДИТЕСЬ
    //         <br />
    //         НЕ В МОСКОВСКОМ
    //         <br />
    //         ЧАСОВОМ ПОЯСЕ.
    //         <br />
    //         <span className={styles.subTittle}>
    //           ПОЭТОМУ ВИКТОРИНА
    //           <br />
    //           ВАМ НЕДОСТУПНА
    //         </span>
    //       </h1>
    //     </div>
    //   );
    // }
    // return content;
  };

  return (
    <div className={styles.root}>
      <img className={styles.logo} src={logo} alt={""} />
      <div className={styles.content}>{getTittle()}</div>
    </div>
  );
};
