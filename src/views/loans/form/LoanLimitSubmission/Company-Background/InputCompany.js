import React, { useState, useEffect, useMemo } from 'react';
import { Label, Row, Col, Input, Form, Button, Card } from 'reactstrap'
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import { ArrowLeft, ArrowRight, Eye, Trash2, X } from 'react-feather'
import { selectThemeColors } from '@utils'
import { useDispatch, useSelector } from 'react-redux';
import { setLoan, setLoanData } from '../../../../../redux/loan';
import { checkData, convertObjectKey, createNewArrayOfObjectWithSpecificKeys, deleteObjectInArray, deleteValueInArray, filteringArrayByKey, filterValue, numberOnlyKey, openUrl, replaceAll, returnMultipleValToArr, searchKeyObjectInArray } from '../../../../../utility/Utils';
import { store } from '../../../../../redux/store';
import { ALLOWED_FILE_TYPES, ALLOWED_KTP_DISPLAY } from '../../../../../utility/Constants';
import { uploadDocData } from '../../../../../redux/upload';
import { map, find } from 'lodash';

const InputCompany = props => {
    const { showUploadFile, handleUpload, type, setUploaded, setBACoverageFnc, baCoverage } = props;

    const animatedComponents = makeAnimated()
    const dispatch = useDispatch()
    const loan = useSelector(state => state.loan.companyBg);
    const userProfile = useSelector(state => state.login.credential);
    // const getData = useSelector(state => state.summary.companyBackground);
    const cityType = convertObjectKey(useSelector(state => state.loan.lookupType.city), ["code", "name"], ["value", "label"]);
    const stateType = convertObjectKey(useSelector(state => state.loan.lookupType.state), ["code", "name"], ["value", "label"]);
    const countryType = convertObjectKey(useSelector(state => state.loan.lookupType.country), ["code", "name"], ["value", "label"]);
    const blType = convertObjectKey(useSelector(state => state.loan.lookupType["business-line"]), ["code", "name"], ["value", "label"]);
    const bacType = convertObjectKey(useSelector(state => state.loan.lookupType["business-area-coverage"]), ["code", "name"], ["value", "label"]);
    // const [baCoverage, setBaCoverage] = useState([]);
    const isNotKTP = filterValue(ALLOWED_KTP_DISPLAY, store.getState().login.credential.companyType)

    // console.log("loanadalah"+JSON.stringify(loan?.businessAreaCoverage))

    function handleInput(e) {
        dispatch(setLoan({ name: e.target.name, val: e.target.value }));
    }

    const handleSelect = (name) => (e) => {
        dispatch(setLoan({ name: name, val: e.value }));
    }

    const addBusinessAreaCoverage = (name, value) => {
        // setBACoverageFnc((prev) => [...prev, store.getState().loan.companyBg?.businessAreaCoverage.split('_').join(' ')])
        let _baCoverage = createNewArrayOfObjectWithSpecificKeys(value, ['value'])
        dispatch(setLoan({ name: name, val: _baCoverage }));
        // console.log("====>" + JSON.stringify(_baCoverage));
        setBACoverageFnc(value)
        // setBaCoverage((prev) => [...prev, store.getState().loan.companyBg?.businessAreaCoverage.split('_').join(' ')])
    }

    useEffect(() => {
        dispatch(setLoanData(store.getState().summary.companyBackground));
    }, [store.getState().summary.companyBackground])

    useEffect(() => {
        let profile = {
            'name': userProfile?.companyName,
            'email': userProfile?.email,
        }
        dispatch(setLoanData(profile));
    }, [])

    useEffect(() => {
        setBACoverageFnc(loan?.businessAreaCoverage)
    }, [loan?.businessAreaCoverage])

    const multipleVal = useMemo(() => returnMultipleValToArr(bacType, loan?.businessAreaCoverage), [loan?.businessAreaCoverage])

    // const removeLableMultiple = (item) => {
    //     let _temp = deleteValueInArray(baCoverage, item);
    //     setBACoverageFnc(_temp)
    // }

    // const multipleValueLabel = () => {
    //     let _data = map(baCoverage, (item, index) => {
    //         return <Card className='selected-text-cancelable' style={{ marginLeft: '10px', borderRadius: '0' }}>
    //             <span className='align-middle d-sm-inline-block d-none'>{item}</span>
    //             <X size={14} className='align-middle ms-sm-25 ms-0' onClick={() => removeLableMultiple(item)}></X>
    //         </Card>
    //     })
    //     return _data;
    // }

    return (<>
        <div className='content-header'>
            <h5 className='mb-0'>Company Form</h5>
            <small className='text-muted'>Input here</small>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='12' className='mb-1'>
                        <Label className='form-label' for={`input-name-${type}`}>
                            Company Name
                        </Label>
                        <Input
                            type='text'
                            name={`name`}
                            id={`input-name-${type}`}
                            placeholder='Company Name'
                            aria-label='Company Name'
                            value={checkData(loan?.name)}
                            onChange={
                                (e) => {
                                    handleInput(e);
                                }}
                            maxLength="128"
                        />
                    </Col>
                </Row>
                {/* 2 */}
                <Row>
                    <Col md='12' className='mb-1'>
                        <Label className='form-label' for={`address-${type}`}>
                            Company Address
                        </Label>
                        <Input
                            type='text'
                            name={`address`}
                            id={`address-${type}`}
                            placeholder='Company Address'
                            aria-label='Company Address'
                            value={checkData(loan?.address)}
                            onChange={
                                (e) => {
                                    handleInput(e);
                                }}
                            maxLength="128"
                        />
                    </Col>
                </Row>
                {/* 3 */}
                <Row>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for={`select-city-${type}`}>
                            City
                        </Label>
                        <Select
                            id={`select-city-${type}`}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            // defaultValue={cityType[0]}
                            options={cityType}
                            isClearable={false}
                            value={cityType.find(item => item.value === checkData(loan?.city))}
                            onChange={
                                handleSelect("city")
                            }
                        />
                    </Col>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for={`select-state-${type}`}>
                            State/Province
                        </Label>
                        <Select
                            id={`select-state-${type}`}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            // defaultValue={stateType[0]}
                            options={stateType}
                            isClearable={false}
                            value={stateType.find(item => item.value === checkData(loan?.province))}
                            onChange={
                                handleSelect("province")
                            }
                        />
                    </Col>
                </Row>
                {/* ---3 */}
                <Row>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for={`select-country-${type}`}>
                            Country
                        </Label>
                        <Select
                            id={`select-country-${type}`}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            // defaultValue={countryType[0]}
                            options={countryType}
                            isClearable={false}
                            value={countryType.find(item => item.value === checkData(loan?.country))}
                            onChange={
                                handleSelect("country")
                            }
                        />
                    </Col>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for={`postal-code-${type}`}>
                            Postal Code
                        </Label>
                        <Input
                            type='text'
                            onKeyPress={
                                numberOnlyKey}
                            name={`postalCode`}
                            id={`postal-code-${type}`}
                            placeholder='Postal Code'
                            aria-label='Postal Code'
                            value={checkData(loan?.postalCode)}
                            onChange={
                                (e) => {
                                    handleInput(e);
                                }}
                            maxLength="5"
                        />
                    </Col>
                </Row>
                {/* 4 */}
                <Row>
                    <Col md='10' className='mb-1 inline-flex'>
                        <Label md="2" className='form-label' for={`ktpId-${type}`}>
                            KTP Number
                        </Label>
                        <Input
                            type='text'
                            name={`ktpNo`}
                            required
                            id={`ktpId-${type}`}
                            placeholder='KTP'
                            aria-label='KTP'
                            value={checkData(loan?.ktpNo)}
                            onChange={
                                (e) => {
                                    handleInput(e);
                                }}
                            maxLength="16"
                        />
                    </Col>
                    <Col md='2' className='mb-1'>
                        <Button color='primary' className='btn-next' tag={Label}>
                            Upload
                            <Input
                                type='file'
                                name={`ktpFile`}
                                onChange={(e) => handleUpload(e)}
                                hidden
                                value={''}
                                accept={ALLOWED_FILE_TYPES}
                            />
                        </Button>
                    </Col>
                    <Col md='10' className='mb-1 inline-flex justify-center'>
                        {
                            showUploadFile("inputName", "ktpFile")
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md='10' className='mb-1 inline-flex'>
                        <Label md="2" className='form-label' for={`taxId-${type}`}>
                            NPWP or Tax ID
                        </Label>
                        <Input
                            type='text'
                            name={`npwpNo`}
                            id={`taxId-${type}`}
                            required
                            placeholder='NPWP or Tax ID'
                            aria-label='NPWP or Tax ID'
                            value={checkData(loan?.npwpNo)}
                            onChange={
                                (e) => {
                                    handleInput(e);
                                }}
                            maxLength="20"
                        />
                    </Col>
                    <Col md='2' className='mb-1'>
                        <Button color='primary' className='btn-next' tag={Label}>
                            Upload
                            <Input
                                type='file'
                                name={`npwpFile`}
                                required
                                onChange={(e) => handleUpload(e)}
                                hidden
                                value={''}
                                accept={ALLOWED_FILE_TYPES}
                            />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md='10' className='mb-1 inline-flex justify-center'>
                        {
                            showUploadFile("inputName", "npwpFile")
                        }
                    </Col>
                </Row>
                {
                    isNotKTP ?
                        <Row>
                            <Col md='10' className='mb-1 inline-flex'>
                                <Label md="2" className='form-label' for={`nib-reg-${type}`}>
                                    NIB Reg. No.
                                </Label>
                                <Input
                                    type='number'
                                    name={`nibNo`}
                                    id={`nib-reg-${type}`}
                                    required
                                    placeholder='NIB Registration Number'
                                    aria-label='NIB Registration Number'
                                    value={checkData(loan?.nibNo)}
                                    onChange={
                                        (e) => {
                                            handleInput(e);
                                        }}
                                    maxLength="13"
                                />
                            </Col>
                            <Col md='2' className='mb-1'>
                                <Button color='primary' className='btn-next' tag={Label}>
                                    Upload
                                    <Input
                                        type='file'
                                        name={`nibFile`}
                                        onChange={(e) => { handleUpload(e) }}
                                        hidden
                                        value={''}
                                        accept={ALLOWED_FILE_TYPES}
                                    />
                                </Button>
                            </Col>
                        </Row>
                        : null
                }
                <Row>
                    <Col md='10' className='mb-1 inline-flex justify-center'>
                        {
                            showUploadFile("inputName", "nibFile")
                        }
                    </Col>
                </Row>
                {/* 5 */}
                <Row>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for={`email-${type}`}>
                            Company Email
                        </Label>
                        <Input
                            type='text'
                            name={`email`}
                            id={`email-${type}`}
                            placeholder='Company Email'
                            aria-label='Company Email'
                            value={checkData(loan?.email)}
                            onChange={
                                (e) => {
                                    handleInput(e);
                                }}
                            maxLength="128"
                        />
                    </Col>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for={`phone-${type}`}>
                            Company Phone
                        </Label>
                        <Input
                            type='text'
                            name={`phone`}
                            id={`phone-${type}`}
                            placeholder='Company Phone'
                            aria-label='Company Phone'
                            value={checkData(loan?.phone)}
                            onChange={
                                (e) => {
                                    handleInput(e);
                                }}
                            maxLength="20"
                        />
                    </Col>
                </Row>
                {/* 6 */}
                <Row>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for={`brand-${type}`}>
                            Product/Brand
                        </Label>
                        <Input
                            type='text'
                            name={`product`}
                            id={`brand-${type}`}
                            placeholder='Product / Brand'
                            aria-label='Product / Brand'
                            value={checkData(loan?.product)}
                            onChange={
                                (e) => {
                                    handleInput(e);
                                }}
                        />
                    </Col>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for={`email-${type}`}>
                            Business Line
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            // defaultValue={blType[0]}
                            options={blType}
                            isClearable={false}
                            value={blType.find(item => item.value === checkData(loan?.businessLine))}
                            onChange={
                                handleSelect("businessLine")
                            }
                        />
                    </Col>
                </Row>
                {/* 7 */}
                <Row className='d-flex align-items-center'>
                    <Col md='12' className='mb-1'>
                        <Label className='form-label' for={`email-${type}`}>
                            Business Area Coverage
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            // defaultValue={loan?.baCoverage}
                            options={bacType}
                            isMulti
                            isClearable={false}
                            // value={bacType.find(item => item.value === checkData(loan?.businessAreaCoverage))}                            
                            value={multipleVal}
                            onChange={(e) => {
                                // handleSelect("businessAreaCoverage");
                                addBusinessAreaCoverage("businessAreaCoverage", e);
                                // setBaCoverage(e.value);
                            }}
                        />
                        {/* <Select
                            isClearable={false}
                            theme={selectThemeColors}
                           
                            
                            defaultValue={[colorOptions[4], colorOptions[5]]}
                            isMulti
                            options={colorOptions}
                            className='react-select'
                            classNamePrefix='select'
                        /> */}
                    </Col>
                    {/* <Col md='2' className='mb-1 mt-1'>
                        <Button color='primary' className='btn-next' onClick={() => addBusinessAreaCoverage()}>
                            <span className='align-middle d-sm-inline-block d-none'>Add</span>
                            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                        </Button>
                    </Col> */}
                </Row>
                {/* <Row className='d-flex align-items-center'>
                    <Col md='8' className='mb-1'>
                        {
                            // <div>{multipleValueLabel()}</div>
                        }
                    </Col>
                </Row> */}
            </Form>
        </div>
    </>);
}

export default InputCompany;