import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas";

import {
  userReducer,
  userActions,
} from "./slices";

const reducer = combineReducers({
  user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  preloadedState: {},
  reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(
      sagaMiddleware
    ),
});


export const AppActions = {
  user: userActions,
};

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
