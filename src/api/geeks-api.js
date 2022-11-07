import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  //baseURL: 'https://dead-pear-chipmunk-suit.cyclic.app/api/',
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
      `/quest?liveDate=${liveDate}&number=${number}&timezone=${timezone}`
    );
  },
  createQuest(data) {
    return instance.post(`quest/`, data);
  },
  sendAnswer(liveDate, number, timezone, answer) {
    return instance.put(`quest/`, { liveDate, number, timezone, answer });
  },
  isAnswer(data) {
    return instance.post(`quest/is-answer`, data);
  },
  isWin(data) {
    return instance.post(`quest/is-win`, data);
  },
};
