import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import messageSlice from './messageSlice'
 const store = configureStore({
  reducer: {
    auth : authSlice,
    messages : messageSlice
  },
})


export default store
