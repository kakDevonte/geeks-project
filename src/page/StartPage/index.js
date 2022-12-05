import React from "react";
import styles from "./StartPage.module.scss";
import Button from "../../components/Button";
import logo from "../../assets/image/main-logo.png";
import { useNavigate } from "react-router-dom";
import { useGeeksActions } from "../../context/geeks-context";
import inTimeSpan from "../../utils/inTimeSpan";
import { lives } from "../../utils/data";
import bridge from "@vkontakte/vk-bridge";
//import bridge from "@vkontakte/vk-bridge-mock";
import { geeksAPI } from "../../api/geeks-api";
import { time } from "../../App";

const currTime = [
  { timezone: [0, 1, -1], name: 1 },
  { timezone: [2], name: 2 },
  { timezone: [3, 4, 5], name: 3 },
  { timezone: [6, 7], name: 4 },
];

const correctTime = [
  { timezone: -1, correct: 1 },
  { timezone: 0, correct: 0 },
  { timezone: 1, correct: -1 },
  { timezone: 2, correct: 0 },
  { timezone: 3, correct: 1 },
  { timezone: 4, correct: 0 },
  { timezone: 5, correct: -1 },
  { timezone: 6, correct: 1 },
  { timezone: 7, correct: 0 },
];
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

const timezonesUsers = [
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
  const {
    setPlug,
    setLive,
    incrementQuestNumber,
    setTimezone,
    setName,
    setUser,
    setTime,
  } = useGeeksActions();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      let timezone;
      const offset = new Date(time.time).getTimezoneOffset();
      for (let item of timezonesUsers) {
        if (offset === item.time) {
          timezone = item.time;
          setTimezone(((item.time + 180) / 60) * -1);
          let time = ((item.time + 180) / 60) * -1;
          let diff = correctTime.find((item) => item.timezone === time);
          setTime(diff.correct);
          let l = currTime.find(
            (item) => item.timezone.find((el) => el === time) === time
          );
          setName(l.name);
        }
      }
      await geeksAPI.incrementOpenApp(((timezone + 180) / 60) * -1);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const user = await bridge
        .send("VKWebAppGetUserInfo", {})
        .then((data) => data)
        .catch((err) => console.log("ОШИБКА = ", err));

      console.log("Юзер из вк = ", user);
      const { data } = await geeksAPI.getUser(user.id);
      console.log("Юзер из бека = ", data);
      if (data) {
        setUser(data);
      } else {
        let timezone;
        const offset = new Date(time.time).getTimezoneOffset();
        for (let item of timezonesUsers) {
          if (offset === item.time) {
            timezone = item.time;
            setTimezone(((item.time + 180) / 60) * -1);
            let time = ((item.time + 180) / 60) * -1;
            let diff = correctTime.find((item) => item.timezone === time);
            setTime(diff.correct);
            let l = currTime.find(
              (item) => item.timezone.find((el) => el === time) === time
            );
            setName(l.name);
          }
        }
        const data = await geeksAPI.createUser({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          timezone: ((timezone + 180) / 60) * -1,
          avatar: user.photo_200,
          //avatar: user.photo_max_orig,
        });
        setUser(data.data);
      }
      setIsLoading(true);
    })();
  }, []);

  const onClickStart = () => {
    let currLive = null;
    let currTimezone = null;
    const now = new Date(time.time);
    const offset = new Date(time.time).getTimezoneOffset();
    const isTimezone = containsTimezone(offset, timezones);
    for (let item of timezones) {
      if (offset === item.time) {
        currTimezone = ((item.time + 180) / 60) * -1;
        setTimezone(((item.time + 180) / 60) * -1);
        let time = ((item.time + 180) / 60) * -1;
        let diff = correctTime.find((item) => item.timezone === time);
        setTime(diff.correct);
        let l = currTime.find(
          (item) => item.timezone.find((el) => el === time) === time
        );
        setName(l.name);
      }
    }

    if (!isTimezone) {
      setPlug("not-timezone");
      navigate("/plug");
      return;
    }
    let live = lives.find((item) => item.timezone === currTimezone);
    const endDate = new Date(live.live[0].end);
    if (now.getDay() !== 2) {
      setPlug("not-tuesday");
      navigate("/plug");
      return;
    }
    if (
      //true
      inTimeSpan(new Date(live.live[0].start), new Date(live.live[0].end))
    ) {
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
        setPlug("not-tuesday");
        navigate("/plug");
      }
      let questNumber = null;
      for (let i = 0; i < currLive.questions.length; i++) {
        if (
          inTimeSpan(
            new Date(currLive.questions[i].start),
            new Date(currLive.questions[i + 1]?.start)
          )
        ) {
          questNumber = i;
          incrementQuestNumber(i);
          navigate("/quest");
          return;
        }
      }
      setPlug("not-tuesday");
      navigate("/plug");
      return;
    } else if (
      inTimeSpan(
        new Date(endDate),
        new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1,
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
          <Button
            title={"НАЧАТЬ"}
            disabled={isLoading}
            onClick={onClickStart}
          />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
