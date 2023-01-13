import mainReducer from "./Reducer/mainReducer";
import { configureStore } from "@reduxjs/toolkit"
import voucherReducer from "./Reducer/voucherReducer";
import orderReducer from "./Reducer/orderReducer";

const store = configureStore({
  reducer:{
    main:mainReducer,
    voucher:voucherReducer,
    order:orderReducer
  }
})
export default store