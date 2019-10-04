import {SET_DIALOG, QUERY } from './actions';

const initialState = {
  showDialog: false,
  title: '',
  message: '',
};

const dialogReducer = (state=initialState, action) => {
  const {type, payload} = action;
  console.log(state);
  console.log('dialogreducer 18');
  switch(type) {
    case SET_DIALOG: return {...state, showDialog: true, title: payload.title, message: payload.message};
    default: return state;
  }
};

export default dialogReducer;