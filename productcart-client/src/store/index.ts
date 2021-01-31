import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducer';
import { startRootSaga } from '../saga';

export const history = createBrowserHistory();

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export function configureStore() {
  const middlewareEnhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer(history), composedEnhancers);

  // run the saga
  sagaMiddleware.run(startRootSaga);
  return store;
}
