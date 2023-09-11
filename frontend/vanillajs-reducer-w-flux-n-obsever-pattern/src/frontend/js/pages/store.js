import reducer from './reducer';
/* eslint-disable */
export const createStore = () => {
    let state = reducer(undefined, {});
    console.log('Updated state:', state);
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
    const notifyPropertyObservers = (prevState, currentState) => {
        console.log('Previous state:', prevState);
        for (const property in propertyObservers) {
            console.log('Notifying property observers:', property);
            if (prevState[property] !== currentState[property]) {
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
        getPropertyObservers: () => propertyObservers, // Function to check attached callbacks
        observeProperty,
        dispatch: (action) => {
            const prevState = { ...state }; // Take a shallow copy
            state = reducer(state, action);
            notifyPropertyObservers(prevState, state); // Notify any property-specific observers

            listeners.forEach((listener) => listener()); // Notify any general listeners
        },
        subscribe: (callback) => {
            listeners.push(callback);
            return () => {
                listeners = listeners.filter((l) => l !== callback);
            };
        },
    };
};
