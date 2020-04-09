import Express from "express";
import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../store/reducers/rootReducer";
import rootSaga from "../store/sagas/rootSaga";
import AppContainer from "../containers/AppContainer";
import manifest from '../../dist/react-loadable-ssr-addon';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable-ssr-addon';
import { renderToString } from "react-dom/server";
import logger from "redux-logger";
import fs from "fs";

const app = Express();
const port = 3000;

//Serve static files
// app.use(Express.static('dist'));
app.use("/dist", Express.static("dist"));
app.use(Express.static("dist"));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  const modules = new Set();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, logger)
  );

  sagaMiddleware.run(rootSaga);

  //store.dispatch({ type: "FETCH_NEWS" });

  // Render the component to a string
  const html = renderToString(
    <Loadable.Capture report={moduleName => modules.add(moduleName)}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
    </Loadable.Capture>
  );

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  console.log(preloadedState);

  const bundles = getBundles(manifest, [
    ...manifest.entrypoints,
    ...Array.from(modules),
  ]);

  const scripts = bundles.js || [];
  const styles = bundles.css || [];


  // Send the rendered page back to the client
  res.send(`
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Simple weather app</title>
        ${styles
          .map(style => {
            return `<link href="${style.file}" rel="stylesheet" />`;
          })
          .join('\n')}
    </head>
    <body>
        <div id="root">${html}</div>
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(
          preloadedState
        ).replace(/</g, "\\u003c")}</script>
        ${scripts
          .map(script => {
            return `
              <script src="${script.file}"></script>`;
          })
          .join(' ')}
    </body>
    </html>
  `);
  
  
  // fs.readFile("build/index.html", "utf8", (err, data) => {
  //   if (err) {
  //     console.error("Something went wrong:", err);
  //     return res.status(500).send("Oops, better luck next time!");
  //   }
  //   // inject app`s static contents to the div with id equal root
  //   return res.send(
  //     data.replace(
  //       '<div id="root"></div>',
  //       `<div id="root">${html}</div><script>window.__PRELOADED_STATE__ = ${JSON.stringify(
  //         preloadedState
  //       ).replace(/</g, "\\u003c")}</script>`
  //     )
  //   );
  // });
}

Loadable.preloadAll()
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log(`Running on http://localhost:${port}/`);
    });
  })
  .catch(err => {
    console.log(err);
  });

//app.listen(port);
