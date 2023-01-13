import { createSlice } from "@reduxjs/toolkit";
import { CommonApi } from "../Services/Actions";
import { setError, setSuccess } from "./mainReducer";

const voucherSlice = createSlice({
  name: "voucherSlice",
  initialState: {
    voucherlist:null,
    currentVoucher:null
  },
  reducers: {
    setVoucherList: (state, action) => {
      state.voucherlist = action.payload
    },
    setCurrentVoucher: (state, action) => {
      state.currentVoucher = action.payload
    }
  }
})
export const { setVoucherList,setCurrentVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;

export const getVoucherListResponse = (body,url) => async (dispatch) => {
  try {
    let res = await CommonApi(body, url)
    if (res?.status === 200) {
      dispatch(setVoucherList(res.data.data));
    }
    else {
      dispatch(setError(res?.response?.data))
    }
  } catch (error) {
    dispatch(setError(error))
  }
}

export const getVoucherResponse = (body,url) => async (dispatch) => {
  try {
    console.log(url);
    let res = await CommonApi(body, url)
    if (res?.status === 200) {
      dispatch(setCurrentVoucher(res.data.data));
    }
    else {
      dispatch(setError(res?.response?.data))
    }
  } catch (error) {
    dispatch(setError(error))
  }
}

export const setCheckout = (body, url) => async (dispatch) => {
  try {
    let res = await CommonApi(body, url)
    if (res?.status === 200) {
      dispatch(setSuccess(res.data));
    }
    else {
      dispatch(setError(res?.response?.data))
    }
  } catch (error) {
    dispatch(setError(error))
  }
}

