import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/CompanyListItem/CompanyListItem.css';

// Import Actions
import { fetchCompany } from '../../CompanyActions';

// Import Selectors
import { getCompany } from '../../CompanyReducer';

export function CompanyDetailPage(props) {
  return (
    <div>
      <Helmet title={props.company.company} />
      <div className={`${styles['single-company']} ${styles['company-detail']}`}>
        <h3 className={styles['company-title']}>{props.company.firstName}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.company.lastName}</p>
        <p className={styles['company-desc']}>{props.company.address}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
CompanyDetailPage.need = [params => {
  return fetchCompany(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    company: getCompany(state, props.params.cuid),
  };
}

CompanyDetailPage.propTypes = {
  company: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(CompanyDetailPage);
