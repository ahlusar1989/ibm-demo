import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CompanyCreateWidget.css';

export class CompanyCreateWidget extends Component {
  addCompany = () => {
    const firstName = this.refs.firstName;
    const lastName = this.refs.lastName;
    const addressRef = this.refs.address;
    const companyRef = this.refs.company;
    if (firstName.value && lastName.value && addressRef.value && companyRef.value) {
      this.props.addCompany(firstName.value, lastName.value, addressRef.value, companyRef.value);
      companyRef.value = firstName.value = lastName.value = addressRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddCompany ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="Create New Company" /></h2>
          <input placeholder={this.props.intl.messages.firstName} className={styles['form-field']} ref="firstName" />
          <input placeholder={this.props.intl.messages.lastName} className={styles['form-field']} ref="lastName" />
          <input placeholder={this.props.intl.messages.company} className={styles['form-field']} ref="company" />
          <textarea placeholder={this.props.intl.messages.address} className={styles['form-field']} ref="address" />
          <a className={styles['company-submit-button']} href="#" onClick={this.addCompany}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

CompanyCreateWidget.propTypes = {
  addCompany: PropTypes.func.isRequired,
  showAddCompany: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CompanyCreateWidget);
