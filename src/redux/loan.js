// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  companyBg: {
  },
  lookupType: {
    "city": [],
    "state": [],
    "country": [],
    "business-line": [],
    "business-area-coverage": []
  },
  COMPANY_DOC_AKTA_PP: [],
  COMPANY_DOC_KEMENKUMHAM: [],
  COMPANY_DOC_BACKGROUND: [],
  merchantBgFile: [],
  merchantStructure: [],
  companyInformation: [],
  merchantDocument: [],
  companyType: "",
  incompleteDataList: [],

  loanLimitRequestId: "",

  loanLimitSubmittedRequest: {},
  creditLimitAmount: {},
}

export const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    setLoan: (state, action) => {
      state.companyBg[action.payload.name] = action.payload?.val
    },
    setLoanData: (state, action) => {
      state.companyBg = Object.assign(state.companyBg, action.payload)
    },
    setLookupData: (state, action) => {
      state.lookupType[action.payload.type] = action.payload?.value;
    },
    setDocument: (state, action) => {
      state[action.payload.name] = action.payload.value
    },
    setMerchantBgFile: (state, action) => {
      state.action = action.payload;
    },
    addNewCompanyInformation: (state, action) => {
      state.companyInformation = [...state.companyInformation, action.payload];
    },
    addCompanyInformation: (state, action)=>{
      //replace full content
      state.companyInformation = action.payload.slice(0);
    },
    addMerchantBgFile: (state, action) => {
      state.merchantBgFile = [...action.payload];
    },
    addMerchantStructure: (state, action) => {
      state.merchantStructure = [...action.payload]
    },
    setCompanyType: (state, action) => {
      state.companyType = action.payload
    },
    setIncompleteDataList: (state, action) => {
      state.incompleteDataList = [...action.payload]
    },
    setMerchantDocument: (state, action) => {
      state.merchantDocument = [...action.payload]
    },
    setLoanLimitRequestID: (state, action) => {
      state.loanLimitRequestId = action.payload
    },
    setCreditAmountLimit: (state, action) => {
      state.creditLimitAmount = Object.assign(state.creditLimitAmount, action.payload)
    },
    setLoanLimitSubmittedRequest: (state, action) => {
      state.loanLimitSubmittedRequest = Object.assign(state.loanLimitSubmittedRequest, action.payload);
    },
    resetLoanData: (state) => {
      Object.assign(state, initialState)
    }
  }
})

export const { setLoan, setDocument, setMerchantBgFile, setLookupData, 
        addNewCompanyInformation, addMerchantBgFile,
      addMerchantStructure, setCompanyType, setIncompleteDataList,
      setMerchantDocument, setLoanLimitRequestID, addCompanyInformation,
      setCreditAmountLimit, setLoanData, setLoanLimitSubmittedRequest, resetLoanData
      } = loanSlice.actions

export default loanSlice.reducer
