import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import CompanyList from '../../components/CompanyList';
import CompanyCreateWidget from '../../components/CompanyCreateWidget/CompanyCreateWidget';

// Import Actions
import { addCompanyRequest, fetchCompanies, deleteCompanyRequest } from '../../CompanyActions';
import { toggleAddCompany } from '../../../App/AppActions';

// Import Selectors
import { getShowAddCompany } from '../../../App/AppReducer';
import { getCompanies } from '../../CompanyReducer';

class CompanyListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCompanies());
  }

  handleDeleteCompany = company => {
    if (confirm('Do you want to delete this company?')) { // eslint-disable-line
      this.props.dispatch(deleteCompanyRequest(company));
    }
  };

  handleAddCompany = (firstName, lastName, address, company) => {
    this.props.dispatch(toggleAddCompany());
    this.props.dispatch(addCompanyRequest({ firstName, lastName, address, company }));
  };

  render() {
    return (
      <div>
        <CompanyCreateWidget addCompany={this.handleAddCompany} showAddCompany={this.props.showAddCompany} />
        <CompanyList handleDeleteCompany={this.handleDeleteCompany} companies={this.props.companies} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
CompanyListPage.need = [() => { return fetchCompanies(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddCompany: getShowAddCompany(state),
    companies: getCompanies(state),
  };
}

CompanyListPage.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
  })).isRequired,
  showAddCompany: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

CompanyListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(CompanyListPage);
