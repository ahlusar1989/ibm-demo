import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMPANY = 'ADD_COMPANY';
export const ADD_COMPANIES = 'ADD_COMPANIES';
export const DELETE_COMPANY = 'DELETE_COMPANY';

// Export Actions
export function addCompany(company) {
  return {
    type: ADD_COMPANY,
    company,
  };
}

export function addCompanyRequest(company) {
  return (dispatch) => {
    return callApi('companies', 'post', {
      company: {
        firstName: company.firstName,
        lastName: company.lastName,
        address: company.address,
        company: company.company,
      },
    }).then(res => dispatch(addCompany(res.company)));
  };
}

export function addCompanies(companies) {
  return {
    type: ADD_COMPANIES,
    companies,
  };
}

export function fetchCompanies() {
  return (dispatch) => {
    return callApi('companies').then(res => {
      dispatch(addCompanies(res.companies));
    });
  };
}

export function fetchCompany(cuid) {
  return (dispatch) => {
    return callApi(`companies/${cuid}`).then(res => dispatch(addCompany(res.company)));
  };
}

export function deleteCompany(cuid) {
  return {
    type: DELETE_COMPANY,
    cuid,
  };
}

export function deleteCompanyRequest(cuid) {
  return (dispatch) => {
    return callApi(`companies/${cuid}`, 'delete').then(() => dispatch(deleteCompany(cuid)));
  };
}
