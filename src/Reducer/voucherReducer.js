import { createSlice } from "@reduxjs/toolkit";
import { CommonApi } from "../Services/Actions";
import { setError, setSuccess } from "./mainReducer";

const voucherSlice = createSlice({
  name: "voucherSlice",
  initialState: {
    voucherlist:null
  },
  reducers: {
    setVoucherList: (state, action) => {
      state.voucherlist = action.payload
    }
  }
})
export const { setVoucherList } = voucherSlice.actions;
export default voucherSlice.reducer;

export const getVoucherListResponse = (url) => async (dispatch) => {
  try {
    console.log(url);
    let res = await CommonApi({}, url)
    if (res?.status === 200) {
      dispatch(setSuccess(res.data));
      dispatch(setVoucherList(res.data.data));
    }
    else {
      dispatch(setError(res?.response?.data))
    }
  } catch (error) {
    dispatch(setError(error))
  }
}

