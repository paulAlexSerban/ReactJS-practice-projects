// reducer.js
import initialState from './setInitialState';
import { getActionHandler } from './getActionHandler';

const reducer = (state = initialState, action) => {
  const actionHandler = getActionHandler(action.type);
  return actionHandler(state, action);
};

export default reducer;
