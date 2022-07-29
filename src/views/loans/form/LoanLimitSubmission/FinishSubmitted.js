import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import { PATH_DASHBOARD } from '../../../../navigation/path';
import { store } from '../../../../redux/store';

const FinishSubmitted = () => {

    const navigate = useNavigate();

    const goHome = ()=>{
        navigate(PATH_DASHBOARD)
    }

    return (<>
        <MainCard>
            <div>
                <h3 className='md2-margin-bottom'>Hi {store.getState().login.credential.username}</h3>
                <p>Here is your job number <strong>{store.getState().loan.loanLimitSubmittedRequest?.jobNumber}</strong></p>
                <p>Your Loan Limit Request already submitted</p>
                <p>Notification already sent to our credit analysis team. </p><p>We will inform periodically, or you can Track & Trace by inputting your job number</p>
            </div>
            <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => goHome()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Dashboard</span>
            </Button>
        </div>
        </MainCard>
    </>);
}

export default FinishSubmitted;