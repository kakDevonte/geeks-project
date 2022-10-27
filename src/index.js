import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import "./index.scss";
import { GeeksContextProvider } from "./context/geeks-context";

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(
  <GeeksContextProvider>
    <App />
  </GeeksContextProvider>,
  document.getElementById("root")
);
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
