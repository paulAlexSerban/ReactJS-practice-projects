import reducer from './reducer';

export const createStore = () => {
    let state = reducer(undefined, {});
    let listeners = [];
    let propertyObservers = {};

    const devTools =
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__.connect({
            name: 'VanillaJS Redux',
            trace: true,
        });

    if (devTools) {
        devTools.init(state);
    }
    // Call property-specific observers if a property changes
    const notifyPropertyObservers = (prevStateObj, currentStateObj, payload) => {
        for (const property in propertyObservers) {
            /* eslint-disable */
            const prevState = prevStateObj[property] || prevStateObj.items[payload][property];
            const currentState = currentStateObj[property] || currentStateObj.items[payload][property];
            if (prevState !== currentState) {
                propertyObservers[property].forEach((callback) => callback(currentState));
            }
        }
    };

    // Allows attaching multiple callbacks to a specific property
    const observeProperty = (property, callback) => {
        if (!propertyObservers[property]) {
            propertyObservers[property] = [];
        }
        propertyObservers[property].push(callback);
    };

    return {
        getState: () => state,
        observeProperty,
        dispatch: (action) => {
            const { payload } = action;
            try {
                const prevState = state;
                state = reducer(state, action);
                if (devTools) {
                    devTools.send(action, state);
                }
                notifyPropertyObservers(prevState, state, payload); // Notify any property-specific observers

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
