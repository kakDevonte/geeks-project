import React from "react";
import logo from "./assets/image/PT logo.png";
import "./App.scss";
import { PlugPage } from "./page/PlugPage";
import QuestionsPage from "./page/QuestionsPage";
import ResultPage from "./page/ResultPage";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import StartPage from "./page/StartPage";
import qs from "qs";
import { Test } from "./test";
import { geeksAPI } from "./api/geeks-api";
import getTimezone from "./utils/getTimezone";
import calcTime from "./utils/calcTime";

const time = new Test(0);

const App = () => {
  const [isMount, setIsMount] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { data } = await geeksAPI.getTime();
      const date = new Date(data.slice(0, -1));
      time.setTime(calcTime(date.getTime(), getTimezone()).getTime());
      setIsMount(true);
    })();
  }, []);

  return (
    <div className="root">
      <img className="logo" src={logo} alt={""} />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<StartPage />} />
          <Route path={"/plug"} element={<PlugPage />} />
          <Route path={"/result/:status"} element={<ResultPage />} />
          <Route path={"/quest"} element={<QuestionsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
export { time };
