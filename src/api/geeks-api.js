import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  //baseURL: 'https://dead-pear-chipmunk-suit.cyclic.app/api/',
});

export const geeksAPI = {
  getUser() {
    return instance.get(`/${id}`);
  },
  getQuest(date) {
    return instance.get(`/${date}`);
  },
  sendAnswer(liveDate, number, timezone, answer) {
    return instance.post(`/`, { liveDate, number, timezone, answer });
  },
  isAnswer(liveDate, number, timezone, answer) {
    return instance.post(`/is-answer`, { liveDate, number, timezone, answer });
  },
  isWin(liveDate, number, timezone, answer) {
    return instance.post(`/is-win`, { liveDate, number, timezone, answer });
  },
};
