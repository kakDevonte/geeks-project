import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/main-logo.png";
import styles from "./PlugPage.module.scss";
import { useGeeksState } from "../../context/geeks-context";

export const PlugPage = () => {
  const navigate = useNavigate();
  const { plug, currTimezone } = useGeeksState();

  React.useEffect(() => {
    if (!plug) {
      navigate("/");
    }
  }, []);

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
