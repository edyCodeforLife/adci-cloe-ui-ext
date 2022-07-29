import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap'
import { ArrowLeft, ArrowRight } from 'react-feather';
import CompanyPT from './CompanyPT';
import CompanyCV from './CompanyCV';
import Individual from './Individual';
import { LoanService } from '../../../../../data/business/loan/loan';
import { useDispatch, useSelector } from 'react-redux';
import { COMPANY_CV, COMPANY_PT, INDIVIDUAL, SHAREHOLDER_STRUCTURE } from '../../../../../utility/Constants';
import { addMerchantStructure } from '../../../../../redux/loan';
import { store } from '../../../../../redux/store';

const CompanyStructure = ({ stepper, type, showUploadFile, handleUpload, setUploaded, onUpdateCI }) => {
    const _service = new LoanService()
    const dispatch = useDispatch();
    const CompanyStructureData = store.getState().loan.merchantStructure;
    const companyType = useSelector(state => state.loan.companyType);
    const [updated, setUpdate] = useState(false);

    const handleAdd = (form = FormData) => {
        _service.saveMerchantStructure(form, {
            Success: (res) => {
                console.log("Sukses Add Company Structure");
                setUpdate(true);
            }
        })
    }

    useEffect(() => {
        if (updated) {
            _service.getStructureByLoanLimitID({
                'loanLimitRequestId': store.getState().loan.loanLimitRequestId
            },
                {
                    Success: (res) => {
                        dispatch(addMerchantStructure(res.data))
                        setUpdate(false);
                    }
                }
            )
        }
    })

    useEffect(() => {
        dispatch(addMerchantStructure(store.getState().summary.companyBackgroundStructure))
        setUpdate(true);
    }, [store.getState().summary.companyBackgroundStructure])


    function switchView() {
        switch ("PT") {
            // switch ("CV") {
            case COMPANY_PT:
                return <CompanyPT structureData={CompanyStructureData} handleAdd={handleAdd} showUploadFile={showUploadFile} handleUpload={handleUpload} />
            case COMPANY_CV:
                return <CompanyCV structureData={CompanyStructureData}  handleAdd={handleAdd} type="company-cv" showUploadFile={showUploadFile} handleUpload={handleUpload} />
            default:
                return <Individual structureData={CompanyStructureData}  handleAdd={handleAdd} showUploadFile={showUploadFile} handleUpload={handleUpload} />
        }
    }

    const handleNext = () => {
        onUpdateCI(true);
        stepper.next()
    }

    return (<>
        {switchView()}
        {/* below button */}
        <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button color='primary' className='btn-next' onClick={() => handleNext()}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
}

export default CompanyStructure;