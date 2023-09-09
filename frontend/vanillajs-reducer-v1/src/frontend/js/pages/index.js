(() => {
    // Initial state
    const initialState = {
        counter: 0,
    };

    const actionTypes = {
        default: (state) => state,
    };

    // Reducer function
    const reducerDefinition = (state = initialState, action) => {
        const actionFunc = actionTypes[action.type] || actionTypes.default;
        return actionFunc(state, action);
    };

    // Store
    const createStore = (reducer) => {
        let state = reducer(undefined, {});
        let listeners = [];

        return {
            getState: () => state,
            dispatch: (action) => {
                state = reducer(state, action);
                listeners.forEach((listener) => listener());
            },
            subscribe: (listener) => {
                listeners.push(listener);
                return () => {
                    listeners = listeners.filter((l) => l !== listener);
                };
            },
        };
    };

    (() => {
        // Create a new store
        const store = createStore(reducerDefinition);

        // Define action types
        const incrementAction = (state) => ({ ...state, counter: state.counter + 1 });
        const decrementAction = (state) => ({ ...state, counter: state.counter - 1 });

        // register new action type
        // Dynamically registering actions in the actionTypes object can be convenient, but it might make it harder to understand what actions are available at a glance, especially as your application grows.
        actionTypes.INCREMENT = incrementAction;
        actionTypes.DECREMENT = decrementAction;

        // Subscribe to store updates
        const unsubscribe = store.subscribe(() => {
            /* eslint-disable */
            console.log('New state:', store.getState());
        });

        // Dispatch some actions
        store.dispatch({ type: 'INCREMENT' });
        store.dispatch({ type: 'INCREMENT' });
        store.dispatch({ type: 'DECREMENT' });

        // Unsubscribe from the store
        unsubscribe();
    })();
})();