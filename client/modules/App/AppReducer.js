// Import Actions
import { TOGGLE_ADD_COMPANY } from './AppActions';

// Initial State
const initialState = {
  showAddCompany: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_COMPANY:
      return {
        showAddCompany: !state.showAddCompany,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddCompany to mutate state
export const getShowAddCompany = state => state.app.showAddCompany;

// Export Reducer
export default AppReducer;
