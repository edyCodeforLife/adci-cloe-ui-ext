import React from 'react'
import {  resetLoanData, setLoanLimitRequestID } from '../../../../redux/loan';
import Breadcrumbs from '@components/breadcrumbs'
import { PG_LOAN_LIMIT_REQ } from '../../../../utility/Constants';
import MainCard from '@core/layouts/components/custom/MainCard';
import TableStatus from '@core/layouts/components/custom/Table/TableStatus';
import { useDispatch, useSelector } from 'react-redux';
import { LoanService } from '../../../../data/business/loan/loan';
import { useNavigate } from 'react-router-dom';
import { PATH_FORM_LOAN_LIMIT_REQ } from '../../../../navigation/path';
import { Button } from 'reactstrap';
import { ArrowRight } from 'react-feather';
import { resetUploadData } from '../../../../redux/upload';
import { resetSummaryData, setProfileList } from '../../../../redux/summary';
import { CustomTable } from '../../../../@core/layouts/components/custom/Table/CustomTable';
import { store } from '../../../../redux/store';

const IncompleteSubmission = ({ Data }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirectTo = (IdPassed) => {
        dispatch(setLoanLimitRequestID(IdPassed))
        navigate(PATH_FORM_LOAN_LIMIT_REQ + '?id=' + IdPassed)
    }    

    const handleNew = () => {        
        // resetAllData();
        dispatch(setProfileList(store.getState().login.credential));
        navigate(PATH_FORM_LOAN_LIMIT_REQ)
    }

    const configTable = {
		title: ["No", "Transaction ID", "Company Name", "User", "Created Date", "Last Update", "Status"],
		data: Data
	}

    return (<>
        <Breadcrumbs title={PG_LOAN_LIMIT_REQ} data={[{ title: 'Loan' }, { title: PG_LOAN_LIMIT_REQ }]} />
        <MainCard>
            {/* <TableStatus Data={Data} handleClick={handleClick} /> */}
            <CustomTable
				striped
				configTable={configTable}
				redirectTo={redirectTo}
                companyName={true}
			/>
            <div className='d-flex justify-content-between'>
                <Button color='primary' className='btn-next right-float margin-top-small'
                    onClick={() => handleNew()}
                >
                    <span className='align-middle d-sm-inline-block d-none'>Create New</span>
                    <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                </Button>
            </div>
        </MainCard>
    </>
    )
}

export default IncompleteSubmission