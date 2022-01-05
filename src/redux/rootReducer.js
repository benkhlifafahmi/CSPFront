import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {professionalsSlice} from '../app/modules/Professional/_redux/professionals/professionalsSlice';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  professionals: professionalsSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
