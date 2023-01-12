import { createSlice } from "@reduxjs/toolkit";
import { CommonPostApi } from "../Services/Actions";

const mainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    success: null,
    error: null,
    user: null,
    isAuthenticated: true
  },
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    }
  }
})
export const { setSuccess, setError, setUser, setIsAuthenticated } = mainSlice.actions;
export default mainSlice.reducer;

export const setSuccessResponse = (body, url) => async (dispatch) => {
  try {
    let res = await CommonPostApi(body, url)
    if (res?.status === 200) {
      dispatch(setSuccess(res?.data));
      dispatch(setUser(res?.data?.data));
      localStorage.setItem('user', res?.data?.data);
      localStorage.setItem('token', res?.data?.data?.token);
    }
    else {
      dispatch(setError(res?.response?.data))
    }
  } catch (error) {
    dispatch(setError(error))
  }
}

export const setUserResponse = async (data, dispatch) => {
  try {
    dispatch(setUser(data))
  } catch (error) {
    dispatch(setUser(null))
  }
}