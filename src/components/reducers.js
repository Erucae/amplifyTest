import {FETCH_QUERY_BEGINNING, FETCH_QUERY_SUCCESS,FETCH_QUERY_FAIL, ADD_TODOS, SUBSCRIPTION_ON_CREATE_TODO, SET_DIALOG, SUBSCRIPTION_ON_UPDATE_TODO} from "./actions";

const initialState = {
  loading: false,
  todos: [],
  error: '',
};

const getIndex = (todos, todo) => {
  return todos.findIndex(elem => elem.id === todo.id);
};

const updateTodo = (todos, newTodo, index) => {
  if(index > 0)
    return todos;
  const newTodos = [...todos.slice(0, index), newTodo, ...todos.slice(index+1)];
  return newTodos;
};

const queryReducer = (state=initialState, action) => {
  const {type, payload} = action;
  console.log(state);
  console.log('reducers 13');

  switch (type) {
    case FETCH_QUERY_BEGINNING: return {...state, loading: true};
    case FETCH_QUERY_SUCCESS:  return {...state, todos: payload.todos, loading: false};
    case FETCH_QUERY_FAIL: return {...state, error: payload.error};
    case ADD_TODOS: return {...state, todos: [...state.todos, ...payload.todos]};
    case SUBSCRIPTION_ON_CREATE_TODO: return {...state, todos: [...state.todos, payload.todo]};
    case SUBSCRIPTION_ON_UPDATE_TODO: {
      alert('at update');
      const {todos} = state;
      const {newTodo} = payload;
      return {...state, todos: updateTodo(todos, newTodo, getIndex(todos, newTodo))};
    }
    case SET_DIALOG: return {...state, showDialog: payload.showDialog, title: payload.title, message: payload.message};
    default: return state;
  }
};



export default queryReducer;

