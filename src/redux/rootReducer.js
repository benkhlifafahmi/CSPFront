import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {professionalsSlice} from '../app/modules/Professional/_redux/professionals/professionalsSlice';
import {assuresSlice} from '../app/modules/Assures/_redux/assures/assuresSlice';
import {apcisSlice} from '../app/modules/APCI/_redux/apcis/apcisSlice';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  professionals: professionalsSlice.reducer,
  assures: assuresSlice.reducer,
  apcis: apcisSlice
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
