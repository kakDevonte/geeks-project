import React from "react";
import { geeksAPI } from "../api/geeks-api";

const SET_PLUG = "SET_PLUG";
const SET_USER = "SET_USER";
const SET_LIVE = "SET_LIVE";
const SET_QUEST = "SET_QUEST";
const SET_TIMEZONE = "SET_TIMEZONE";
const SET_NAME = "SET_NAME";
const SET_IS_WIN = "SET_IS_WIN";
const SEND_ANSWER = "SEND_ANSWER";
const SET_TIME = "SET_TIME";
const INCREMENT_QUEST_NUMBER = "INCREMENT_QUEST_NUMBER";

const initialState = {
  user: null,
  plug: null,
  questionNumber: 0,
  live: null,
  isWin: false,
  currLive: null,
  quest: null,
  currTimezone: null,
  name: null,
  correctTime: null,
};
const GeeksContext = React.createContext();

export const GeeksContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const actions = {
    setPlug: (type) => {
      dispatch({
        type: SET_PLUG,
        payload: type,
      });
    },
    setUser: (user) => {
      dispatch({
        type: SET_USER,
        payload: user,
      });
    },
    setLive: (live) => {
      dispatch({
        type: SET_LIVE,
        payload: live,
      });
    },
    setQuest: (quest) => {
      dispatch({
        type: SET_QUEST,
        payload: quest,
      });
    },
    setTimezone: (timezone) => {
      dispatch({
        type: SET_TIMEZONE,
        payload: timezone,
      });
    },
    setName: (timezone) => {
      dispatch({
        type: SET_NAME,
        payload: timezone,
      });
    },
    setTime: (timezone) => {
      dispatch({
        type: SET_TIME,
        payload: timezone,
      });
    },
    incrementQuestNumber: (number) => {
      dispatch({
        type: INCREMENT_QUEST_NUMBER,
        payload: number,
      });
    },
    sendAnswer: async (liveDate, number, timezone, answer) => {
      await geeksAPI.sendAnswer(liveDate, number, timezone, answer);
    },
    isWin: (user) => {},
  };

  return (
    <GeeksContext.Provider value={{ state, actions }}>
      {props.children}
    </GeeksContext.Provider>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PLUG: {
      return { ...state, plug: action.payload };
    }
    case SET_LIVE: {
      return { ...state, live: action.payload };
    }
    case SET_USER: {
      return { ...state, user: action.payload };
    }
    case SET_QUEST: {
      return { ...state, quest: action.payload };
    }
    case SET_IS_WIN: {
      return { ...state, isWin: action.payload };
    }
    case SET_TIMEZONE: {
      return { ...state, currTimezone: action.payload };
    }
    case SET_NAME: {
      return { ...state, name: action.payload };
    }
    case SET_TIME: {
      return { ...state, correctTime: action.payload };
    }
    case INCREMENT_QUEST_NUMBER: {
      return { ...state, questionNumber: action.payload };
    }
  }
};

export const useGeeksState = () => {
  return React.useContext(GeeksContext).state;
};

export const useGeeksActions = () => {
  return React.useContext(GeeksContext).actions;
};
