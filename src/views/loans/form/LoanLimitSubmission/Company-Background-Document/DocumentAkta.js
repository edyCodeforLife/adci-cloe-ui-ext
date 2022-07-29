import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appendUrl, checkData, convertObjectKey, deleteAllValueInKey, deleteObjectInArray, numberOnlyKey, searchKeyObjectInArray } from '../../../../../utility/Utils';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import Select from 'react-select';
import { selectThemeColors } from '@utils'
import { ArrowLeft, ArrowRight } from 'react-feather'
import CustomButton from '../../../../../@core/layouts/components/custom/Button/CustomButton';
import { store } from '../../../../../redux/store';
import { ALLOWED_FILE_TYPES, DELETE } from '../../../../../utility/Constants';
import { uploadDocData } from '../../../../../redux/upload';

function DocumentAkta({ title, showUploadFile, handleAdd, handleUpload, onChange }) {
    const DOC_AKTA_PP = convertObjectKey(useSelector(state => state.loan.COMPANY_DOC_AKTA_PP), ["code", "name"], ["value", "label"]);
    const dispatch = useDispatch();
    const [aktaInput, setAktaInput] = useState({})

    function handleInput(e) {
        const { name, value } = e.target;
        setAktaInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSelect = (name) => (e) => {
        setAktaInput(prevState => ({
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
        form.set('documentType', aktaInput["jenis-akta"]);
        form.set('documentYear', aktaInput["tahun-pendirian"]);
        form.set('documentNotes', aktaInput["notes"]);
        let fileUri = (searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", "aktaDokumenFile")?.["fileUrl"])
        if (fileUri != undefined)
            form.set('documentFile', appendUrl(fileUri))
        form.set('position', '1');
        form.set('merchantBackFileId', '')
        form.set('active', 'true')
        
        handleUpload({ key: "inputName", value: nameType }, DELETE);        
        setAktaInput(deleteAllValueInKey(aktaInput))
        handleAdd(form);
    }

    // { console.log("isi" + JSON.stringify(aktaInput)) }

    const determineSelect = () => {
        if (DOC_AKTA_PP.find(item => item.value === checkData(aktaInput["jenis-akta"]))) {
            return DOC_AKTA_PP.find(item => item.value === checkData(aktaInput["jenis-akta"]));
        } else {
            return ""
        }
    }

    return (
        <>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for={`tahun-pendirian`}>
                            Pilih Jenis Akta
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            // value={DOC_AKTA_PP.find(item => item.value === checkData(aktaInput["jenis-akta"]))}
                            value={determineSelect()}
                            options={DOC_AKTA_PP}
                            isClearable={false}
                            onChange={
                                handleSelect("jenis-akta")
                            }
                        />
                    </Col>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for={`tahun-pendirian`}>
                            Tahun Pendirian / Perubahan
                        </Label>
                        <Input
                            type="text"
                            maxLength="4"
                            name={`tahun-pendirian`}
                            id={`tahun-pendirian`}
                            placeholder='Tahun Pendirian / Perubahan'
                            aria-label='Tahun Pendirian / Perubahan'
                            value={aktaInput["tahun-pendirian"]}
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
                                name={`aktaDokumenFile`}
                                onChange={(e) => { handleUpload(e) }}
                                hidden
                                value={''}
                                accept={ALLOWED_FILE_TYPES}
                            />
                        </Button>
                        <div>{showUploadFile("inputName", "aktaDokumenFile")}</div>
                    </div>
                    <div className='form-password-toggle col-md-6 mb-1'>
                        <Label className='form-label' for={`confirm-password`}>
                            Notes
                        </Label>
                        <div className='form-floating mt-2'>
                            <Input
                                type='textarea'
                                name='notes'
                                id='floating-textarea'
                                placeholder='Floating Label'
                                value={aktaInput['notes']}
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
            <CustomButton text={"Save"} handleClick={() => add("aktaDokumenFile")} />
        </>
    )
}

export default DocumentAkta