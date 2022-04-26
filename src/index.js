import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/scss/bootstrap.scss";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {createStore } from "redux";
import { devToolsEnhancer } from "@redux-devtools/extension";
import { Provider } from "react-redux";
import tasks from "./reducers";
const store = createStore(tasks, devToolsEnhancer());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
