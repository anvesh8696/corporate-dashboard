import { combineReducers } from 'redux';
import IssuesReducer from '../components/Issues/IssuesModule';

const allReducers = combineReducers({
  issues: IssuesReducer
});

export default allReducers;
