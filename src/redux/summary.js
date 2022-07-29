// ** Redux Imports
import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  companyBackground: {},
  profileList: {},
  companyDocument: [],
  companyBackgroundStructure: [],
  companyInformation: [],
  financialDocument: []
}

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    setCompanyBackgroundList: (state, action) => {
      state.companyBackground = action.payload
    },
    setCompanyBackgroundDocumentList: (state, action) => {
      state.companyDocument = action.payload
    },
    setCompanyBackgroundStructureList: (state, action) => {
      state.companyBackgroundStructure = action.payload
    },
    setCompanyInformationList: (state, action) => {
      state.companyInformation = action.payload
    },
    setCompanyFinancialDocList: (state, action) => {
      state.financialDocument = action.payload
    },
    setProfileList: (state, action)=>{
      state.profileList = action.payload
    },
    resetSummaryData: (state)=>{      
      Object.assign(state, initialState)
    }
  }
})

export const { setCompanyBackgroundDocumentList, setCompanyBackgroundStructureList, setCompanyBackgroundList,
  setCompanyInformationList, setCompanyFinancialDocList, resetSummaryData, setProfileList
} = summarySlice.actions

export default summarySlice.reducer
