import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_OFFICES = 'FETCH_OFFICES';

// ------------------------------------
// Actions
// ------------------------------------
export const fetchOfficesSuccess = createAction(`${FETCH_OFFICES}_SUCCESS`);

// ------------------------------------
// ASYNC Actions
// ------------------------------------
export function fetchOffices() {
  return function (dispatch, getState) {
    const db = getState()['db'].db;
    let model = db.getModel('offices');
    
    model.selectAll()
      .then((data) => dispatch(fetchOfficesSuccess(data)));
  };
}


export const actions = {
  fetchOffices
};

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = {
  offices: []
};

// ------------------------------------
// Reducer
// ------------------------------------
export const exploreReducer = handleActions({
  [`${FETCH_OFFICES}_SUCCESS`]: (state, action) => ({...state, offices: action.payload})
}, initialState);

export default exploreReducer;
