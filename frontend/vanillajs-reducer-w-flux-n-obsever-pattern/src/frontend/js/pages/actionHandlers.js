export const setActiveItem = (state, action) => ({
    ...state,
    selected: action.payload,
});

export const toggleSubmenu = (state, action) => {
    const newItemState = { ...state.items[action.payload] };
    newItemState.active = !newItemState.active;
    return {
        ...state,
        items: {
            ...state.items,
            [action.payload]: newItemState,
        },
    };
};

export const handleDeviceChange = (state, action) => {
    const { device, width } = action.payload;
    return {
        ...state,
        device,
        width,
    };
};

export const defaultHandler = (state) => state;
