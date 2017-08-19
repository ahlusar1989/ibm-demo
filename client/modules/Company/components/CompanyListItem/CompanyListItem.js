import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CompanyListItem.css';

function CompanyListItem(props) {
  return (
    <div className={styles['single-company']}>
      <h3 className={styles['company-title']}>
        <Link to={`/posts/${props.company.cuid}`} >
          {props.company.company}
        </Link>
      </h3>
      <p className={styles['first-name']}><FormattedMessage id="User's First Name: " /> {props.company.firstName}</p>
      <p className={styles['company-desc']}>{props.company.lastName}</p>
      <p className={styles['company-desc']}>{props.company.address}</p>
      <p className={styles['company-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="Delete Company" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

CompanyListItem.propTypes = {
  company: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CompanyListItem;
