import React from "react";
import { hydrate } from "react-dom";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./store/reducers/rootReducer";
import rootSaga from "./store/sagas/rootSaga";
import AppContainer from "./containers/AppContainer";
import * as serviceWorker from "./serviceWorker";
// Logger with default options
import logger from "redux-logger";
import Loadable from 'react-loadable';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(sagaMiddleware, logger)
);
sagaMiddleware.run(rootSaga);

Loadable.preloadReady().then(() => {
  hydrate(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById("root")
  );
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
