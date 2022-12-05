import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
//import bridge from "@vkontakte/vk-bridge-mock";
import App from "./App";
import "./index.scss";
import { GeeksContextProvider } from "./context/geeks-context";

(async () => {
  await bridge.send("VKWebAppInit");
})();

ReactDOM.render(
  <GeeksContextProvider>
    <App />
  </GeeksContextProvider>,
  document.getElementById("root")
);

//if (process.env.NODE_ENV === "development") {
import("./eruda").then(({ default: eruda }) => {}); //runtime download
//}
