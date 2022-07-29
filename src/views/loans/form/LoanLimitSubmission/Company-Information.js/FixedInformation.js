import { locales } from 'moment';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import MainCard from '../../../../../@core/layouts/components/custom/MainCard';
import { convertJSONToFormData, filterValue, replaceAll } from '../../../../../utility/Utils';
import TextInput from '../../../../../@core/components/textinput/';
import { addCompanyInformation } from '../../../../../redux/loan';
import CompanyInformationData from '../../../../../constants/loan/CompanyInformation-data.json';
import { Trash2 } from 'react-feather';
import { store } from '../../../../../redux/store';
import { LoanService } from '../../../../../data/business';

const numberedInput = [
    "Sales Per Month"
]

const FixedInformation = ({ type, saveMerchantInfoFc, valueInput, setValueInputFc, isLive }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.loan.companyInformation);
    const _service = new LoanService();
    const dataList = useSelector(state => state.summary.companyInformation);

    const handleChangeText = (e) => {
        if (e?.target) {
            const { name, value } = e?.target;
            setValueInputFc(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            // console.log("JSON." + JSON.stringify(e))
            setValueInputFc(prevState => ({
                ...prevState,
                [e.name]: e.value
            }));
        }
    }

    // { console.log("===>" + JSON.stringify(valueInput)) }

    const deleteField = (val) => {
        let form = new FormData();
        form.set('loanLimitRequestId', store.getState().loan.loanLimitRequestId)
        form.set('merchantInfoId', val?.id)
        form.set('fieldName', val?.fieldName)
        form.set('fieldValue', val?.fieldValue)
        form.set('position', val?.position)
        form.set("active", false)

        saveMerchantInfoFc(form)
    }

    // { console.log("isi dataLiost" + JSON.stringify(dataList) + "--" + dataList.length) }
    // { console.log("isi dataLiost" + JSON.stringify(valueInput)) }

    useEffect(() => {
        if (isLive) {
            if (dataList?.length <= 0) {
                CompanyInformationData.forEach((val, index) => {
                    _service.saveMerchantInfo(convertJSONToFormData({
                        "id": "",
                        "loanLimitRequestId": store.getState().loan.loanLimitRequestId,
                        "fieldName": val?.fieldName,
                        "fieldValue": val?.fieldValue,
                        "active": true,
                        "position": val?.position
                    }), {
                        Success: (res) => {
                            console.log("SAVED SUCCESS");
                            // dispatch(addMerchantBgFile({obj: obj, value: value}))
                        }
                    })
                })
                dispatch(addCompanyInformation(CompanyInformationData))
            } else {
                dispatch(addCompanyInformation(dataList))
            }
        }
    }, [dataList, isLive])


    // useEffect(() => {
    //     dispatch(addMerchantStructure(store.getState().summary.companyBackgroundStructure))
    //     setUpdate(true);
    // }, [store.getState().summary.companyBackgroundStructure])

    return (<>
        <MainCard>
            <div className='content-header'>
                <h5 className='mb-0'>Information</h5>
                <small className='text-muted'>Company</small>
            </div>
            <Form onSubmit={e => e.preventDefault()}>
                {
                    data.map((val, index) => {
                        return (
                            <Row>
                                {
                                    val?.active == true ?
                                        <Col md='10' className='mb-1 inline-flex'>
                                            <Label md='4' className='form-label' for={replaceAll(val.fieldName.toLowerCase(), ' ', '-')}>
                                                {val?.fieldName}
                                            </Label>                                            
                                            {
                                                filterValue(numberedInput, val.fieldName) ?
                                                    <TextInput
                                                        type='text'
                                                        md='6'
                                                        name={val.id == "" ? replaceAll(val.fieldName.toLowerCase(), ' ', '-') : val.id}
                                                        // name={replaceAll(val.fieldName.toLowerCase(), ' ', '-')}
                                                        id={val.id}
                                                        value={valueInput?.[replaceAll(val.fieldName.toLowerCase(), ' ', '-')]}
                                                        placeholder={val.fieldValue}
                                                        aria-label={"limit-Amount-Input"}
                                                        language="idn"
                                                        onChange={(e) => handleChangeText(e)}
                                                    /> :
                                                    <Input md='8'
                                                        type='text'
                                                        name={val.id == "" ? replaceAll(val.fieldName.toLowerCase(), ' ', '-') : val.id}
                                                        // name={'total-' + replaceAll(val.fieldName.toLowerCase(), ' ', '-')+"-"+val.id}
                                                        id={val.id}
                                                        className="textInputStyle"
                                                        placeholder={val.fieldValue}
                                                        value={valueInput?.[replaceAll(val.fieldName.toLowerCase(), ' ', '-')]}
                                                        aria-label={val.fieldName}
                                                        onChange={(e) => handleChangeText(e)}
                                                    />
                                            }
                                            <Trash2 aria-placeholder='delete record' size={30} className='mx-1 icon-app'
                                                onClick={() => deleteField(val)}
                                            />
                                        </Col>
                                        // <Col md='2' className='mb-1 inline-flex'>
                                        //     
                                        // </Col>
                                        : null
                                }
                            </Row>
                        )
                    })
                }
            </Form>
        </MainCard>
    </>);
}

export default FixedInformation;