import {SET_FILTER} from "./actions";

const INITIAL_VALUE = {
  filter: ''
};

export const filterReducer = (state=INITIAL_VALUE, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_FILTER: return {...state, filter: payload.filter};
    default: return state;
  }
};