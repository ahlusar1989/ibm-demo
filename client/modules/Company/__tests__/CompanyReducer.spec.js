import test from 'ava';
import { reducerTest } from 'redux-ava';
import companyReducer, { getCompany, getCompanies } from '../CompanyReducer';
import { addCompany, deleteCompany, addCompanies } from '../CompanyActions';

test('action for ADD_COMPANY updates state', reducerTest(
  companyReducer,
  { data: ['foo'] },
  addCompany({
    firstName: 'frank',
    lastName: 'first',
    address: '!',
    _id: null,
    cuid: null,
    company: 'first-company',
  }),
  { data: [{
    firstName: 'frank',
    lastName: 'first',
    address: '!',
    _id: null,
    cuid: null,
    company: 'first-company',
  }, 'foo'] },
));

test('action for DELETE_COMPANY removes object from state tree', reducerTest(
  companyReducer,
  { data: [{
    firstName: 'frank',
    lastName: 'first',
    address: '!',
    cuid: 'abc',
    _id: 1,
    company: 'first-company',
  }] },
  deleteCompany('abc'),
  { data: [] },
));

test('action for ADD_COMPANIES adds multiple companies', reducerTest(
  companyReducer,
  { data: [] },
  addCompanies([
    {
      firstName: 'frank',
      lastName: 'first',
      address: '!',
      _id: null,
      cuid: null,
      company: 'first-company',
    },
  ]),
  { data: [{
    firstName: 'frank',
    lastName: 'first',
    address: '!',
    _id: null,
    cuid: null,
    company: 'first-company',
  }] },
));

test('getCompanies selector retrieves vertiable records', t => {
  t.deepEqual(
    getCompanies({
      companies: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getCompany selector retrieves vertiable record', t => {
  t.deepEqual(
    getCompany({
      companies: { data: [{ cuid: '123' }] },
    }, '123'),
    { cuid: '123' }
  );
});

