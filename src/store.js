
import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './employeeSlice';

// Create and export the Redux store
const store = configureStore({
  reducer: {
    employeeSlice,
  },
});

export default store;
