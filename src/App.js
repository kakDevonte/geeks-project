import React from "react";
import bridge from "@vkontakte/vk-bridge";
import logo from "./assets/image/PT logo.png";

import "./App.scss";
import { PlugPage } from "./page/PlugPage";
import QuestionsPage from "./page/QuestionsPage";
import ResultPage from "./page/ResultPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./page/StartPage";

const App = () => {
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
