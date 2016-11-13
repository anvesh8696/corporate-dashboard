import { handleActions } from 'redux-actions';
import DB from './DB';
import IssuesModel from './models/IssuesModel';
import EmployeesModel from './models/EmployeesModel';
import CustomersModel from './models/CustomersModel';
import SalesModel from './models/SalesModel';
import OfficesModel from './models/OfficesModel';

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = new DB('corporate', [
  CustomersModel,
  IssuesModel,
  EmployeesModel,
  SalesModel,
  OfficesModel
]);

// ------------------------------------
// Reducer
// ------------------------------------
export const reducer = handleActions({}, initialState);

export default reducer;
