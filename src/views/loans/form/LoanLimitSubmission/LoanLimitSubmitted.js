import React, { useState, useEffect } from 'react';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useNavigate } from 'react-router-dom';
import { PATH_LOAN_SUBMIT } from '../../../../navigation/path';
import { LoanService } from '../../../../data/business/loan/loan';
import ConfirmedCompanyBackground from './Loan-Limit-Submitted/ConfirmedCompanyBackground';
import ConfirmedCompanyStructures from './Loan-Limit-Submitted/ConfirmedCompanyStructures';
import ConfirmedCompanyInformation from './Loan-Limit-Submitted/ConfirmedCompanyInformation';
import ConfirmedCompanyDocument from './Loan-Limit-Submitted/ConfirmedCompanyDocument';
import ConfirmedCompanyFinancialDoc from './Loan-Limit-Submitted/ConfirmedCompanyFinancialDoc';
import { useDispatch, useSelector } from 'react-redux';
import { MyLoanService } from '../../../../data/business';
import { store } from '../../../../redux/store';
import { setLoanLimitSubmittedRequest } from '../../../../redux/loan';

const data = [
    "Name", "Head Office Address", "Brand", "Business Line", "Area", "BD PIC"
]

const LoanLimitSubmitted = ({ stepper, type }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const _service = new MyLoanService();
    const loanLimitId = useSelector(state => state.loan.loanLimitRequestId)

    const handleNext = () => {
        let payload = {
            'loanLimitRequestId': loanLimitId
        }
        _service.SubmitLoanLimitRequest(payload, {
            Success: (res) => {
                dispatch(setLoanLimitSubmittedRequest(res?.data))
                navigate(PATH_LOAN_SUBMIT)
            }
        });
    }

    return (<>
        <h4 className='mb-1'>Summary of Input</h4>
        <ConfirmedCompanyBackground />
        <ConfirmedCompanyDocument />
        <ConfirmedCompanyStructures />
        <ConfirmedCompanyInformation />
        <ConfirmedCompanyFinancialDoc />
        <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-next' onClick={() => handleNext()}>
                <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
}

export default LoanLimitSubmitted;