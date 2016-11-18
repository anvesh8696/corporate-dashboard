import { createAction, handleActions } from 'redux-actions';
import { dispatch } from '../../App';
import { TABLE_DATA_UPDATE } from '../../db/DBModule';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_ISSUES = 'FETCH_ISSUES';

// ------------------------------------
// Actions
// ------------------------------------
export const fetchIssuesSuccess = createAction(`${FETCH_ISSUES}_SUCCESS`);

// ------------------------------------
// ASYNC Actions
// ------------------------------------
export function fetchIssues() {
  return function (dispatch, getState) {
    const db = getState()['db'].db;
    let model = db.getModel('issues');
    
    model.selectAll()
      .then((data) => {
        dispatch(fetchIssuesSuccess(data));
      });
  };
}


export const actions = {
  fetchIssues
};

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = {
  list: []
};


// ------------------------------------
// Reducer
// ------------------------------------
const handleTableDataUpdate = (state, action) => {
  let p = action.payload;
  if(p.pathname.indexOf('issues') != -1 && p.model === 'issues'){
    dispatch(fetchIssues());
  }
  return state;
};

export const issuesReducer = handleActions({
  [`${FETCH_ISSUES}_SUCCESS`]: (state, action) => ({...state, list: action.payload}),
  [TABLE_DATA_UPDATE]: handleTableDataUpdate
}, initialState);

export default issuesReducer;
