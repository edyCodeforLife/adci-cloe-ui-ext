import React, { useState, useEffect } from 'react';
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import { ArrowLeft, ArrowRight } from 'react-feather'
import LaporanKeuangan from './Financial-Document/LaporanKeuangan';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import { store } from '../../../../redux/store';
import { LoanService } from '../../../../data/business/loan/loan';
import { setCreditAmountLimit, setMerchantDocument } from '../../../../redux/loan';
import { useDispatch } from 'react-redux';
import { filteringArrayByKey, searchKeyObjectInArray } from '../../../../utility/Utils';

const FinancialDocuments = ({ llrd, stepper, type, handleNext, handleUpload, setUploaded, showUploadFile, isLive }) => {
    const _service = new LoanService();
    const [updated, setUpdate] = useState(false);
    const dispatch = useDispatch();

    const handleNextButton = () => {
        const form = new FormData
        form.set('merchantDocumentId', store.getState().loan.creditLimitAmount?.id == undefined ? '' : store.getState().loan.creditLimitAmount?.id);
        form.set('loanLimitRequestId', store.getState().loan.loanLimitRequestId ==undefined? '' : store.getState().loan.loanLimitRequestId);
        form.set('documentGroup', "Pengajuan Credit Limit");
        form.set('documentName', store.getState().loan.creditLimitAmount?.value=="undefined"? 
        0 : store.getState().loan.creditLimitAmount?.value
        );
        form.set('active', true)

        handleAddForm(form);

        handleNext(true);
        stepper.next();
    }

    const handleAddForm = (form = FormData) => {
        _service.saveMerchantDocument(
            form, {
            Success: (res) => {
                console.log("Saved Financial Doc")
                setUpdate(true);
            }
        }
        )
    }

    useEffect(() => {
        if (updated) {
            // console.log("masuk sini"+store.getState().loan.loanLimitRequestId)
            _service.getMerchantDocument(
                {
                    "loanLimitRequestId": store.getState().loan.loanLimitRequestId
                },
                {
                    Success: (res) => {
                        // alert("ahah"+JSON.stringify(res.data))
                        dispatch(setMerchantDocument(res.data))
                        let datad = filteringArrayByKey(res.data, "documentGroup", "Pengajuan Credit Limit");
                        dispatch(setCreditAmountLimit({ value: datad[0]?.documentName, id: datad[0]?.id }))                       
                    },
                    Errors: (res)=>{
                       
                    }
                }
            );
            setUpdate(false)
        }
    }, [updated])

    useEffect(() => {
        // dispatch(setMerchantDocument(store.getState().summary.financialDocument))
        setUpdate(true);
    }, [store.getState().summary.financialDocument])

    useEffect(() => {
        // dispatch(setMerchantDocument(store.getState().summary.financialDocument))
        setUpdate(true);
    }, [isLive])


    return (<>
        <LaporanKeuangan updated={updated} handleUpload={handleUpload} handleAddForm={handleAddForm} showUploadFile={showUploadFile} />
        <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-next' onClick={() => handleNextButton()}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
}

export default FinancialDocuments;