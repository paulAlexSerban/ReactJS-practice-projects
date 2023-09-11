import { SET_ACTIVE_ITEM, TOGGLE_SUBMENU, SET_TARGET_DEVICE } from './actionTypes';

export const setActiveItemAction = (payload) => ({
    type: SET_ACTIVE_ITEM,
    payload,
});

export const toggleSubmenuAction = (payload) => ({
    type: TOGGLE_SUBMENU,
    payload,
});

export const setTargetDeviceAction = (payload) => ({
    type: SET_TARGET_DEVICE,
    payload,
});
