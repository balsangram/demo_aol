import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
    //   state.user = action.payload.user;
    //   state.token = action.payload.token;
      state.isAuthenticated = true;
    //   localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
    //   state.user = null;
    //   state.token = null;
      state.isAuthenticated = false;
    //   localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
