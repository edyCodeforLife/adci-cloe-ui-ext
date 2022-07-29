import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { appendUrl, checkData, convertObjectKey, deleteAllValueInKey, numberOnlyKey, searchKeyObjectInArray } from '../../../../../utility/Utils';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import Select from 'react-select';
import { selectThemeColors } from '@utils'
import { ArrowLeft, ArrowRight } from 'react-feather'
import CustomButton from '../../../../../@core/layouts/components/custom/Button/CustomButton';
import { ALLOWED_FILE_TYPES, DELETE } from '../../../../../utility/Constants';
import { store } from '../../../../../redux/store';

function DocumentKemenkunham({ title, showUploadFile, handleAdd, handleUpload, onChange }) {
    const DOC_KEMENKUMHAM = convertObjectKey(useSelector(state => state.loan.COMPANY_DOC_KEMENKUMHAM), ["code", "name"], ["value", "label"]);

    const [kemenkumInput, setKemenkumInput] = useState([])

    function handleInput(e) {
        const { name, value } = e.target;
        setKemenkumInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSelect = (name) => (e) => {
        setKemenkumInput(prevState => ({
            ...prevState,
            [name]: e.value
        }));
    }

    const add = (nameType) => {
        // store.getState().loan.loanLimitRequestId;
        let idea = store.getState().loan.loanLimitRequestId;
        const form = new FormData();
        form.set('loanLimitRequestId', idea);
        form.set('documentGroup', title);
        form.set('documentType', kemenkumInput["jenis-kemenkunham"]);
        form.set('documentYear', kemenkumInput["thn-pendirian-kemenkunham"]);
        form.set('documentNotes', kemenkumInput["notes"]);
        let fileUri = (searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", "kemenkunhamDokumenFile")?.["fileUrl"])
        if (fileUri != undefined)
            form.set('documentFile', appendUrl(fileUri))
        form.set('position', '1');
        form.set('merchantBackFileId', '')
        form.set('active', 'true')

        handleUpload({ key: "inputName", value: nameType }, DELETE);      
        setKemenkumInput(deleteAllValueInKey(kemenkumInput))
        handleAdd(form);
    }

    const determineSelect = () => {
        if (DOC_KEMENKUMHAM.find(item => item.value === checkData(kemenkumInput["jenis-kemenkunham"]))) {
            return DOC_KEMENKUMHAM.find(item => item.value === checkData(kemenkumInput["jenis-kemenkunham"]));
        } else {
            return ""
        }
    }

    return (
        <>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label'>
                            Pilih Jenis Akta
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            // defaultValue={DOC_KEMENKUMHAM[0]}
                            options={DOC_KEMENKUMHAM}
                            value={determineSelect()}
                            isClearable={false}
                            onChange={
                                handleSelect("jenis-kemenkunham")
                            }
                        />
                    </Col>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for={`thn-pendirian-kemenkunham`}>
                            Masukan Tahun Pendirian/Pembuatan
                        </Label>
                        <Input
                            type='text'
                            name={`thn-pendirian-kemenkunham`}
                            id={`thn-pendirian-kemenkunham`}
                            placeholder='Tahun Pendirian / Pembuatan'
                            aria-label='Tahun Pendirian / Pembuatan'
                            maxLength="4"
                            value={kemenkumInput['thn-pendirian-kemenkunham']}
                            onKeyPress={
                                numberOnlyKey}
                            onChange={
                                (e) => {
                                    handleInput(e);
                                }}
                        />
                    </Col>
                </Row>
                <Row>
                    <div className='form-password-toggle col-md-6 mb-1'>
                        <Label className='form-label' for={`password`}>
                            Upload Document
                        </Label>
                        {/* <CustomButton text={"Upload"} handleClick={()=>handleAdd()} /> */}
                        <Button color='primary float-right' className='btn-next' tag={Label}>
                            Upload
                            <Input
                                type='file'
                                name={`kemenkunhamDokumenFile`}
                                onChange={(e) => { handleUpload(e) }}
                                hidden
                                value={''}
                                accept={ALLOWED_FILE_TYPES}
                            />
                        </Button>
                        <div>{showUploadFile("inputName", "kemenkunhamDokumenFile")}</div>
                    </div>
                    <div className='form-password-toggle col-md-6 mb-1'>
                        <Label className='form-label' for={`confirm-password`}>
                            Notes
                        </Label>
                        <div className='form-floating mt-2'>
                            <Input
                                type='textarea'
                                name='notes'
                                value={kemenkumInput['notes']}
                                id='floating-textarea'
                                placeholder='Floating Label'
                                style={{ minHeight: '100px' }}
                                onChange={
                                    (e) => {
                                        handleInput(e);
                                    }}
                            />
                        </div>
                    </div>
                </Row>
            </Form>
            <CustomButton text={"Save"} handleClick={() => add("kemenkunhamDokumenFile")} />
        </>
    )
}

export default DocumentKemenkunham