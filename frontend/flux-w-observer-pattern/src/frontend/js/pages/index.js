// Action Types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Actions
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
class Dispatcher {
  constructor() {
    this.callbacks = [];
  }

  register(callback) {
    this.callbacks.push(callback);
  }

  dispatch(action) {
    this.callbacks.forEach(callback => callback(action));
  }
}

const AppDispatcher = new Dispatcher();

// Store with observers
class CounterStore {
  constructor() {
    this.count = 0;
    this.observers = {
      'count': []
    };

    AppDispatcher.register(this.handleAction.bind(this));
  }

  addObserver(property, callback) {
    if (!this.observers[property]) {
      this.observers[property] = [];
    }
    this.observers[property].push(callback);
  }

  removeObserver(property, callback) {
    this.observers[property] = this.observers[property].filter(cb => cb !== callback);
  }

  emitChange(property) {
    if (this.observers[property]) {
      this.observers[property].forEach(callback => callback(this[property]));
    }
  }

  handleAction(action) {
    switch (action.type) {
      case INCREMENT:
        this.count++;
        this.emitChange('count');
        break;
      case DECREMENT:
        this.count--;
        this.emitChange('count');
        break;
      default:
        break;
    }
  }
}

const counterStore = new CounterStore();

// Views
document.addEventListener('DOMContentLoaded', () => {
  const incrementButton = document.getElementById('increment');
  const decrementButton = document.getElementById('decrement');
  const counterElement = document.getElementById('counter');

  // You can add as many observers as you like on a property.
  counterStore.addObserver('count', newCount => {
    counterElement.textContent = newCount;
  });

  counterStore.addObserver('count', newCount => {
    /* eslint-disable no-console */
    console.log("New count value: ", newCount);
  });

  incrementButton.addEventListener('click', () => {
    AppDispatcher.dispatch(increment());
  });

  decrementButton.addEventListener('click', () => {
    AppDispatcher.dispatch(decrement());
  });
});
