import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import queryReducer from './reducers';
import {filterReducer} from './filterReducer';
import dialog from './dialogReducer';


export const store = createStore(combineReducers({
    queryReducer,
    filterReducer,
    dialog,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);