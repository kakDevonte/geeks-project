import React from "react";

const SET_PLUG = "SET_PLUG";
const INCREMENT_QUEST_NUMBER = "INCREMENT_QUEST_NUMBER";

const initialState = {
  plug: null,
  questionNumber: 0,
  live: {
    id: 0,
    start: "123",
    end: "321",
    timezone: "+1",
    questions: [
      {
        id: 0,
        text: "adsdadadad",
        users: [
          {
            id: 321,
            first_name: "Alex",
            last_name: "Hat",
            response_time: "123",
          },
        ],
      },
    ],
  },
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
    incrementQuestNumber: (number) => {
      dispatch({
        type: INCREMENT_QUEST_NUMBER,
        payload: number,
      });
    },
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
