// getActionHandler.js
import { setActiveItem, toggleSubmenu, defaultHandler } from './actionHandlers';
import { SET_ACTIVE_ITEM, TOGGLE_SUBMENU } from './actionTypes';

export const getActionHandler = (actionType) => {
    const actionFunc = {
        [SET_ACTIVE_ITEM]: setActiveItem,
        [TOGGLE_SUBMENU]: toggleSubmenu,
        default: defaultHandler,
    };

    return actionFunc[actionType] || defaultHandler;
};
