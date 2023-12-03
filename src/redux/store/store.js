import { configureStore } from '@reduxjs/toolkit'
import dataSlice from '../reducer/createSlice';
import createSliceProducts from '../reducer/createSliceProducts';
 const store = configureStore({
  reducer: {
    data : dataSlice,
    cart : createSliceProducts,
  },
})

export default store;

