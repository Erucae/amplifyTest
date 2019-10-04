import {graphQLOperation} from './helpers';

export const QUERY = "QUERY";
export const SUBSCRIPTION_ON_CREATE_TODO = "SUBSCRIPTION_ON_CREATE_TODO";
export const SUBSCRIPTION_ON_UPDATE_TODO = 'SUBSCRIPTION_ON_UPDATE_TODO';
export const FETCH_QUERY_BEGINNING = 'FETCH_QUERY_BEGINNING';
export const FETCH_QUERY_SUCCESS = 'FETCH_QUERY_SUCCESS';
export const FETCH_QUERY_FAIL = 'FETCH_QUERY_FAIL';
export const SET_FILTER = 'SET_FILTER';
export const ADD_TODOS = 'ADD_TODOS';
export const SET_DIALOG = 'SET_DIALOG';

const add_Todos = todos => ({
  type: ADD_TODOS,
  payload: {
    todos
  }
});

const fetchQueryBeginning = () => {
  return {
    type: FETCH_QUERY_BEGINNING
  }
};

const fetchQuerySuccess = data => {
  // console.log(data);
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

export const setFilter = filter => {
  return {
    type: SET_FILTER,
    payload: {
      filter
    }
  }
};

const getLists = async (listTodos, nextToken = null) => {
  return graphQLOperation(listTodos, nextToken);
};

export const fetchQuery = (listTodos) => {
  return async dispatch => {
    dispatch(fetchQueryBeginning());

    getLists(listTodos)
      .then(async result => {
        console.log('actions 73');
        console.log(result.data.listTodos.nextToken);
        dispatch(fetchQuerySuccess(result));
        // getLists(listTodos, {nextToken: result.data.listTodos.nextToken}).then(result => dispatch(fetchQuerySuccess(result)))
        // dispatch(fetchQuerySuccess(result));
      })
      .catch(error => {
        dispatch(fetchQueryFail(error))
      });
  }
};

const createTodoSubscription = (data) => ({
  type: SUBSCRIPTION_ON_CREATE_TODO,
  payload: {
    todo: data
  }
});

export const onCreateTodoSubscription = subscription => {
  return dispatch => {
    return graphQLOperation(subscription).subscribe({
      next: eventData => {
        const todo = eventData.value.data.onCreateTodo;
        dispatch(createTodoSubscription(todo));
        dispatch(setDialog(true, 'Todo was created', todo.name));

        console.log(todo);
        console.log('actions 91');
      }
    })
  }
};

const updateTodoSubscription = (data) => ({
  type: SUBSCRIPTION_ON_UPDATE_TODO,
  payload: {
    newTodo: data
  }
});

export const onUpdateTodoSubscription = (subscription) => {
  return dispatch => {
    return graphQLOperation(subscription).subscribe({
      next: eventData => {
        const todo = eventData.value.data.onUpdateTodo;
        dispatch(updateTodoSubscription(todo));
        console.log(todo);
        console.log('actions 112');

      }
    });
  }
};

export const setDialog = (value, title, message) => ({
  type: SET_DIALOG,
  payload: {
    showDialog: value,
    title,
    message
  }
});

