import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import PageLayout from 'components/PageLayout';
import Explore from 'components/Explore';
import Metrics from 'components/Metrics';
import Issues from 'components/Issues';

const Routes = (
  <Router history = { hashHistory }>
    <Route path='/' component = { PageLayout(Explore) } />
    <Route path='/metrics' component = { PageLayout(Metrics) } />
    <Route path='/issues' component = { PageLayout(Issues) } />
  </Router>
);

export default Routes;
