import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_COMPANY,
  DELETE_COMPANY,
  ADD_COMPANIES,
  addCompany,
  deleteCompany,
  addCompanies,
} from '../CompanyActions';

const company = { _id: 1, firstName: 'bill', lastName: 'smith', company: 'ibm', cuid: 'cikqgkv4q01ck7453ualdn3hf', address: '132434 baz' };

test('should return the correct type for addCompany', actionTest(
  addCompany,
  company,
  { type: ADD_COMPANY, company },
));

test('should return the correct type for deleteCompany', actionTest(
  deleteCompany,
  company.cuid,
  { type: DELETE_COMPANY, cuid: company.cuid },
));

test('should return the correct type for addCompanies', actionTest(
  addCompanies,
  [company],
  { type: ADD_COMPANIES, companies: [company] },
));
