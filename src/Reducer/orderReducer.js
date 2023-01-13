import { createSlice } from "@reduxjs/toolkit";
import { CommonApi } from "../Services/Actions";
import { setError, setSuccess } from "./mainReducer";

const orderSlice = createSlice({
  name: "voucherSlice",
  initialState: {
    orderList:[],
  },
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload
    }
  }
})
export const { setOrderList } = orderSlice.actions;
export default orderSlice.reducer;

export const getOrderListResponse = (body,url) => async (dispatch) => {
  try {
    let res = await CommonApi(body, url)
    if (res?.status === 200) {
      dispatch(setOrderList(res.data.data));
    }
    else {
      dispatch(setError(res?.response?.data))
    }
  } catch (error) {
    dispatch(setError(error))
  }
}


