import React from "react";
import logo from "../../assets/image/main-logo.png";
import styles from "./PlugPage.module.scss";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

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
    let date = new Date();
    date.getDay();
    if (date.getDay() !== 2) {
      return;
    }
    setIsTuesday(true);

    let currentTime = new Date();
    let startTime = new Date("2022-10-24T16:33:43"); //6:30am today
    let endTime = new Date("2022-10-24T17:30:43"); //11:30am today

    if (
      currentTime.getTime() > startTime.getTime() &&
      currentTime.getTime() < endTime.getTime()
    ) {
      console.log("Я тут");
      setIsInterval(true);
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
    if (!isTuesday) {
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
