import reducer from './reducer';

export const createStore = () => {
    let state = reducer(undefined, {});
    let listeners = [];

    const devTools =
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__.connect({
            name: 'VanillaJS Redux',
            trace: true,
        });

    if (devTools) {
        devTools.init(state);
    }

    return {
        getState: () => state,

        dispatch: (action) => {
            const { payload } = action;
            try {
                const prevState = state;
                state = reducer(state, action);
                if (devTools) {
                    devTools.send(action, state);
                }

                listeners.forEach((listener) => {
                    const { selector, callback } = listener;
                    const prevStateSelected = prevState[selector] || prevState.items[payload][selector];
                    const currentStateSelected = state[selector] || state.items[payload][selector];
                    if (prevStateSelected !== currentStateSelected) {
                        callback();
                    }
                });
            } catch (error) {
                /* eslint-disable */
                console.error('An error occurred during dispatch:', error);
            }
        },
        subscribe: (selector, callback) => {
            listeners.push({ selector, callback });
            return () => {
                listeners = listeners.filter(
                    (listener) => listener.selector !== selector || listener.callback !== callback
                );
            };
        },
    };
};
