import React, { useEffect } from 'react'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import Divider from '../../../@core/layouts/components/custom/Divider/Divider'
import MainCard from '../../../@core/layouts/components/custom/MainCard'
import { LoanService } from '../../../data/business'
import { setCompanyBackgroundDocumentList, setCompanyBackgroundList, setCompanyBackgroundStructureList, setCompanyFinancialDocList, setCompanyInformationList } from '../../../redux/summary'
import { STATUS_APPROVED_BY_ALL_COMMITTE, STATUS_CUSTOMER_APPROVE_LOAN_LIMIT } from '../../../utility/Constants'
import { QrsToObj } from '../../../utility/Utils'
import ConfirmedCompanyBackground from '../form/LoanLimitSubmission/Loan-Limit-Submitted/ConfirmedCompanyBackground'
import ConfirmedCompanyDocument from '../form/LoanLimitSubmission/Loan-Limit-Submitted/ConfirmedCompanyDocument'
import ConfirmedCompanyFinancialDoc from '../form/LoanLimitSubmission/Loan-Limit-Submitted/ConfirmedCompanyFinancialDoc'
import ConfirmedCompanyInformation from '../form/LoanLimitSubmission/Loan-Limit-Submitted/ConfirmedCompanyInformation'
import ConfirmedCompanyStructures from '../form/LoanLimitSubmission/Loan-Limit-Submitted/ConfirmedCompanyStructures'
import OfferingLoan from './OfferingLoan'
import AcceptApproval from './OfferingLoan/AcceptProposal'

const DataDisplay = ({ isNav, setNavData, dataChoose }) => {
    const dispatch = useDispatch();
    const qrs = QrsToObj(window.location.search);
    let llrd = {
        "loanLimitRequestId": qrs?.id
    }

    const _loanService = new LoanService();
    //serviceGet
    const getMerchantDataByLoanLimitRequest = () => {
        _loanService.getMerchantDataByLoanLimitRequest(llrd, {
            Success: (res) => {
                dispatch(setCompanyBackgroundList(res.data))
            }
        });
    }

    const getMerchantBackgroundFilefn = () => {
        _loanService.getMerchantBackgroundFile(llrd, {
            Success: (res) => {
                dispatch(setCompanyBackgroundDocumentList(res.data))
            }
        });
    }
    const getStructureByLoanLimitIDfn = () => {
        _loanService.getStructureByLoanLimitID(llrd, {
            Success: (res) => {
                dispatch(setCompanyBackgroundStructureList(res.data))
            }
        });
    }
    const getMerchantInfofn = () => {
        _loanService.getMerchantInfo(llrd, {
            Success: (res) => {
                dispatch(setCompanyInformationList(res.data))
            }
        });
    }
    const getMerhantDocumentfn = () => {
        _loanService.getMerchantDocument(llrd, {
            Success: (res) => {
                dispatch(setCompanyFinancialDocList(res.data))
            }
        });
    }

    useEffect(() => {
        if (isNav) {
            getMerchantDataByLoanLimitRequest();
            getMerchantBackgroundFilefn();
            getStructureByLoanLimitIDfn();
            getMerchantInfofn();
            getMerhantDocumentfn();
            setNavData(false)
        }
    }, [isNav]);

    return <>

        {
            dataChoose?.status == STATUS_APPROVED_BY_ALL_COMMITTE ?
                <OfferingLoan data={dataChoose} /> : null
        }
        {
            dataChoose?.status == STATUS_CUSTOMER_APPROVE_LOAN_LIMIT ?
                <AcceptApproval data={dataChoose} /> : null
        }
        <MainCard title={"Summary of Data"} actions='collapse'>
            <ConfirmedCompanyBackground />
            <Divider />
            <ConfirmedCompanyDocument />
            <Divider />
            <ConfirmedCompanyStructures />
            <Divider />
            <ConfirmedCompanyInformation />
            <Divider />
            <ConfirmedCompanyFinancialDoc />
        </MainCard>
    </>
}

export default DataDisplay