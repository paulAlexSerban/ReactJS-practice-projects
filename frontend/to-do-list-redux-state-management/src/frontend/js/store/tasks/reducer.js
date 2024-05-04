import { actionHandlers, thunkActionHandlers } from "./actions";

/**
 * @param {Array} state = []
 * @param {Object} action = {type: 'ADD_TASK', payload: {task: 'Task 1'}}
 * @returns {Array} state = [{id: 123456, task: 'Task 1', completed: false}]
 */

const reducer = (state = [], action) => {
  const { type } = action;

  if (actionHandlers[type]) {
    return actionHandlers[type](state, action);
  } else {
    return state;
  }
};

export default reducer;
