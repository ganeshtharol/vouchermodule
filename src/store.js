import mainReducer from "./Reducer/mainReducer";
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer:{
    main:mainReducer
  }
})
export default store