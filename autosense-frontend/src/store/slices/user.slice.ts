import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "types";
import { remoteToken } from "utils/ApiInstance";
import { makeInstance } from "utils/ApiInstance/api.instance";

type StateType = {
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  errors: string[];
};

const initialState: StateType = {
  user: null,
  loading: false,
  isAuthenticated: false,
  errors: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    /**
     * login user
     */
    login(state: StateType, action) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      const { token, user } = action.payload;
      localStorage.setItem("token", token);
      makeInstance(process.env.REACT_APP_SERVER_API || "");
      state.loading = false;
      state.isAuthenticated = true;
      state.user = user;
    },
    loginError(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.errors = action.payload;
    },

    /**
     * create user
     */
    createUser(state: StateType, action) {
      state.loading = true;
    },
    createUserSuccess(state, action) {
      state.loading = false;
      const { result } = action.payload;
      state.user = result;
    },
    createUserError(state, action) {
      state.loading = false;
      state.errors = action.payload;
    },

    /**
     * update user
     */
    updateUser(state, action) {
      state.loading = true;
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.data;
    },
    updateUserError(state, action) {
      state.loading = false;
      state.errors = action.payload;
    },

    /**
     * veify user
     */
    verifyToken(state) {
      state.loading = true;
    },
    verifyTokenSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.data;
    },
    verifyTokenError(state) {
      state.isAuthenticated = false;
      state.user = null;
    },

    /**
     * logout user
     */
    logoutUser(state) {
      remoteToken();
      state.isAuthenticated = false;
    },

    /**
     * delete user
     */
    deleteUser(state) {
      state.loading = true;
    },
    deleteUserSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    deleteUserError(state, action) {
      state.loading = false;
      state.errors = action.payload;
    },

    resetErrors(state) {
      state.errors = [];
    },
  },
});

export const reducer = userSlice.reducer;
export const actions = userSlice.actions;
