import test from 'ava';
import { reducerTest } from 'redux-ava';
import appReducer, { getShowAddCompany } from '../AppReducer';
import { toggleAddCompany } from '../AppActions';

test('action for TOGGLE_ADD_POST is working', reducerTest(
  appReducer,
  { showAddCompany: false },
  toggleAddCompany(),
  { showAddCompany: true },
));

test('getShowAddCompany selector', t => {
  t.is(getShowAddCompany({
    app: { showAddCompany: false },
  }), false);
});
