// employeeSlice.js
import { createSlice } from '@reduxjs/toolkit';


const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employeeData: [],

  },
  reducers: {
    addEmployeeData: (state, action) => {
      state.employeeData.push(action.payload);
    }
  },
});

export const { addEmployeeData } = employeeSlice.actions;
export default employeeSlice.reducer;
