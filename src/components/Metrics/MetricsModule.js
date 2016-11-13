import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_MONTHLY_ISSUES = 'FETCH_MONTHLY_ISSUES';
export const FETCH_MONTHLY_ISSUES_SUCCESS = 'FETCH_MONTHLY_ISSUES_SUCCESS';
export const FETCH_TOTAL_OPEN_ISSUES = 'FETCH_TOTAL_OPEN_ISSUES';
export const FETCH_TOTAL_OPEN_ISSUES_SUCCESS = 'FETCH_TOTAL_OPEN_ISSUES_SUCCESS';
export const FETCH_PAYING_CUSTOMERS = 'FETCH_PAYING_CUSTOMERS';
export const FETCH_PAYING_CUSTOMERS_SUCCESS = 'FETCH_PAYING_CUSTOMERS_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export const fetchIssuesSuccess = createAction(FETCH_MONTHLY_ISSUES_SUCCESS);
export const fetchTotalOpenIssuesSuccess = createAction(FETCH_TOTAL_OPEN_ISSUES_SUCCESS);
export const fetchPayingCustomersSuccess = createAction(FETCH_PAYING_CUSTOMERS_SUCCESS);

// ------------------------------------
// ASYNC Actions
// ------------------------------------
export function fetchMonthlyIssues() {
  return function (dispatch, getState) {
    const db = getState()['db'];
    let model = db.getModel('issues');
    
    model.reportedIssues()
      .then((data) => dispatch(fetchIssuesSuccess(data)));
  };
}

export function fetchTotalOpenIssues() {
  return function (dispatch, getState) {
    const db = getState()['db'];
    let model = db.getModel('issues');
    
    model.totalOpenIssues()
      .then((data) => dispatch(fetchTotalOpenIssuesSuccess(data)));
  };
}

export function fetchPayingCustomers() {
  return function (dispatch, getState) {
    const db = getState()['db'];
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

// ------------------------------------
// Reducer
// ------------------------------------
export const issuesReducer = handleActions({
  [FETCH_MONTHLY_ISSUES_SUCCESS]: (state, action) => ({...state, monthlyIssues: action.payload}),
  [FETCH_TOTAL_OPEN_ISSUES_SUCCESS]: (state, action) => ({...state, openIssues: action.payload}),
  [FETCH_PAYING_CUSTOMERS_SUCCESS]: (state, action) => ({...state, payingCustomers: action.payload})
}, initialState);

export default issuesReducer;
