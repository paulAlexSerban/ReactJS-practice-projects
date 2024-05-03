const setInitialStateFromHTML = () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const initialState = {
      items: {},
      selected: null,
  };

  menuItems.forEach((item) => {
      const {id} = item;
      const title = item.textContent.trim();
      const level = getNestingLevel(item);
      const submenu = [];

      // Assume that the URL could be constructed by converting title to a slug
      const url = `/${title.toLowerCase().replace(/ /g, '-')}`;

      initialState.items[id] = {
          id,
          title,
          url,
          active: false,
          level,
          submenu,
      };

      // If this item has a parent, add this item to the parent's submenu
      const parent = item.parentNode.closest('.menu-item');
      if (parent) {
          const parentId = parent.id;
          initialState.items[parentId].submenu.push(id);
      }
  });

  return initialState;
};

// Helper function to determine the nesting level of a menu item
const getNestingLevel = (element) => {
  let level = 0;
  let currentElement = element;
  while ((currentElement = currentElement.parentNode.closest('.menu-item'))) {
      level++;
  }
  return level;
};

const initialState = setInitialStateFromHTML();
// Now, you can use this initial state to initialize your Redux store or for any other purpose.
export default initialState;