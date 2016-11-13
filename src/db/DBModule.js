import { createAction, handleActions } from 'redux-actions';
import DB from './DB';
import IssuesModel from './models/IssuesModel';
import EmployeesModel from './models/EmployeesModel';
import CustomersModel from './models/CustomersModel';
import SalesModel from './models/SalesModel';

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = new DB('corporate', [
  CustomersModel,
  IssuesModel,
  EmployeesModel,
  SalesModel
]);

// ------------------------------------
// Reducer
// ------------------------------------
export const issuesReducer = handleActions({}, initialState);

export default issuesReducer;
