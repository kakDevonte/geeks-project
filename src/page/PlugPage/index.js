import React from "react";
import logo from "../../assets/image/main-logo.png";
import styles from "./PlugPage.module.scss";
import Button from "../../components/Button";

export const PlugPage = () => {
  const [isInTimeZone, setIsInTimeZone] = React.useState(false);

  const getTittle = () => {
    let content;
    if (true) {
      content = (
        <div>
          <h1 className={styles.title}>
            ВКЛЮЧИ ПЯТНИЦУ! <br /> И УГАДАЙ <br /> ТАЛАНТ РЕБЕНКА
          </h1>
          <h2 className={styles.subTittle}>
            Трое самых быстрых <br />
            получат 500 рублей <br />
          </h2>
          <Button title={"НАЧАТЬ"} />
        </div>
      );
    } else if (isInTimeZone) {
      content = (
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
    } else {
      content = (
        <div className={styles.notTimeZoneContainer}>
          <h1 className={styles.title}>
            ИЗВИНИТЕ, ВЫ НАХОДИТЕСЬ
            <br />
            НЕ В МОСКОВСКОМ
            <br />
            ЧАСОВОМ ПОЯСЕ.
            <br />
            <span className={styles.subTittle}>
              ПОЭТОМУ ВИКТОРИНА
              <br />
              ВАМ НЕДОСТУПНА
            </span>
          </h1>
        </div>
      );
    }
    return content;
  };

  return (
    <div className={styles.root}>
      <img className={styles.logo} src={logo} alt={""} />
      {getTittle()}
    </div>
  );
};
