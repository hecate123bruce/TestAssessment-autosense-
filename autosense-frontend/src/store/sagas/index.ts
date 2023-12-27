//node_modules
//slices
import { AppActions } from "store";
//sagas
import {
  createUserSaga,
  updateUserSaga,
  loginSaga,
  verifyTokenSaga,
  deleteUserSaga,
} from "./user.saga";

import { all, takeLatest } from "redux-saga/effects";

//sagas
function* rootSaga() {
  //currency
  yield all([
    takeLatest(AppActions.user.login.type, loginSaga),
    takeLatest(AppActions.user.createUser.type, createUserSaga),
    takeLatest(AppActions.user.updateUser.type, updateUserSaga),
    takeLatest(AppActions.user.verifyToken.type, verifyTokenSaga),
    takeLatest(AppActions.user.deleteUser.type, deleteUserSaga),
  ]);
}

export default rootSaga;
