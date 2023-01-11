import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    success: null,
    error: null,
    user: null
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
    }
  }
})
const { setSuccess, setError, setUser } = mainSlice.actions;
export default mainSlice.reducer;

export const setSuccessResponse = async (data, dispatch) => {
  try {
    if (data?.statusCode == 200) {
      dispatch(setSuccess(data))
    }
    else {
      dispatch(setError(data))
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