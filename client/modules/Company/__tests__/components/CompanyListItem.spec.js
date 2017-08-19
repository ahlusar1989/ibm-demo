import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import CompanyListItem from '../../components/CompanyListItem/CompanyListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const company = { firstName: 'bill', lastName: 'smith', company: 'ibm', cuid: 'cikqgkv4q01ck7453ualdn3hf', address: '132434 baz' };
const props = {
  company,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <CompanyListItem {...props} />
  );

  t.truthy(wrapper.hasClass('single-company'));
  t.is(wrapper.find('Link').first().prop('children'), company.company);
  t.regex(wrapper.find('.first-name').first().text(), new RegExp(company.firstName));
  t.is(wrapper.find('.company-desc').first().text(), company.lastName);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <CompanyListItem {...props} />
  );

  t.deepEqual(wrapper.prop('company'), props.company);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', t => {
  const onDelete = sinon.spy();
  const wrapper = shallowWithIntl(
    <CompanyListItem company={company} onDelete={onDelete} />
  );

  wrapper.find('.company-action > a').first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
