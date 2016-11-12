import { createAction, handleActions } from 'redux-actions';
import DB from './DB';
import IssuesModel from './models/IssuesModel';
import EmployeesModel from './models/EmployeesModel';

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = new DB('corporate', [
  IssuesModel,
  EmployeesModel
]);

// ------------------------------------
// Reducer
// ------------------------------------
export const issuesReducer = handleActions({}, initialState);

export default issuesReducer;
