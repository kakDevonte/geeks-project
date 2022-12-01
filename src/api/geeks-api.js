import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:3000/api/",
  //baseURL: "https://297349.simplecloud.ru/api",
  //baseURL: "https://300799.simplecloud.ru/api/",
  //baseURL: "https://server.bulochkin.site/api/",
  baseURL: "https://95-163-237-191.cloudvps.regruhosting.ru/api/",
});

export const geeksAPI = {
  getUser(id) {
    return instance.get(`user/${id}`);
  },
  createUser(data) {
    return instance.post(`user/`, data);
  },
  incrementOpenApp(timezone) {
    return instance.get(`stats/${timezone}`);
  },
  getQuest(liveDate, number, timezone) {
    return instance.get(
      `/quest?liveNumber=${liveDate}&number=${number}&timezone=${timezone}`
    );
  },
  createQuest(data) {
    return instance.post(`quest/`, data);
  },
  sendAnswer(liveNumber, number, timezone, answer) {
    return instance.put(`quest/`, { liveNumber, number, timezone, answer });
  },
  isAnswer(data) {
    return instance.post(`quest/is-answer`, data);
  },
  isWin(data) {
    return instance.post(`quest/is-win`, data);
  },
  getTime() {
    return instance.get(`quest/time`);
  },
};
