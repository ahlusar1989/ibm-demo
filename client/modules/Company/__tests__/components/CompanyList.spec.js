import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import CompanyListItem from '../../components/CompanyListItem/CompanyListItem';

const companies = [
	{ firstName: 'bob', lastName: 'williams', company: 'merc', cuid: 'cikqgkv4q01ck7453ualdn3hd', address: '4435 foo' },
	{ firstName: 'bill', lastName: 'smith', company: 'ibm', cuid: 'cikqgkv4q01ck7453ualdn3hf', address: '132434 baz' }
];

test('renders the list', t => {
  const wrapper = shallow(
    <CompanyListItem companies={companies} handleShowCompany={() => {}} handleDeleteCompany={() => {}} />
  );

  t.is(wrapper.find('CompanyListItem').length, 2);
});
