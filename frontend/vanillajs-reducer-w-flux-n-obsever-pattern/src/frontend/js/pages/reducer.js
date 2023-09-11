import initialState from './setInitialState';
import { getActionHandler } from './getActionHandler';
/* eslint-disable */
const reducer = (state = initialState, action) => {
  console.log('Updated state:', state);
    const actionHandler = getActionHandler(action.type);
    return actionHandler(state, action);
};

export default reducer;
