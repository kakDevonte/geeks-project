import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  //baseURL: 'https://dead-pear-chipmunk-suit.cyclic.app/api/',
});

export const wheelAPI = {
  getUser() {
    return instance.get(`/${id}`);
  },
  getQuest(date) {
    return instance.get(`/${date}`);
  },
};
