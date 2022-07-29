import React, { useState, useEffect } from 'react';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import MainCard from '../../../../../@core/layouts/components/custom/MainCard';
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useDispatch } from 'react-redux';
import { addNewCompanyInformation } from '../../../../../redux/loan';
import { store } from '../../../../../redux/store';
import { convertJSONToFormData } from '../../../../../utility/Utils';

const CustomInformation = ({ saveMerchantInfoFc }) => {

    const [nameInput, setNameInput] = useState("");
    const [descInput, setDescriptionInput] = useState("");
    const dispatch = useDispatch();

    const addNewInformationField = () => {
        let payload = {
            "id": "",
            "active": true,
            "loanLimitRequestId": store.getState().loan.loanLimitRequestId,
            "fieldName": nameInput,
            "fieldValue": descInput,
            "position": 1
        }

        saveMerchantInfoFc(convertJSONToFormData(payload))
        setNameInput('');
        setDescriptionInput('');
        //    dispatch(addNewCompanyInformation(payload))
    }

    return (<>
        <MainCard>
            <div className='content-header'>
                <h5 className='mb-0'>Add Additional Information</h5>
                <small className='text-muted'>Information</small>
            </div>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='12' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`additional-doc`}>
                            Add More Information
                        </Label>
                        <Input md="8"
                            type='text'
                            name={`additional-doc`}
                            id={`additional-doc`}
                            placeholder='Additional Information'
                            aria-label='Additional Information'
                            onChange={e => setNameInput(e.target.value)}
                            value={nameInput}
                        />
                    </Col>
                    <Col md='12' className='mb-1 inline-flex'>
                        <Label md="4" className='form-label' for={`username-information`}>
                            Type Description here
                        </Label>
                        <Input md="8"
                            type='textarea'
                            name='username-information'
                            id='username-information'
                            placeholder='Description'
                            value={descInput}
                            style={{ minHeight: '100px' }}
                            onInput={e => setDescriptionInput(e.target.value)}
                        />
                    </Col>
                </Row>
                <Button color='primary' className='btn-next float-right' onClick={() => addNewInformationField()}>
                    <span className='align-middle d-sm-inline-block d-none'>Add</span>
                    <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                </Button>
            </Form>
        </MainCard>
    </>);
}

export default CustomInformation;