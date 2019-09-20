import API, {graphqlOperation} from "@aws-amplify/api";
import {listTodos} from "../graphql/queries";
import config from "../../aws-exports";
import PubSub from "@aws-amplify/pubsub";

API.configure(config);            // Configure Amplify
PubSub.configure(config);

export const QUERY = "QUERY";
export const SUBSCRIPTION = "SUBSCRIPTION";
export const FETCH_QUERY_BEGINNING = 'FETCH_QUERY_BEGINNING';
export const FETCH_QUERY_SUCCESS = 'FETCH_QUERY_SUCCESS';
export const FETCH_QUERY_FAIL = 'FETCH_QUERY_FAIL';


const fetchQueryBeginning = () => {
  return {
    type: FETCH_QUERY_BEGINNING
  }
}

const fetchQuerySuccess = data => {
  console.log(data);
  return {
    type: FETCH_QUERY_SUCCESS,
    payload: {
      todos: data.data.listTodos.items
    }
  }
};

const fetchQueryFail = error => {
  return {
    type: FETCH_QUERY_FAIL,
    payload: {
      error: error
    }
  }
};

export const fetchQuery = (listTodos) => {
  return async dispatch => {
    dispatch(fetchQueryBeginning());

    API.graphql(graphqlOperation(listTodos))
      .then(result => {dispatch(fetchQuerySuccess(result))})
      .catch(error => {dispatch(fetchQueryFail(error))});
  }
};

export const handleQuery = (data) => {
  return {
    type: QUERY,
    payload: {
      todos: data
    }
  }
};

export const handleSubscription = (data) => ({
  type: SUBSCRIPTION,
  payload: {
    todo: data
  }
});


