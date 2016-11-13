import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_OFFICES = 'FETCH_OFFICES'
export const FETCH_OFFICES_SUCCESS = 'FETCH_OFFICES_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchOfficesSuccess = createAction(FETCH_OFFICES_SUCCESS);

// ------------------------------------
// ASYNC Actions
// ------------------------------------
export function fetchOffices() {
  return function (dispatch, getState) {
    const db = getState()['db'];
    let model = db.getModel('offices');
    
    model.selectAll()
      .then((data) => dispatch(fetchOfficesSuccess(data)));
  };
}


export const actions = {
  fetchOffices
}

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
  [FETCH_OFFICES_SUCCESS]: (state, action) => ({...state, offices: action.payload})
}, initialState);

export default exploreReducer;
