import { createStore } from './store';
import { setActiveItemAction, toggleSubmenuAction, setTargetDeviceAction } from './actions';
const store = createStore();
/* eslint-disable */
// Check if the element should be active and update its 'active' class status
const toggleActiveClass = (itemId, shouldBeActive) => {
    const element = document.getElementById(itemId);
    if (!element) {
      return;
    }
    const isActive = element.classList.contains('active');
    if (isActive && !shouldBeActive) {
        element.classList.remove('active');
    } else if (!isActive && shouldBeActive) {
        element.classList.add('active');
    }
};

// Update classes for a single item based on the selected item ID
const updateSingleItem = (itemId, selectedItemId) => {
    const shouldBeActive = itemId === selectedItemId;
    toggleActiveClass(itemId, shouldBeActive);
};

// Update parent classes based on the selected item
const updateParentItems = (selectedItem) => {
    console.log('Updating parent items for:', selectedItem);
    let parent = selectedItem && selectedItem.parentNode.closest('.menu-item');
    const parentId = parent && parent.id;
    console.log('Parent:', parent);
    while (parent) {
        toggleActiveClass(parentId, true);
        parent = parent.parentNode.closest('.menu-item');
    }
};

// Main function to update all classes based on the current state
const updateActiveClasses = (newState) => {
    console.log('Updating active classes with:', newState);
    if (!newState) {
      return;
    }
    const { selected: selectedItemId, items } = newState;

    // Update for single items
    Object.keys(items).forEach((itemId) => {
      updateSingleItem(itemId, selectedItemId);
    });

    // Update for parent items
    const selectedItemElement = document.getElementById(selectedItemId);
    updateParentItems(selectedItemElement);
};


// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
    const currentState = store.getState();
    updateActiveClasses(currentState);
});

document.addEventListener('DOMContentLoaded', () => {
    // initial render
    const currentState = store.getState();
    updateActiveClasses(currentState);

    // Add click event listeners to menu items
    document.querySelectorAll('.menu-item').forEach((item) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = e.currentTarget.id;

            try {
                store.dispatch(setActiveItemAction(itemId));
                store.dispatch(toggleSubmenuAction(itemId));
            } catch (error) {
                console.error('An error occurred:', error);
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            store.dispatch(setTargetDeviceAction('desktop'));
        } else {
            store.dispatch(setTargetDeviceAction('mobile'));
        }
    });
});

// Observe properties
store.observeProperty('selected', updateActiveClasses);
store.observeProperty('isMobile', () => {
    console.log(`Device type changed: ${store.getState().isMobile ? 'Mobile' : 'Desktop'}`);
});

// Check attached callbacks
// console.log(store.getPropertyObservers());
