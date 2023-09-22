import { SET_ACTIVE_ITEM, TOGGLE_SUBMENU } from './actionTypes';

export const setActiveItemAction = (payload) => ({ type: SET_ACTIVE_ITEM, payload });
export const toggleSubmenuAction = (payload) => ({ type: TOGGLE_SUBMENU, payload });
