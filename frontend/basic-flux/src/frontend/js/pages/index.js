(() => {
    // Action Types
    // Define constants for the type of actions that can be dispatched.
    const INCREMENT = 'INCREMENT';
    const DECREMENT = 'DECREMENT';

    // Actions
    // Action creators for generating action objects.
    function increment() {
        return {
            type: INCREMENT,
        };
    }

    function decrement() {
        return {
            type: DECREMENT,
        };
    }

    // Dispatcher
    // The dispatcher class will hold callbacks from stores that want to know
    // when actions are dispatched.
    class Dispatcher {
        constructor() {
            this.callbacks = []; // Callbacks array will hold the registered callbacks.
        }

        // Method to register a store's callback.
        register(callback) {
            this.callbacks.push(callback);
        }

        // Method to dispatch an action to all registered callbacks.
        dispatch(action) {
            this.callbacks.forEach((callback) => callback(action));
        }
    }

    // Create a dispatcher instance.
    const AppDispatcher = new Dispatcher();

    // Store
    // The store holds the application state and logic.
    class CounterStore {
        constructor() {
            this.count = 0; // The state (count) that the store manages.
            this.observers = []; // Observers array will hold the registered observer callbacks.
            AppDispatcher.register(this.handleAction.bind(this)); // Register to listen for actions from the dispatcher.
        }

        // Add an observer function
        // Method to add an observer callback.
        addObserver(observer) {
            this.observers.push(observer);
        }

        // Remove an observer function
        // Method to remove an observer callback.
        removeObserver(observer) {
            this.observers = this.observers.filter((obs) => obs !== observer);
        }

        // Notify all observers of state change
        // Method to notify all observers when the state changes.
        notifyObservers() {
            for (const observer of this.observers) {
                observer(this.count);
            }
        }

        // Handle dispatched actions and update state accordingly.
        handleAction(action) {
            switch (action.type) {
                case INCREMENT:
                    this.count++;
                    this.notifyObservers(); // Notify observers when the state changes.
                    break;
                case DECREMENT:
                    this.count--;
                    this.notifyObservers(); // Notify observers when the state changes.
                    break;
                default:
                    break;
            }
        }
    }

    // Create a store instance.
    const counterStore = new CounterStore();

    // View
    // Code that runs when the document is fully loaded.
    document.addEventListener('DOMContentLoaded', () => {
        const incrementButton = document.getElementById('increment'); // Get the increment button element.
        const decrementButton = document.getElementById('decrement'); // Get the decrement button element.
        const counterElement = document.getElementById('counter'); // Get the counter display element.

        // Register an observer that updates the counterElement text content.
        // Whenever the state changes, this function will be called.
        counterStore.addObserver((newCount) => {
            counterElement.textContent = newCount;
        });

        // When the increment button is clicked, dispatch an increment action.
        incrementButton.addEventListener('click', () => {
            AppDispatcher.dispatch(increment());
        });

        // When the decrement button is clicked, dispatch a decrement action.
        decrementButton.addEventListener('click', () => {
            AppDispatcher.dispatch(decrement());
        });
    });
})(); // Immediately-invoked function expression (IIFE) to encapsulate logic and avoid global scope pollution.
