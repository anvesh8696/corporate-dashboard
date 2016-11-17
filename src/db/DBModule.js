import { createAction, handleActions } from 'redux-actions';
import DB from './DB';
import DBSocket from './DBSocket';
import IssuesModel from './models/IssuesModel';
import EmployeesModel from './models/EmployeesModel';
import CustomersModel from './models/CustomersModel';
import SalesModel from './models/SalesModel';
import OfficesModel from './models/OfficesModel';
import { dispatch } from '../App';

// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_SOCKET_SUCCESS = 'TOGGLE_SOCKET_SUCCESS';
export const TABLE_DATA_UPDATE = 'TABLE_DATA_UPDATE';

// ------------------------------------
// Actions
// ------------------------------------
export const toggleActionSuccess = createAction(TOGGLE_SOCKET_SUCCESS);
export const tableDataUpdate = createAction(TABLE_DATA_UPDATE);

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = {
  socket: false,
  db: new DB('corporate', [
    CustomersModel,
    IssuesModel,
    EmployeesModel,
    SalesModel,
    OfficesModel
  ])
};

// ------------------------------------
// Fake SocketIO for push updates
// ------------------------------------
const socket = new DBSocket(initialState.db);
socket.on('event', (type, response) => {
  // New data found on server
  if(type === 'insert'){
    initialState.db.insert(response.model, response.data).then(() => {
      dispatch(notifyDBUpdate(response.model, response.data));
    });
  }
  // Client should empty cache and get files again
  else if(type === 'sync'){
    initialState.db.importTableData();
  }
});

// ------------------------------------
// ASYNC Actions
// ------------------------------------
export function togglePush(enabled) {
  return function (dispatch, getState) {
    if(enabled){
      socket.enablePush();
    } else {
      socket.disablePush();
    }
    dispatch(toggleActionSuccess(enabled));
  };
}

export function notifyDBUpdate(model, data) {
  return function (dispatch, getState) {
    let pathname = getState().routing ? getState().routing.locationBeforeTransitions.pathname : '';
    dispatch(tableDataUpdate({pathname, model, data}));
  };
}


// ------------------------------------
// Reducer
// ------------------------------------
export const reducer = handleActions({
  [TOGGLE_SOCKET_SUCCESS]: (state, action) => ({...state, socket: action.payload})
}, initialState);

export default reducer;
