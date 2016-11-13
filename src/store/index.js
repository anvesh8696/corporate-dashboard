import { routerMiddleware, routerReducer} from 'react-router-redux';
import { applyMiddleware, compose, createStore as create, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import issuesReducer from '../components/Issues/IssuesModule';
import metricsReducer from '../components/Metrics/MetricsModule';
import exploreReducer from '../components/Explore/ExploreModule';
import dbReducer from '../db/DBModule';

const RootReducer = (asyncReducers) => {
  return combineReducers({
    routing: routerReducer,
    issues: issuesReducer,
    metrics: metricsReducer,
    explore: exploreReducer,
    db: dbReducer,
    ...asyncReducers
  });
}

export const createStore = (initialState = {}, history) => {
  const loggerMiddleware = createLogger();
  const middleware = [thunkMiddleware, promiseMiddleware, routerMiddleware(history), loggerMiddleware];
  
  const store = create(
    RootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware)
    )
  );
  store.asyncReducers = {};
  return store;
};
