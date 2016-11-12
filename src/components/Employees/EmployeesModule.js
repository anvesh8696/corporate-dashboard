import { List } from 'immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES'


// ------------------------------------
// Actions
// ------------------------------------
export function fetchEmployees(url) {
  return {
    type: FETCH_EMPLOYEES,
    payload: []
  }
}

export const actions = {
  fetchEmployees
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_EMPLOYEES]: (state, action) => action.payload,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = List();
export default function employeesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
