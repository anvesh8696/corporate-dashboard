import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_ISSUES = 'FETCH_ISSUES'
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchIssuesSuccess = createAction(FETCH_ISSUES_SUCCESS);

// ------------------------------------
// ASYNC Actions
// ------------------------------------
export function fetchIssues() {
  return function (dispatch, getState) {
    const db = getState()['db'];
    let model = db.getModel('issues');
    
    model.selectAll()
      .then((data) => {
        dispatch(fetchIssuesSuccess(data));
      });
  };
}


export const actions = {
  fetchIssues
}

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = [];

// ------------------------------------
// Reducer
// ------------------------------------
export const issuesReducer = handleActions({
  [FETCH_ISSUES_SUCCESS]: (state, action) => action.payload
}, initialState);

export default issuesReducer;
