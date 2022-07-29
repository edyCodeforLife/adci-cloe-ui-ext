import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Button } from 'reactstrap'
import MainCard from '@layouts/components/custom/MainCard';
import InputCompany from './Company-Background/InputCompany';
import { useDispatch, useSelector } from 'react-redux';
import { LoanService } from '../../../../data/business/loan/loan';
import { appendUrl, convertFormDataToJSON, convertJSONToFormData, createNewArrayOfObjectWithSpecificKeys, searchKeyObjectInArray } from '../../../../utility/Utils';
import { setLoanLimitRequestID } from '../../../../redux/loan';
import { store } from '../../../../redux/store';
import { resetUploadData } from '../../../../redux/upload';
import { SwalError } from '../../../../utility/layouts';

const CompanyBackground = ({ stepper, type, showUploadFile, handleUpload, setUploaded, llrd }) => {
    const dispatch = useDispatch();
    const companyBg = useSelector(state => state.loan.companyBg);
    const getData = useSelector(state => state.summary.companyBackground);
    const _service = new LoanService();
    const [baCoverage, setBaCoverage] = useState([]);

    const setBACoverageFnc = useCallback(arg => {
        setBaCoverage(arg)
    }, [baCoverage]);

    const hitService = () => {
        const form = new FormData();
        form.set('loanLimitRequestId', llrd?.loanLimitRequestId == undefined ? '' : llrd?.loanLimitRequestId);
        form.set('merchantDataId', companyBg['id'] == undefined ? '' : companyBg['id']);
        form.set('customerId', store.getState().login.credential?.["customerId"]);//companyBg['customerId']);
        form.set('name', companyBg?.['name']);
        form.set('email', companyBg?.['email']);
        form.set('phone', companyBg?.['phone']);
        form.set('address', companyBg?.['address']);
        form.set('city', companyBg?.['city']);
        form.set('country', companyBg?.['country']);
        form.set('province', companyBg?.['province']);
        form.set('postalCode', companyBg?.['postalCode']);
        form.set('ktpNo', companyBg?.['ktpNo']);
        form.set('npwpNo', companyBg?.['npwpNo']);
        form.set('nibNo', companyBg?.['nibNo']);
        form.set('product', companyBg?.['product']);
        form.set('businessLine', companyBg?.['businessLine'] == undefined ? '' : companyBg?.['businessLine']);
        let ktpFile = searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", "ktpFile")?.["fileUrl"];
        if (ktpFile != undefined)
            form.set('ktpUrl', appendUrl(ktpFile));

        let nepe = searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", "npwpFile")?.["fileUrl"];
        if (nepe != undefined)
            form.set('npwpUrl', appendUrl(nepe));

        let nibFile = searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", "nibFile")?.["fileUrl"];
        if (nibFile != undefined)
            form.set('nibUrl', appendUrl(nibFile));
        let jsonConverted = convertFormDataToJSON(form);
        // let _baCoverage = createNewArrayOfObjectWithSpecificKeys(baCoverage, ['value'])
        // console.log(companyBg?.['businessAreaCoverage']);
        let bac = {
            'businessAreaCoverage': companyBg?.['businessAreaCoverage'] != undefined ? companyBg?.['businessAreaCoverage'] : []
        }
        jsonConverted = { ...jsonConverted, ...bac }

        // form.set('businessAreaCoverage', companyBg?.['businessAreaCoverage'] == undefined ? ['data', 'aceh'] : companyBg?.['businessAreaCoverage']);

        // companyBg
        _service.SaveLoanLimit(jsonConverted,
            {
                Success: (res) => {
                    if (store.getState().loan.loanLimitRequestId == "") {
                        dispatch(setLoanLimitRequestID(res?.data?.id))
                        setUploaded(res?.data?.id)
                        dispatch(resetUploadData())
                    }
                    stepper.next()
                },
                Errors: (status, res)=>{
                    SwalError("Fail To Proceed", status+" | "+res?.error)
                }
            }
        );
    }

    return (<>
        <MainCard>
            <InputCompany type="company-background" baCoverage={baCoverage} setBACoverageFnc={setBACoverageFnc} showUploadFile={showUploadFile} handleUpload={handleUpload} setUploaded={setUploaded} />
        </MainCard>
        {/* 1 */}
        {/* below button */}
        <div className='d-flex justify-content-between'>
            <Button color='secondary' className='btn-prev' outline disabled>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            {/* <Button color='primary' className='btn-next' onClick={()=>hitService()}>
                <span className='align-middle d-sm-inline-block d-none'>Save as Draft</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button> */}
            <Button color='primary' className='btn-next' onClick={() => hitService()}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
}

export default CompanyBackground;