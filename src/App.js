import React from "react";
import bridge from "@vkontakte/vk-bridge";
import logo from "./assets/image/PT logo.png";

import "./App.scss";
import { PlugPage } from "./page/PlugPage";
import QuestionsPage from "./page/QuestionsPage";
import ResultPage from "./page/ResultPage";

const App = () => {
  return (
    <div className="root">
      <img className="logo" src={logo} alt={""} />
      {/*<PlugPage />*/}
      {/*<QuestionsPage />*/}
      <ResultPage />
    </div>
  );
};

export default App;
