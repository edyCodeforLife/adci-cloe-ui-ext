import React, { useState } from 'react'
import MainCard from '@layouts/components/custom/MainCard';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import CustomButton from '@core/layouts/components/custom/Button/CustomButton';
import TableCompanyBackgroundStructure from './TableCompanyBackgroundStructure';
import { store } from '../../../../../redux/store';
import { appendUrl, deleteAllValueInKey, filteringArrayByKey, searchKeyObjectInArray } from '../../../../../utility/Utils';
import UploadButton from '../../../../../@core/layouts/components/custom/Button/UploadButton';
import { DELETE, SHAREHOLDER_STRUCTURE } from '../../../../../utility/Constants';

const Individual = props => {

    const { handleAdd, showUploadFile, handleUpload, structureData } = props;
    const [individualInput, setIndividualInput] = useState([])

    const style = {
        border: '2px solid #010432',
        width: '100%',
        height: '100%'
    }

    function handleInput(e) {
        const { name, value } = e.target;
        setIndividualInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const add = (structureId, structureGroup, activeStatus, fileKey, nameType) => {
        const form = new FormData();
        form.set('merchantStructureId', structureId ?? '');
        form.set('loanLimitRequestId', store.getState().loan.loanLimitRequestId);
        form.set('structureGroup', structureGroup);
        form.set('label1', 'Owner Name');
        form.set('label2', 'Role / Position');
        // form.set('label3', 'asss');
        form.set('field1', individualInput["owner-name-structure"] == undefined ? '' : individualInput["owner-name-structure"]);
        form.set('field2', individualInput["role-structure"] == undefined ? '' : individualInput["role-structure"]);
        // form.set('field3', 'sasas');
        let ktpFile = searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", "ktpFile")?.["fileUrl"];
        let npwpFile = searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", "npwpFile")?.["fileUrl"];
        if (npwpFile != undefined)
            form.set('npwpFile', appendUrl(npwpFile));
        if (ktpFile != undefined)
            form.set('ktpFile', appendUrl(ktpFile));
        form.set('position', '1');
        form.set('active', activeStatus ?? '');

        nameType.forEach((val, index)=>{
            handleUpload({ key: "inputName", value: val }, DELETE);
        })     
        setIndividualInput(deleteAllValueInKey(individualInput))
        handleAdd(form);
    }

    // { console.log("isi" + JSON.stringify(individualInput)) }

    return (
        <>
            <MainCard>
                <div className='content-header'>
                    <h5 className='mb-0'>{SHAREHOLDER_STRUCTURE}</h5>
                    <small className='text-muted'>Share Holders Structures</small>
                </div>
                <MainCard styled={style}>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Row>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label fw-bold' for={`username`}>
                                    Company Name
                                </Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label fw-bold' for={`owner-name-structure`}>
                                    Owner Name*
                                </Label>
                                <Input
                                    type='text'
                                    name={`owner-name-structure`}
                                    id={`owner-name-structure`}
                                    value={individualInput["owner-name-structure"]}
                                    onChange={
                                        (e) => {
                                            handleInput(e);
                                        }}
                                />
                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label fw-bold' for={`role-structure`}>
                                    Role / Position*
                                </Label>
                                <Input
                                    type='text'
                                    name={`role-structure`}
                                    id={`role-structure`}
                                    value={individualInput["role-structure"]}
                                    onChange={
                                        (e) => {
                                            handleInput(e);
                                        }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label fw-bold' md="6" for={`username`}>
                                    KTP
                                </Label>
                                <UploadButton nameInput={"ktpFile"} showUploadFile={showUploadFile} handleUpload={handleUpload} />
                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label md="6" className='form-label fw-bold' for={`username`}>
                                    NPWP
                                </Label>
                                <UploadButton nameInput={"npwpFile"} showUploadFile={showUploadFile} handleUpload={handleUpload} />
                            </Col>
                        </Row>
                    </Form>
                    <CustomButton text={"Save"} handleClick={() => add('', SHAREHOLDER_STRUCTURE, true, '', ["ktpFile", "npwpFile"])} />
                    <TableCompanyBackgroundStructure data={filteringArrayByKey(
                        structureData,
                        "structureGroup", SHAREHOLDER_STRUCTURE)}
                        handleTrash={handleAdd}
                    />
                </MainCard>
            </MainCard>
        </>
    )
}

export default Individual