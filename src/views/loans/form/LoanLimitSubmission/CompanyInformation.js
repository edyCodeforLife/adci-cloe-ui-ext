import React, { useState, useEffect, useCallback } from 'react';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import { ArrowLeft, ArrowRight } from 'react-feather'
import CustomInformation from './Company-Information.js/CustomInformation';
import FixedInformation from './Company-Information.js/FixedInformation';
import { store } from '../../../../redux/store';
import { convertFormDataToJSON, replaceAll } from '../../../../utility/Utils';
import { LoanService } from '../../../../data/business/loan/loan';
import { find } from 'lodash'

const CompanyInformation = ({ stepper, type, GetMerchantInfofn, onUpdateFD, isLive }) => {
    const _service = new LoanService();
    const [valueInput, setValueInput] = useState({});

    const saveMerchantInfoFc = (form = FormData) => {
        _service.saveMerchantInfo(
            form, {
            Success: (res) => {
                console.log("SAVED SUCCESS");
                GetMerchantInfofn();
                // dispatch(addMerchantBgFile({obj: obj, value: value}))
            }
        }
        )
    }

    const setValueInputFc = useCallback(arg => {
        setValueInput(arg)
    }, [setValueInput]);

    const checkFieldValue = (fieldName) => {
        if(valueInput.hasOwnProperty(replaceAll(fieldName.toLowerCase(), ' ', '-')))
        {
            return valueInput?.[replaceAll(fieldName.toLowerCase(), ' ', '-')]
        }
    }
    //pending
    const handleNextClick = () => {
        let CIdata = store.getState().loan.companyInformation;
        let form;

        CIdata.forEach((val, index) => {
            if (val.active == true) {
                form = new FormData();
                form.set('loanLimitRequestId', store.getState().loan.loanLimitRequestId)
                form.set('merchantInfoId', val?.id)
                form.set('fieldName', val?.fieldName)
                form.set('fieldValue', valueInput[val?.id] == undefined ?
                    checkFieldValue(val?.fieldName)
                    : valueInput[val?.id])
                form.set('position', val?.position)
                form.set("active", val?.active)
                saveMerchantInfoFc(form);
                // console.log("alert==>"+JSON.stringify(convertFormDataToJSON(form)));
            }
        })

        Promise.all(CIdata).then((results) => {
            onUpdateFD(true)
            stepper.next();
        })
    }

    return (<>
        <FixedInformation saveMerchantInfoFc={saveMerchantInfoFc} isLive={isLive} type="fxd-inf-comp" valueInput={valueInput} setValueInputFc={setValueInputFc} />
        <CustomInformation saveMerchantInfoFc={saveMerchantInfoFc} />
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
            <Button color='primary' className='btn-next' onClick={() => handleNextClick()}>
                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
        </div>
    </>);
}

export default CompanyInformation;