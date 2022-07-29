// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  submittedLoanRequest: []
}

export const MyLoanSlice = createSlice({
  name: 'myLoan',
  initialState,
  reducers: {
    setSubmittedLoanRequest: (state, action) => {
      state.submittedLoanRequest = [...action.payload]
    },
    resetMyLoanData:(state)=>{
      Object.assign(state, initialState)
    }
  },
  
})

export const { setSubmittedLoanRequest, resetMyLoanData} = MyLoanSlice.actions

export default MyLoanSlice.reducer
