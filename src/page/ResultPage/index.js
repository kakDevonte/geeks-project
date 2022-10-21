import React from "react";
import styles from "./ResultPage.module.scss";
import late from "../../assets/image/late-face.png";
import lose from "../../assets/image/lose-face.png";
import win from "../../assets/image/win-face.png";
import logo from "../../assets/image/main-logo.png";

const state = [
  {
    image: late,
    title: [
      "КТО-ТО ОТВЕТИЛ БЫЧТРЕЕ",
      <br />,
      "ЧЕМ ТЫ. НО ИНТУИЦИЯ",
      <br />,
      "ТЕБЯ НЕ ПОДВЕЛА",
    ],
    subTitle: [
      "Следующий вопрос",
      <br />,
      "появится тут через",
      <br />,
      "несколько минут",
    ],
  },
  {
    image: win,
    title: ["ПОЗДРАВЛЯЕМ,", <br />, "500 РУБЛЕЙ ТВОИ!"],
    subTitle: ["Свяжись с нами,", <br />, "чтобы забрать приз"],
  },
  {
    image: lose,
    title: ["ИЗВИНИ. В ЭТОТ РАЗ", <br />, "ИНТУИЦИЯ", <br />, "ТЕБЯ ПОДВЕЛА."],
    subTitle: [
      "Ничего страшного,",
      <br />,
      "следующий вопрос",
      <br />,
      "появится тут через",
      <br />,
      "несколько минут",
    ],
  },
];

const ResultPage = () => {
  const status = 2;
  return (
    <div className={styles.root}>
      <div>
        <img className={styles.face} src={state[status].image} alt={""} />
        <h1 className={styles.title}>{state[status].title}</h1>
        <h2 className={styles.subTitle}>{state[status].subTitle}</h2>
      </div>
      <div className={styles.footer}>
        <img className={styles.logo} src={logo} alt={""} />
        <h1 className={styles.time}>
          ВТОРНИК
          <br />
          <span>19:00</span>
        </h1>
      </div>
    </div>
  );
};

export default ResultPage;
