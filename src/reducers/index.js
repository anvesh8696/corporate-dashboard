import { combineReducers } from 'redux';
import IssuesReducer from '../components/Issues/IssuesModule';
import MetricsModule from '../components/Metrics/MetricsModule';

const allReducers = combineReducers({
  issues: IssuesReducer,
  metrics: MetricsModule
});

export default allReducers;
