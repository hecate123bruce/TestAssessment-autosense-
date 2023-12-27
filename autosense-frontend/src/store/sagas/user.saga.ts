import { AppActions } from "store";
import { jwtDecode } from "jwt-decode";

import { call, put } from "redux-saga/effects";

import { mainApiInstance, remoteToken } from "utils/ApiInstance";

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export function* loginSaga(action: any) {
  try {
    const result: ResponseGenerator = yield call(
      async () =>
        await mainApiInstance.post("/api/v1/users/login", action.payload)
    );

    if (result) {
      yield put(AppActions.user.loginSuccess(result.data));
    }
  } catch (error: any) {
    yield put(AppActions.user.loginError(error.response.data.message));
  }
}

export function* createUserSaga(action: any) {
  try {
    const result: ResponseGenerator = yield call(
      async () => await mainApiInstance.post("/api/v1/users", action.payload)
    );

    if (result) {
      yield put(AppActions.user.createUserSuccess(result.data));
    }
  } catch (error: any) {
    yield put(AppActions.user.createUserError(error.response.data.message));
  }
}

export function* updateUserSaga(action: any) {
  try {
    const result: ResponseGenerator = yield call(
      async () =>
        await mainApiInstance.post("/api/v1/users/update", action.payload)
    );

    if (result) {
      yield put(AppActions.user.updateUserSuccess(result.data));
    }
  } catch (error: any) {
    yield put(AppActions.user.updateUserError(error.response.data.message));
  }
}

export function* verifyTokenSaga() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        const result: ResponseGenerator = yield call(
          async () => await mainApiInstance.get("/api/v1/users/me")
        );

        if (result) {
          yield put(AppActions.user.verifyTokenSuccess(result.data));
        }
      } else {
        // Token expired, clear user data
        yield put(AppActions.user.verifyTokenError());
        remoteToken();
      }
    } else {
      yield put(AppActions.user.verifyTokenError());
    }
  } catch (error: any) {
    yield put(AppActions.user.verifyTokenError(error.response.data.message));
  }
}

export function* deleteUserSaga() {
  try {
    const result: ResponseGenerator = yield call(
      async () => await mainApiInstance.delete("/api/v1/users")
    );

    if (result) {
      yield put(AppActions.user.deleteUserSuccess());
      remoteToken();
    }
  } catch (error: any) {
    yield put(AppActions.user.deleteUserError(error.response.data.message));
  }
}
