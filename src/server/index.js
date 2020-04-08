import Express from "express";
import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../store/reducers/rootReducer";
import rootSaga from "../store/sagas/rootSaga";
import AppContainer from "../containers/AppContainer";
import { renderToString } from "react-dom/server";
import logger from "redux-logger";
import fs from "fs";

const app = Express();
const port = 3000;

//Serve static files
app.use("/public", Express.static("static"));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, logger)
  );

  const rootTask = sagaMiddleware.run(rootSaga);

  // store.dispatch({ type: "FETCH_NEWS" });

  // rootTask.done.then(() => {
  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Send the rendered page back to the client
  fs.readFile("build/index.html", "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }
    // inject app`s static contents to the div with id equal root
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div><script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g,"\\u003c")}</script>`
      )
    );
  });

  // });
}


app.listen(port);
