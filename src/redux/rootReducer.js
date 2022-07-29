// ** Reducers Imports
import layout from './layout'
import navbar from './navbar'
import general from './general'
import loan from './loan'
import login from './login'
import myLoan from './myLoan'
import upload from './upload'
import summary from './summary'
import { combineReducers } from "redux";

const rootReducer = combineReducers({ navbar, layout, general, loan, login, myLoan, upload, summary })

export default rootReducer
