import React from "react";

const SET_PLUG = "SET_PLUG";
const SET_LIVE = "SET_LIVE";
const INCREMENT_QUEST_NUMBER = "INCREMENT_QUEST_NUMBER";

const initialState = {
  plug: null,
  questionNumber: 0,
  live: null,
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
    setLive: (live) => {
      dispatch({
        type: SET_LIVE,
        payload: live,
      });
    },
    incrementQuestNumber: (number) => {
      dispatch({
        type: INCREMENT_QUEST_NUMBER,
        payload: number,
      });
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
