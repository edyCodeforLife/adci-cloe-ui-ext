import React, { useState } from 'react'
import MainCard from '@layouts/components/custom/MainCard';
import { Label, Row, Col, Input, Form, Button, Table } from 'reactstrap'
import CustomButton from '../../../../../@core/layouts/components/custom/Button/CustomButton';
import TableCompanyBackgroundStructure from './TableCompanyBackgroundStructure';
import { ALLOWED_FILE_TYPES, BOCOMMISION_STRUCTURE, BODIRECTORS, DELETE, SHAREHOLDER_STRUCTURE } from '../../../../../utility/Constants';
import { appendUrl, deleteAllValueInKey, filteringArrayByKey, searchKeyObjectInArray } from '../../../../../utility/Utils';
import { store } from '../../../../../redux/store';
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import UploadButton from '../../../../../@core/layouts/components/custom/Button/UploadButton';

const perseroOptions = [
    { value: 'active', label: 'Active' },
    { value: 'passive', label: 'Passive' },
]

const words = ["Share Holder Name", "Total Exchange Stock", "Persero (Active / Passive)"]
const boWords = ["Director Name", "Role", "Superior"]

const CompanyCV = props => {

    const { handleAdd, showUploadFile, handleUpload, structureData } = props;
    const [companyCVInput, setcompanyCVInput] = useState([])

    const style = {
        border: '2px solid #010432',
        width: '100%',
        height: '100%'
    }

    function handleInput(e) {
        const { name, value } = e.target;
        setcompanyCVInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSelect = (name) => (e) => {
        setcompanyCVInput(prevState => ({
            ...prevState,
            [name]: e.value
        }));
    }

    const add = (structureId, structureGroup, activeStatus, labelStructure = [], nameType=[]) => {
        const form = new FormData();
        form.set('merchantStructureId', structureId ?? '');
        form.set('loanLimitRequestId', store.getState().loan.loanLimitRequestId);
        form.set('structureGroup', structureGroup);
        for (var x = 0; x < labelStructure.length; x++) {
            form.set('label' + (x + 1), labelStructure[x]);
        }
        form.set('field1', companyCVInput?.[structureGroup + "_input_1"] == undefined ? '' : companyCVInput?.[structureGroup + "_input_1"]);
        form.set('field2', companyCVInput?.[structureGroup + "_input_2"] == undefined ? '' : companyCVInput?.[structureGroup + "_input_2"]);
        form.set('field3', companyCVInput?.[structureGroup + "_input_3"] != undefined ?
            companyCVInput?.[structureGroup + "_input_3"] : "active"
        );
        let ktpFile = searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", structureGroup + "ktpFile")?.["fileUrl"];
        let npwpFile = searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", structureGroup + "npwpFile")?.["fileUrl"];
        if (npwpFile != undefined)
            form.set('npwpFile', appendUrl(npwpFile));
        if (ktpFile != undefined)
            form.set('ktpFile', appendUrl(ktpFile));
        form.set('position', '1');
        form.set('active', activeStatus ?? '');

        nameType.forEach((val, index)=>{
            handleUpload({ key: "inputName", value: structureGroup+val }, DELETE);
        })        
        setcompanyCVInput(deleteAllValueInKey(companyCVInput))
        handleAdd(form);
    }
    // {console.log(JSON.stringify(store.getState().upload.UploadDoc))}
    return (
        <>
            <MainCard>
                <div className='content-header'>
                    <h5 className='mb-0'>{SHAREHOLDER_STRUCTURE}</h5>
                    <small className='text-muted'>Shareholder Structures</small>
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
                                <Label className='form-label fw-bold' for={SHAREHOLDER_STRUCTURE + "_input_name"}>
                                    {words[0]}
                                </Label>
                                <Input
                                    type='text'
                                    name={SHAREHOLDER_STRUCTURE + `_input_1`}
                                    id={SHAREHOLDER_STRUCTURE + "_input_name"}
                                    value={companyCVInput[SHAREHOLDER_STRUCTURE + `_input_1`]}
                                    placeholder='Type here'
                                    onChange={
                                        (e) => {
                                            handleInput(e);
                                        }}
                                // aria-label='john.doe'
                                />
                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label fw-bold' for={SHAREHOLDER_STRUCTURE + "_input_stock"}>
                                    {words[1]}
                                </Label>
                                <Input
                                    type='text'
                                    name={SHAREHOLDER_STRUCTURE + `_input_2`}
                                    id={SHAREHOLDER_STRUCTURE + "_input_stock"}
                                    value={companyCVInput[SHAREHOLDER_STRUCTURE + `_input_2`]}
                                    placeholder='Type here'
                                    onChange={
                                        (e) => {
                                            handleInput(e);
                                        }}
                                // aria-label='john.doe'
                                />
                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label fw-bold' for={`username`}>
                                    {words[2]}*
                                </Label>
                                <Select
                                    id={`select-city`}
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={perseroOptions[0]}
                                    options={perseroOptions}
                                    isClearable={false}
                                    onChange={
                                        handleSelect("city")
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label fw-bold' md="6" for={`username`}>
                                    KTP
                                </Label>
                                <UploadButton nameInput={SHAREHOLDER_STRUCTURE + "_ktpFile"} 
                                showUploadFile={showUploadFile} handleUpload={handleUpload} />
                                {/* <Button md="6" color='primary' className='btn-next' tag={Label}>
                                    Upload
                                    <Input
                                        type='file'
                                        name={SHAREHOLDER_STRUCTURE + "_ktpFile"}
                                        onChange={(e) => handleUpload(e)}
                                        hidden
                                        value={''}
                                        accept={ALLOWED_FILE_TYPES}
                                    />
                                </Button> */}
                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label md="6" className='form-label fw-bold' for={`username`}>
                                    NPWP
                                </Label>
                                <UploadButton nameInput={SHAREHOLDER_STRUCTURE + "_npwpFile"}
                                    showUploadFile={showUploadFile} handleUpload={handleUpload} />
                                {/* <Button md="6" color='primary' className='btn-next' tag={Label}>
                                    Upload
                                    <Input
                                        type='file'
                                        name={SHAREHOLDER_STRUCTURE + "_npwpFile"}
                                        onChange={(e) => handleUpload(e)}
                                        hidden
                                        value={''}
                                        accept={ALLOWED_FILE_TYPES}
                                    />
                                </Button> */}
                            </Col>
                        </Row>
                    </Form>
                    <CustomButton text={"Save"} handleClick={() => add('', SHAREHOLDER_STRUCTURE, true, words, ["_npwpFile", "_ktpFile"] )} />
                    <TableCompanyBackgroundStructure data={filteringArrayByKey(
                        structureData,
                        "structureGroup", SHAREHOLDER_STRUCTURE)}
                        handleTrash={handleAdd}
                    />
                </MainCard>
            </MainCard>
            {/* 2 */}
            <MainCard>
                <div className='content-header'>
                    <h5 className='mb-0'>{BODIRECTORS}</h5>
                    <small className='text-muted'>Board of Directors</small>
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
                                <Label className='form-label fw-bold' for={BODIRECTORS + "_input_name"}>
                                    {boWords[0]}*
                                </Label>
                                <Input
                                    type='text'
                                    name={BODIRECTORS + `_input_1`}
                                    id={BODIRECTORS + "_input_name"}
                                    placeholder='Type here'
                                    value={companyCVInput[BODIRECTORS + `_input_1`]}
                                    onChange={
                                        (e) => {
                                            handleInput(e);
                                        }}
                                />
                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label fw-bold' for={BODIRECTORS + "_input_role"}>
                                    {boWords[1]}*
                                </Label>
                                <Input
                                    type='text'
                                    name={BODIRECTORS + `_input_2`}
                                    id={BODIRECTORS + "_input_role"}
                                    placeholder='Type here'
                                    value={companyCVInput[BODIRECTORS + `_input_2`]}
                                    onChange={
                                        (e) => {
                                            handleInput(e);
                                        }}
                                />
                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label fw-bold' for={BODIRECTORS + "_input_superior"}>
                                    {boWords[2]}*
                                </Label>
                                <Input
                                    type='text'
                                    name={BODIRECTORS + `_input_3`}
                                    id={BODIRECTORS + "_input_superior"}
                                    placeholder='Type here'
                                    value={companyCVInput[BODIRECTORS + `_input_3`]}
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
                                <UploadButton nameInput={BODIRECTORS + "_ktpFile"} showUploadFile={showUploadFile} handleUpload={handleUpload} />
                                {/* <Button md="6" color='primary' className='btn-next' tag={Label}>
                                    Upload
                                    <Input
                                        type='file'
                                        name={BODIRECTORS + "_ktpFile"}
                                        onChange={(e) => handleUpload(e)}
                                        hidden
                                        value={''}
                                        accept={ALLOWED_FILE_TYPES}
                                    />
                                </Button> */}
                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label md="6" className='form-label fw-bold' for={`username`}>
                                    NPWP
                                </Label>
                                <UploadButton nameInput={BODIRECTORS + "_npwpFile"} showUploadFile={showUploadFile} handleUpload={handleUpload} />
                                {/* <Button md="6" color='primary' className='btn-next' tag={Label}>
                                    Upload
                                    <Input
                                        type='file'
                                        name={BODIRECTORS + "_npwpFile"}
                                        onChange={(e) => handleUpload(e)}
                                        hidden
                                        value={''}
                                        accept={ALLOWED_FILE_TYPES}
                                    />
                                </Button> */}
                            </Col>
                        </Row>
                    </Form>
                    <CustomButton text={"Save"} handleClick={() => add('', BODIRECTORS, true, boWords, ["_ktpFile", "_npwpFile"])} />
                    <TableCompanyBackgroundStructure data={filteringArrayByKey(
                        structureData,
                        "structureGroup", BODIRECTORS)}
                        handleTrash={handleAdd}
                    />
                </MainCard>
            </MainCard>
        </>
    )
}

export default CompanyCV