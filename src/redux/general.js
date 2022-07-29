// ** Redux Imports
import { createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  readOnly: false,
  dashboardData: {},
  language: "ID"
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setReadOnly: (state, action)=>{
      state.readOnly = action.payload
    },
    setDashboardData: (state, action)=>{
      state.dashboardData = Object.assign(state.dashboardData, action.payload)
    },
    setLanguage: (state, action)=>{
      state.language = action.payload;
    },
    resetGeneral: (state)=>{
      Object.assign(state, initialState)
    }
  }
})

export const { setLoading, setReadOnly, setDashboardData, setLanguage, resetGeneral } = generalSlice.actions

export default generalSlice.reducer
