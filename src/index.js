import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './store/reducers/rootReducer';
import rootSaga from './store/sagas/rootSaga';
import AppContainer from './containers/AppContainer';
import * as serviceWorker from './serviceWorker';
// Logger with default options
import logger from 'redux-logger'

const sagaMiddleware =  createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
