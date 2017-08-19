import React, { PropTypes } from 'react';

// Import Components
import CompanyListItem from './CompanyListItem/CompanyListItem';

function CompanyList(props) {
  return (
    <div className="listView">
      {
        props.companies.map(company => (
          <CompanyListItem
            company={company}
            key={company.cuid}
            onDelete={() => props.handleDeleteCompany(company.cuid)}
          />
        ))
      }
    </div>
  );
}

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteCompany: PropTypes.func.isRequired,
};

export default CompanyList;
