import mainReducer from "./Reducer/mainReducer";
import { configureStore } from "@reduxjs/toolkit"
import voucherReducer from "./Reducer/voucherReducer";

const store = configureStore({
  reducer:{
    main:mainReducer,
    voucher:voucherReducer
  }
})
export default store