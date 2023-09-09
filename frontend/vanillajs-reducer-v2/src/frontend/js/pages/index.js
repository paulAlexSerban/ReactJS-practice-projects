(() => {
    // Action Types
    const INCREMENT = 'INCREMENT';
    const DECREMENT = 'DECREMENT';

    // Initial state
    const initialState = {
        counter: 0,
    };

    // Action functions
    const incrementAction = (state) => ({ ...state, counter: state.counter + 1 });
    const decrementAction = (state) => ({ ...state, counter: state.counter - 1 });

    // Action type mapping
    const actionTypes = {
        [INCREMENT]: incrementAction,
        [DECREMENT]: decrementAction,
        default: (state) => state,
    };

    // Reducer function
    const reducerDefinition = (state = initialState, action) => {
        const actionFunc = actionTypes[action.type] || actionTypes.default;
        return actionFunc(state, action);
    };

    // Store creation function
    const createStore = (reducer) => {
        let state = reducer(undefined, {});
        let listeners = [];

        // Integrate Redux DevTools
        const devTools =
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__.connect({
                name: 'VanillaJS Redux',
                trace: true,
            });
        if (devTools) {
            devTools.init(state); // Initialize DevTools with the initial state
        }

        // Public API
        return {
            getState: () => state,
            dispatch: (action) => {
                state = reducer(state, action);

                // Send the new state to Redux DevTools
                if (devTools) {
                    devTools.send(action, state);
                }

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

    // Application logic
    (() => {
        const store = createStore(reducerDefinition);

        const unsubscribe = store.subscribe(() => {
            /* eslint-disable */
            console.log('New state:', store.getState());
        });

        // Dispatch actions
        store.dispatch({ type: INCREMENT });
        store.dispatch({ type: INCREMENT });
        store.dispatch({ type: DECREMENT });

        // Unsubscribe from the store
        unsubscribe();
    })();
})();
