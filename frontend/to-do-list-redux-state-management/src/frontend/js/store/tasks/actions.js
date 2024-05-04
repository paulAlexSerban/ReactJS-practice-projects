import actionTypes from "./actionTypes";

let id = 0;

const addTaskHandler = (state, action) => {
  return [
    ...state,
    {
      id: id++,
      task: action.payload.task,
      completed: false,
    },
  ];
};

const removeTaskHandler = (state, action) => {
  return state.filter((task) => task.id !== action.payload.id);
};

const taskCompletedHandler = (state, action) => {
  return state.map((task) => {
    if (task.id === action.payload.id) {
      return {
        ...task,
        completed: true,
      };
    }
    return task;
  });
};

/**
 * this is not the best way to call APIs, but for the sake of simplicity, we are using fetch
 * this is only for Redux users who to not want to use Redux-Toolkit
 * @param {*} action 
 * @returns 
 */
const fetchTodo = (action) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const data = await response.json();
    dispatch({
      type: actionTypes.ADD_TASK,
      payload: {
        task: data.title,
      },
    });
  };
};

const actionHandlers = {
  [actionTypes.ADD_TASK]: addTaskHandler,
  [actionTypes.REMOVE_TASK]: removeTaskHandler,
  [actionTypes.TASK_COMPLETED]: taskCompletedHandler,
};

export { actionHandlers, fetchTodo };
