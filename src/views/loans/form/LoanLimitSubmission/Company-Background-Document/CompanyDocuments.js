import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MainCard from '@layouts/components/custom/MainCard';
import Select from 'react-select';
import { ArrowLeft, ArrowRight } from 'react-feather'
import { selectThemeColors } from '@utils'
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../../redux/store';
import { LoanService } from '../../../../../data/business/loan/loan';
import { addMerchantBgFile, setCompanyType } from '../../../../../redux/loan';
import { TableCD } from './TableCompanyDocuments';
import DocumentAkta from './DocumentAkta';
import DocumentKemenkunham from './DocumentKemenkunham';
import DocumentBackground from './DocumentBackground';
import { resetUploadData } from '../../../../../redux/upload';
import toast from 'react-hot-toast';
import ToastContent from '../../../../../@core/layouts/components/custom/Toast/ToastContent';
import { CustomServiceToast } from '../../../../../utility/layouts';
import { ERROR_WARN, SUCCESS_WARN } from '../../../../../utility/Constants';

// function convert(data) {
//     const newObj = data?.map(({ code: value, name: label, ...rest
//     }) => ({
//         value,
//         label,
//         ...rest
//     }));

//     return newObj;
// }

const TitleGroup = [
    "Akta Pendirian dan Perubahan Terakhir",
    "Pengesahan Kemenkumham",
    "Company Background Document"
]

const CompanyDocuments = ({ showUploadFile, stepper, handleUpload, deleteUploaded }) => {
    const MerchantBgFile = useSelector(state => state.loan.merchantBgFile);
    const dispatch = useDispatch();
    const _service = new LoanService();
    const [updated, setUpdate] = useState(false)

    const tableStyle = {
        height: MerchantBgFile == "" ? '0px' : '250px',
        overflow: 'scroll'
    }

    const handleAdd = (formData = FormData) => {
        _service.SaveMerchantBackgroundFile(
            formData, {
            Success: (res) => {
                console.log("SAVED");
                // dispatch(addMerchantBgFile(res.data))
                CustomServiceToast(SUCCESS_WARN, 'Data Saved Successfully',true)
                setUpdate(true)
            },
            Errors: (status, res) => {
                CustomServiceToast(ERROR_WARN, JSON.stringify(res))     
            }
        }
        )
    };

    const handleNext = () => {
        _service.getCompanyType(
            {
                "loanLimitRequestId": store.getState().loan.loanLimitRequestId
            }, {
            Success: (res) => {
                dispatch(setCompanyType(res.data))
                dispatch(resetUploadData())
                stepper.next();
            }
        })
    }

    useEffect(() => {
        // let idea = 'd57c4ab0-cf57-4436-a14d-59d85709eafe';
        if (updated) {
            _service.getMerchantBackgroundFile(
                {
                    "loanLimitRequestId": store.getState().loan.loanLimitRequestId
                },
                {
                    Success: (res) => {
                        dispatch(addMerchantBgFile(res.data))
                    }
                }
            );
            setUpdate(false)
        }
    })

    useEffect(() => {
        dispatch(addMerchantBgFile(store.getState().summary.companyDocument))
        setUpdate(true);
    }, [store.getState().summary.companyDocument])

    return (<>
        <MainCard styled={tableStyle}>
            <TableCD contents={MerchantBgFile} handleTrash={handleAdd} />
        </MainCard>
        <MainCard title={TitleGroup[0]} actions='collapse'>
            <DocumentAkta title={TitleGroup[0]} handleAdd={handleAdd} showUploadFile={showUploadFile} handleUpload={handleUpload} />
        </MainCard>
        {/* 2 */}
        <MainCard title={TitleGroup[1]} actions='collapse'>
            <DocumentKemenkunham title={TitleGroup[1]} handleAdd={handleAdd} showUploadFile={showUploadFile} handleUpload={handleUpload} />
        </MainCard>
        {/* 3 */}
        <MainCard title={TitleGroup[2]} actions='collapse'>
            <DocumentBackground title={TitleGroup[2]} handleAdd={handleAdd} showUploadFile={showUploadFile} handleUpload={handleUpload} />
        </MainCard>

        {/* below button */}
        <div className='d-flex justify-content-between'>
            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            {/* <Button color='primary' className='btn-next' onClick={() => stepper.next()}>
                <span className='align-middle d-sm-inline-block d-none'>Save as Draft</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button> */}
            <Button color='primary' className='btn-next' onClick={() => handleNext()}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
}

export default CompanyDocuments;