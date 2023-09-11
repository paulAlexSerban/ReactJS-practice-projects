import { createStore } from './store';
import { setActiveItemAction, toggleSubmenuAction, setTargetDeviceAction } from './actions';
/* eslint-disable */
const store = createStore();

// Check if the element should be active and update its 'active' class status
const toggleActiveClass = (element, shouldBeActive) => {
    const isActive = element.classList.contains('active');
    if (isActive && !shouldBeActive) {
        element.classList.remove('active');
    } else if (!isActive && shouldBeActive) {
        element.classList.add('active');
    }
};

// Update classes for a single item based on the selected item ID
const updateSingleItem = (item, selectedItemId) => {
    toggleActiveClass(item, item.id === selectedItemId);
};

// Update parent classes based on the selected item
const updateParentItems = (selectedItem) => {
    let parent = selectedItem && selectedItem.parentNode.closest('.menu-item');
    while (parent) {
        toggleActiveClass(parent, true);
        parent = parent.parentNode.closest('.menu-item');
    }
};

// Main function to update all classes based on the current state
const updateActiveClasses = () => {
    const state = store.getState();
    const selectedItemId = state.selected;
    const allMenuItems = document.querySelectorAll('.menu-item');

    // Update classes for each menu item
    allMenuItems.forEach((item) => updateSingleItem(item, selectedItemId));

    // Update parent items
    const selectedItem = document.getElementById(selectedItemId);
    if (selectedItem) {
        updateParentItems(selectedItem);
    }
};

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
    updateActiveClasses();
});

document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    updateActiveClasses();

    // Add click event listeners to menu items
    document.querySelectorAll('.menu-item').forEach((item) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = e.currentTarget.id;

            try {
                store.dispatch(setActiveItemAction(itemId));
                store.dispatch(toggleSubmenuAction(itemId));
                // store.dispatch(setTargetDeviceAction('desktop')))
            } catch (error) {
                console.error('An error occurred:', error);
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            store.dispatch(setTargetDeviceAction('desktop'))
        } else {
            store.dispatch(setTargetDeviceAction('mobile'))
        }
    });
});
