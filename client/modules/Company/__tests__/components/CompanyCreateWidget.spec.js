import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { CompanyCreateWidget } from '../../components/CompanyCreateWidget/CompanyCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addCompany: () => {},
  showAddCompany: true,
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <CompanyCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewCompany" />));
  t.is(wrapper.find('input').length, 3);
  t.is(wrapper.find('textarea').length, 1);
});

test('hide when showAddCompany is false', t => {
  const wrapper = mountWithIntl(
    <CompanyCreateWidget {...props} />
  );

  wrapper.setProps({ showAddCompany: false });
  t.falsy(wrapper.hasClass('appear'));
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <CompanyCreateWidget {...props} />
  );

  t.is(wrapper.prop('addCompany'), props.addPost);
  t.is(wrapper.prop('showAddCompany'), props.showAddPost);
});

test('calls addCompany', t => {
  const addCompany = sinon.spy();
  const wrapper = mountWithIntl(
    <CompanyCreateWidget addCompany={addCompany} showAddCompany />
  );

  wrapper.ref('firstName').get(0).value = 'David';
  wrapper.ref('lastName').get(0).value = 'Goliath';
  wrapper.ref('address').get(0).value = '123';
  wrapper.ref('company').get(0).value = 'acme inc';


  wrapper.find('a').first().simulate('click');
  t.truthy(addCompany.calledOnce);
  t.truthy(addCompany.calledWith('David', 'Goliath', '123', 'acme inc'));
});

test('empty form doesn\'t call addCompany', t => {
  const addCompany = sinon.spy();
  const wrapper = mountWithIntl(
    <CompanyCreateWidget addCompany={addCompany} showAddCompany />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addCompany.called);
});
