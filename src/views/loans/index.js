import React, { useState, useEffect } from 'react';
import LoanLimitSubmission from './LoanLimitSubmission';
import "../../@core/scss/react/custom/customer-registration.scss";
import OfferingLoan from './MyLoanRequest/OfferingLoan';
import IncompleteSubmission from './form/Incomplete';
import { useDispatch, useSelector } from 'react-redux';
import { LoanService } from '../../data/business/loan/loan';
import { resetLoanData, setIncompleteDataList } from '../../redux/loan';
import { store } from '../../redux/store';
import { resetSummaryData } from '../../redux/summary';
import { resetUploadData } from '../../redux/upload';
import { resetGeneral } from '../../redux/general';

const LoanLimitRequest = () => {
  const incompleteDataList = useSelector(state => state.loan.incompleteDataList)
  const _service = new LoanService();
  const dispatch = useDispatch();

  const resetAllData = () => {
    dispatch(resetLoanData())
    dispatch(resetSummaryData())
    dispatch(resetUploadData())
    dispatch(resetGeneral())
  }

  useEffect(() => {
    resetAllData();
  }, [])
  

  useEffect(() => {
    _service.getIncompleteLoanLimitRequestByCustomerID(
      {
        'customerId': store.getState().login.credential.customerId,
        'offset': 0,
        'limit' : 10
      }
      , {
        Success: (res) => {
          dispatch(setIncompleteDataList(res.data));
        }
      })
  }, [])

  return (<>
    {
      incompleteDataList == "" ?
        <LoanLimitSubmission /> : <IncompleteSubmission Data={incompleteDataList} />
    }
  </>);
}

export default LoanLimitRequest;