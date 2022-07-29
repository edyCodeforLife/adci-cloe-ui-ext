import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { appendUrl, checkData, convertObjectKey, deleteAllValueInKey, searchKeyObjectInArray } from '../../../../../utility/Utils';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import Select from 'react-select';
import { selectThemeColors } from '@utils'
import { ArrowLeft, ArrowRight } from 'react-feather'
import CustomButton from '../../../../../@core/layouts/components/custom/Button/CustomButton';
import { ALLOWED_FILE_TYPES, DELETE } from '../../../../../utility/Constants';
import { store } from '../../../../../redux/store';

function DocumentBackground({ title, showUploadFile, handleAdd, handleUpload, onChange }) {
    const DOC_BACKGROUND = convertObjectKey(useSelector(state => state.loan.COMPANY_DOC_BACKGROUND), ["code", "name"], ["value", "label"]);

    const [backgroundInput, setBackgroundInput] = useState([])

    const handleSelect = (name) => (e) => {
        setBackgroundInput(prevState => ({
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
        form.set('documentType', backgroundInput["jenis-background-doc"]);
        form.set('documentYear', '');
        form.set('documentNotes', '');
        let fileUri = (searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", "backgroundDokumenFile")?.["fileUrl"])
        if (fileUri != undefined)
            form.set('documentFile', appendUrl(fileUri))
        form.set('position', '1');
        form.set('merchantBackFileId', '')
        form.set('active', 'true')

        handleUpload({ key: "inputName", value: nameType }, DELETE);   
        setBackgroundInput(deleteAllValueInKey(backgroundInput))
        handleAdd(form);
    }

    const determineSelect = () => {
        if(DOC_BACKGROUND.find(item => item.value === checkData(backgroundInput["jenis-background-doc"])))
        {
            return DOC_BACKGROUND.find(item => item.value === checkData(backgroundInput["jenis-background-doc"]));
        }else{
            return ""
        }
    }

    return (
        <>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for={`choose-doc`}>
                            Pilih Jenis Dokumen
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            className='react-select mb-1'
                            classNamePrefix='select'
                            // defaultValue={DOC_BACKGROUND[0]}
                            value={determineSelect()}
                            options={DOC_BACKGROUND}
                            isClearable={false}
                            onChange={
                                handleSelect("jenis-background-doc")
                            }
                        />
                        {/* <CustomButton text={"Upload"} handleClick={()=>handleAdd} /> */}
                        <Button color='primary float-right' className='btn-next' tag={Label}>
                            Upload
                            <Input
                                type='file'
                                name={`backgroundDokumenFile`}
                                onChange={(e) => { handleUpload(e) }}
                                hidden
                                value={''}
                                accept={ALLOWED_FILE_TYPES}
                            />
                        </Button>
                        <div>{showUploadFile("inputName", "backgroundDokumenFile")}</div>
                    </Col>
                </Row>
            </Form>
            <CustomButton text={"Save"} handleClick={() => add("backgroundDokumenFile")} />
        </>
    )
}

export default DocumentBackground