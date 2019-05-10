import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

let store;

if (process.env.NODE_ENV !== 'production') {
  store = createStore(reducers, applyMiddleware(thunk, logger));
}
else {
  store = createStore(reducers, applyMiddleware(thunk));
}

export default store;
