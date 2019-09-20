import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import queryReducer from './reducers';


export const store = createStore(
  queryReducer,
  composeWithDevTools(applyMiddleware(thunk))
);