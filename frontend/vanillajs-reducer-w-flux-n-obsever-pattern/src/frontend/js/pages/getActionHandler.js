import { setActiveItem, toggleSubmenu, defaultHandler, handleDeviceChange } from './actionHandlers';
import { SET_ACTIVE_ITEM, TOGGLE_SUBMENU, SET_TARGET_DEVICE } from './actionTypes';

export const getActionHandler = (actionType) => {
    const actionFunc = {
        [SET_ACTIVE_ITEM]: setActiveItem,
        [TOGGLE_SUBMENU]: toggleSubmenu,
        [SET_TARGET_DEVICE]: handleDeviceChange,
        default: defaultHandler,
    };

    return actionFunc[actionType] || defaultHandler;
};
