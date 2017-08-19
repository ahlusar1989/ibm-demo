import { ADD_COMPANY, ADD_COMPANIES, DELETE_COMPANY } from './CompanyActions';

// Initial State
const initialState = { data: [] };

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPANY :
      return {
        data: [action.company, ...state.data],
      };

    case ADD_COMPANIES :
      return {
        data: action.companies,
      };

    case DELETE_COMPANY :
      return {
        data: state.data.filter(company => company.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all companies
export const getCompanies = state => state.companies.data;

// Get first company by cuid in collection
export const getCompany = (state, cuid) => state.companies.data.filter(company => company.cuid === cuid)[0];

// Export Reducer
export default companyReducer;
