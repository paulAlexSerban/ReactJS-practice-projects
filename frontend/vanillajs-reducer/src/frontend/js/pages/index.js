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
        if (actionTypes[action.type]) {
            return actionTypes[action.type](state);
        }
        return actionTypes.default(state);
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

    // Create a new store
    const store = createStore(reducerDefinition);

    // Define action types
    const increment = (state) => ({ ...state, counter: state.counter + 1 });
    actionTypes.INCREMENT = increment;

    const decrement = (state) => ({ ...state, counter: state.counter - 1 });
    actionTypes.DECREMENT = decrement;

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
