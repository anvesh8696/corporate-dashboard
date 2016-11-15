import { handleActions } from 'redux-actions';
import DB from './DB';
import DBSocket from './DBSocket';
import IssuesModel from './models/IssuesModel';
import EmployeesModel from './models/EmployeesModel';
import CustomersModel from './models/CustomersModel';
import SalesModel from './models/SalesModel';
import OfficesModel from './models/OfficesModel';
import { fetchIssues } from '../components/Issues/IssuesModule'
import { dispatch } from '../App';

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
// Fake SocketIO for push updates
// ------------------------------------
let socket = new DBSocket();
socket.on('event', function (type, response){
  // New data found on server
  if(type === 'insert'){
    initialState.insert(response.model, response.data);
    dispatch(fetchIssues());
  } 
  // Client should empty cache and get files again
  else if(type === 'sync'){
    initialState.importTableData();
  } 
});


// ------------------------------------
// Reducer
// ------------------------------------
export const reducer = handleActions({}, initialState);

export default reducer;
