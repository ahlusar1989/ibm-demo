import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Company from '../company';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial companies added into test db
const companies = [
  new Company({ cuid: 'f34gb2bh24b24b2', firstName: 'thing one', lastName: 'lastName thing one', address: '456 stinson', company: 'acme 1' }),
  new Company({ cuid: 'f34gb2bh24b24b3', firstName: 'thing two', lastName: 'lastName thing two', address: '789 galveston', company: 'acme 2' }),
];

test.beforeEach('connect and add two company entries', t => {
  connectDB(t, () => {
    Company.create(companies, err => {
      if (err) t.fail('Unable to create companies');
    });
  });
});

test.afterEach.always(t => {
  dropDB(t);
});

test.serial('Should correctly give number of Companies', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/companies')
    .set('Accept', 'application/json');
  t.is(res.status, 200);
  t.is(companies.length, res.body.companies.length);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const newCompany = new Company({ cuid: 'f34gb2bh24b24b4', firstName: 'thing two', lastName: 'lastName thing two', address: '789 galveston', company: 'acme 2' });
  newCompany.save();

  const res = await request(app)
    .get('/api/companies/f34gb2bh24b24b4')
    .set('Accept', 'application/json');
  t.is(res.status, 200);
  t.is(res.body.company.name, newCompany.name);
});

test.serial('Should correctly add a company', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/companies')
    .send({ company: { firstName: 'Foo', lastName: 'bar', company: 'Some Inc', address: '1234 cherry hill dr' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedCompany = await Company.findOne({ lastName: 'bar' }).exec();
  t.is(savedCompany.firstName, 'Foo');
});

test.serial('Should correctly delete a company', async t => {
  t.plan(2);

  const company = new Company({ cuid: 'f34gb2bh24b24b2', firstName: 'baxter', lastName: 'bar', company: 'Some Inc', address: '1234 cherry hill dr' });
  company.save();

  const res = await request(app)
    .delete(`/api/companies/${company.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedCompany = await Company.findOne({ cuid: company.cuid }).exec();
  t.is(queriedCompany, null);
});

