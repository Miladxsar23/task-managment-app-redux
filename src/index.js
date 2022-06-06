import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/scss/bootstrap.scss";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas2";
import { composeWithDevTools } from "@redux-devtools/extension";
import { Provider } from "react-redux";
import tasks from "./reducers";
import logger from "./middleware/logger";
import analytics from "./middleware/analytics";
function rootReducer(state = {}, action) {
  return {
    tasks: tasks(state.tasks, action),
  };
}

function configrationStore() {
  const sagaMiddleware = createSagaMiddleware();
  console.log(sagaMiddleware)
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk, sagaMiddleware, logger, analytics)
    )
  );
  sagaMiddleware.run(rootSaga)
  // development mode -> enable hot reload reducers
  if (module.hot) {
    module.hot.accept("./reducers/index", () => {
      store.replaceReducer(require("./reducers/index").default);
    });
  }
  return store;
}
const store = configrationStore();
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
