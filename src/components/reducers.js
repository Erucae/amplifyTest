import {FETCH_QUERY_BEGINNING, FETCH_QUERY_SUCCESS,FETCH_QUERY_FAIL, SUBSCRIPTION} from "./actions";

const initialState = {
  loading: false,
  todos: [{id: "dfgdgdfgfgb443vfr", name: 'name', description: "description", time:"time"}],
  error: ''
};

const queryReducer = (state=initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case FETCH_QUERY_BEGINNING: return {...state, loading: true};
    case FETCH_QUERY_SUCCESS:  return {...state, todos: payload.todos, loading: false};
    case FETCH_QUERY_FAIL: return {...state, error: payload.error};
    case SUBSCRIPTION: return {...state, todos: [...state.todos, payload.todo]};
    default: return state
  }
};

export default queryReducer;

