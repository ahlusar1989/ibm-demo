import test from 'ava';
import { actionTest } from 'redux-ava';
import { TOGGLE_ADD_POST, toggleAddCompany } from '../AppActions';

test('should return the correct type for toggleAddCompany', actionTest(toggleAddCompany, null, { type: TOGGLE_ADD_POST }));
