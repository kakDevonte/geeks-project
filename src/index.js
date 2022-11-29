import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
//import bridge from "@vkontakte/vk-bridge-mock";
import App from "./App";
import "./index.scss";
import { GeeksContextProvider } from "./context/geeks-context";

(async () => {
  await bridge.send("VKWebAppInit");
  const data = await bridge.send("VKWebAppGetClientVersion");
  console.log("GET CLIENT VERSION");
  console.log(data);
  console.log("ПОЛУЧАЕМ ЮЗЕРА");
  const user = await bridge
    .send("VKWebAppGetUserInfo", {})
    .then((data) => data)
    .catch((err) => console.log("ОШИБКА = ", err));
  console.log(user);
})();

ReactDOM.render(
  <GeeksContextProvider>
    <App />
  </GeeksContextProvider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
