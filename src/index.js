import 'react-toolbox/lib/commons.scss';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import React from 'react';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { hashHistory, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history'
import { createStore } from './store'

const store = createStore({}, useRouterHistory(createHashHistory)({ queryKey: false }))
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Routes
    store={store}
    history={history}
  />,
  document.getElementById('app')
);
