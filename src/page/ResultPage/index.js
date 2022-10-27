import React from "react";
import styles from "./ResultPage.module.scss";
import late from "../../assets/image/late-face.png";
import lose from "../../assets/image/lose-face.png";
import win from "../../assets/image/win-face.png";
import logo from "../../assets/image/logo-footer.png";
import { useNavigate, useParams } from "react-router-dom";

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
  const [seconds, setSeconds] = React.useState(10);
  const { status } = useParams();
  const navigate = useNavigate();
  let index;

  React.useEffect(() => {
    if (seconds <= 0) {
      navigate("/quest");
    }

    console.log("сикунды = ", seconds);
    let myInterval = setInterval(() => {
      setSeconds(seconds - 1);
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
        <h1 className={styles.title}>{state[index].title}</h1>
        <h2 className={styles.subTitle}>{state[index].subTitle}</h2>
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
