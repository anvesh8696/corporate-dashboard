import { createAction, handleActions } from 'redux-actions';
import { dispatch } from '../../App';
import { TABLE_DATA_UPDATE } from '../../db/DBModule';

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

const handleTableDataUpdate = (state, action) => {
  let p = action.payload;
  if(p.pathname === '/'){
    if(p.model === 'employees'){
      dispatch(fetchOffices());
    }
  }
  return state;
};

// ------------------------------------
// Reducer
// ------------------------------------
export const exploreReducer = handleActions({
  [`${FETCH_OFFICES}_SUCCESS`]: (state, action) => ({...state, offices: action.payload}),
  [TABLE_DATA_UPDATE]: handleTableDataUpdate
}, initialState);

export default exploreReducer;
