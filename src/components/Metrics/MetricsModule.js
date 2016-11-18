import { createAction, handleActions } from 'redux-actions';
import { dispatch } from '../../App';
import { TABLE_DATA_UPDATE } from '../../db/DBModule';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_MONTHLY_ISSUES = 'FETCH_MONTHLY_ISSUES';
export const FETCH_TOTAL_OPEN_ISSUES = 'FETCH_TOTAL_OPEN_ISSUES';
export const FETCH_PAYING_CUSTOMERS = 'FETCH_PAYING_CUSTOMERS';

// ------------------------------------
// Actions
// ------------------------------------
export const fetchIssuesSuccess = createAction(`${FETCH_MONTHLY_ISSUES}_SUCCESS`);
export const fetchTotalOpenIssuesSuccess = createAction(`${FETCH_TOTAL_OPEN_ISSUES}_SUCCESS`);
export const fetchPayingCustomersSuccess = createAction(`${FETCH_PAYING_CUSTOMERS}_SUCCESS`);

// ------------------------------------
// ASYNC Actions
// ------------------------------------
export function fetchMonthlyIssues() {
  return function (dispatch, getState) {
    const db = getState()['db'].db;
    let model = db.getModel('issues');
    
    model.reportedIssues()
      .then((data) => dispatch(fetchIssuesSuccess(data)));
  };
}

export function fetchTotalOpenIssues() {
  return function (dispatch, getState) {
    const db = getState()['db'].db;
    let model = db.getModel('issues');
    
    model.totalOpenIssues()
      .then((data) => dispatch(fetchTotalOpenIssuesSuccess(data)));
  };
}

export function fetchPayingCustomers() {
  return function (dispatch, getState) {
    const db = getState()['db'].db;
    let model = db.getModel('sales');
    
    model.payingCustomers()
      .then((data) => dispatch(fetchPayingCustomersSuccess(data)));
  };
}


export const actions = {
  fetchMonthlyIssues,
  fetchTotalOpenIssues,
  fetchPayingCustomers
};

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = {
  monthlyIssues: [],
  payingCustomers: [],
  openIssues: 0
};

const handleTableDataUpdate = (state, action) => {
  let p = action.payload;
  if(p.pathname.indexOf('metrics') != -1){
    if(p.model === 'issues'){
      dispatch(fetchMonthlyIssues());
      dispatch(fetchTotalOpenIssues());
    }else if(p.model === 'sales'){
      dispatch(fetchPayingCustomers());
    }
  }
  return state;
};

// ------------------------------------
// Reducer
// ------------------------------------
export const issuesReducer = handleActions({
  [`${FETCH_MONTHLY_ISSUES}_SUCCESS`]: (state, action) => ({...state, monthlyIssues: action.payload}),
  [`${FETCH_TOTAL_OPEN_ISSUES}_SUCCESS`]: (state, action) => ({...state, openIssues: action.payload}),
  [`${FETCH_PAYING_CUSTOMERS}_SUCCESS`]: (state, action) => ({...state, payingCustomers: action.payload}),
  [TABLE_DATA_UPDATE]: handleTableDataUpdate
}, initialState);

export default issuesReducer;
