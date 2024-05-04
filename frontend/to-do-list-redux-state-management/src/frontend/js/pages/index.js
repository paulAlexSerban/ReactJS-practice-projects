import store from "../store/tasks/store";
import actionTypes from "../store/tasks/actionTypes";
import { fetchTodo } from "../store/tasks/actions";
(() => {
  // when subscribed to Redux store, the callback function will be called every time an action is dispatched
  // this is useful for UI part when you application is in Vanilla JS and not in a framework like React
  const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
  });

  store.dispatch({ type: actionTypes.ADD_TASK, payload: { task: "Task 1" } });
  store.dispatch({ type: actionTypes.ADD_TASK, payload: { task: "Task 2" } });
  // the unsubscribe function will stop the callback function from being called when an action is dispatched
  // unsubscribe();
  store.dispatch({ type: actionTypes.ADD_TASK, payload: { task: "Task 3" } });
  store.dispatch({ type: actionTypes.REMOVE_TASK, payload: { id: 1 } });
  store.dispatch({ type: actionTypes.TASK_COMPLETED, payload: { id: 2 } });
  store.dispatch(fetchTodo());
})();
