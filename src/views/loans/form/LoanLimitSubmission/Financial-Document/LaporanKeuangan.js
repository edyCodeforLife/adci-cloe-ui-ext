import React, { useState, useEffect } from 'react';
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import MainCard from '../../../../../@core/layouts/components/custom/MainCard';
import '@styles/react/libs/flatpickr/flatpickr.scss'
import "react-datepicker/dist/react-datepicker.css";
import CustomButton from '../../../../../@core/layouts/components/custom/Button/CustomButton';
import TableLaporanKeuangan from './TableLaporanKeuangan';
import { ALLOWED_FILE_TYPES, DELETE, MAX_YEAR_FINANCE_REPORT } from '../../../../../utility/Constants';
import { useDispatch } from 'react-redux';
import { setCreditAmountLimit, setMerchantDocument } from '../../../../../redux/loan';
import { appendUrl, checkData, deleteAllValueInKey, filteringArrayByKey, numberOnlyKey, searchKeyObjectInArray } from '../../../../../utility/Utils';
import { store } from '../../../../../redux/store';
import { LoanService } from '../../../../../data/business/index';
import TextInput from '../../../../../@core/components/textinput';
const YearTypeName = ""

const LaporanKeuangan = ({ handleUpload, handleAddForm, showUploadFile, updated }) => {
    const dispatch = useDispatch();

    // const [years, setYears] = useState([]);
    const [financeReportData, setFinanceReport] = useState([
        {
            'limitAmountInput': store.getState().loan.creditLimitAmount?.value
        }
    ])

    function handleInput(e) {
        if (e?.target) {
            const { name, value } = e?.target;
            setFinanceReport(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setFinanceReport(prevState => ({
                ...prevState,
                [e.name]: e.value
            }));
        }
    }
    // alert(JSON.stringify(store.getState().loan.creditLimitAmount))
    // {console.log("manay==>"+JSON.stringify(store.getState().loan.))}

    // useEffect(() => {
    //     let currentYear = new Date().getFullYear();
    //     let array = [];
    //     for (var x = 0; x < MAX_YEAR_FINANCE_REPORT; x++) {
    //         array.push(parseInt(currentYear) - x)
    //     }
    //     setYears([...array]);
    // }, [])

    // useEffect(() => {
    //     if (updated) {
    //         console.log('ets')
    //         _service.getMerchantDocument(
    //             {
    //                 "loanLimitRequestId": store.getState().loan.loanLimitRequestId
    //             }, {
    //             Success: (res) => {
    //                 // console.log("GET UP"+JSON.stringify());
    //                 dispatch(
    //                     setMerchantDocument(res.data)
    //                 )
    //             }
    //         }
    //         )
    //     }
    // }, [updated])

    const handleAdd = (docId, documentGroup, activeStatus, fileKey, name, year) => {
        const form = new FormData();
        let idea = store.getState().loan.loanLimitRequestId;
        form.set('merchantDocumentId', docId == undefined ? '' : docId);
        form.set('loanLimitRequestId', idea);
        form.set('documentGroup', documentGroup);
        form.set('documentName', financeReportData?.[name] == undefined ? '' : financeReportData?.[name]);
        form.set('documentYear', financeReportData?.[year]==undefined? '': financeReportData?.[year]);
        // if (financeReportData?.[desc] != undefined)
        //     form.set('documentDesc', financeReportData?.[desc]);
        form.set('position', '1');
        let fileUri = searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", fileKey)?.["fileUrl"]
        if (fileUri != undefined)
            form.set('documentUrl', appendUrl(fileUri))
        form.set('active', activeStatus == undefined ? '' : activeStatus)

        handleUpload({ key: "inputName", value: fileKey }, DELETE);   
        console.log(JSON.stringify(financeReportData));
        // setFinanceReport(deleteAllValueInKey(financeReportData))
        // handleAddForm(form);
    }

    const TitleGroup = [
        "Laporan Keuangan 3 Tahun Terakhir", "Bank Statement Ops 12 Bulan Terakhir",
        "Sell Out Report to Distributor 1 Tahun Terakhir", "Copy Contract Kerjasama Dengan Supplier",
        "Sample Invoice to the Buyer",
        "Pengajuan Credit Limit"
    ]

    return (<>
        {/* {console.log(JSON.stringify(financeReportData))} */}
        {/* {console.log("Store Credit Limit : " + JSON.stringify(store.getState().loan.creditLimitAmount))} */}
        <MainCard title={TitleGroup[0]} actions='collapse'>
            <div className='content-header'>
                <div>
                    <Row>
                        <Col md='6' className='mb-1 inline-flex'>
                            <Label md="4" className='form-label' for={`document-laporan-keuangan}`}>
                                Document Name
                            </Label>
                            <Input md="8"
                                type='text'
                                name={`documentLaporanKeuangan`}
                                id={`document-laporan-keuangan`}
                                onChange={
                                    (e) => {
                                        handleInput(e);
                                    }}
                            />
                        </Col>
                        <Col md='6' className='mb-1 inline-flex'>
                            <Label md="4" className='form-label' for={`username`}>
                                Year
                            </Label>
                            {/* <Flatpickr value={picker} onChange={date => setPicker(date)} id='default-picker' /> */}
                            <Input md="4"
                                type='text'
                                maxLength="4"
                                name={`documentKeuanganYears`}
                                id={`document-keuangan-years`}
                                pattern="[0-9]+"
                                placeholder="Type Year Here"
                                onKeyPress={
                                    numberOnlyKey}
                                onChange={
                                    (e) => {
                                        handleInput(e);
                                    }}
                            />
                            {/* <CustomButton text={"Upload"} handleClick={() => handleAdd()} styled='btn-next' /> */}
                            <Button color='primary float-right' className='btn-next' tag={Label}>
                                Upload
                                <Input
                                    type='file'
                                    name={`financeReportLTY`}
                                    onChange={(e) => { handleUpload(e) }}
                                    hidden
                                    value={''}
                                    accept={ALLOWED_FILE_TYPES}
                                />
                            </Button>
                        </Col>
                    </Row>
                    {
                        <Row style={{ direction: 'rtl' }}><Col md="8" className='mb-1 inline-flex'>{showUploadFile("inputName", `financeReportLTY`, { direction: 'ltr' })}</Col></Row>
                    }
                </div>
            </div>
            <CustomButton text={"Save"} handleClick={() =>
                handleAdd('', TitleGroup[0], true, 'financeReportLTY',
                    'documentLaporanKeuangan', 'documentKeuanganYears')} />
            <TableLaporanKeuangan data={filteringArrayByKey(
                store.getState().loan.merchantDocument,
                "documentGroup", [TitleGroup[0]])}
                handleTrash={handleAddForm}
            />
        </MainCard>
        <MainCard title={TitleGroup[1]} actions='collapse'>
            <Row>
                <Col md='6' className='mb-1 inline-flex'>
                    <Label md="4" className='form-label' for={`document-bank-statement`}>
                        Document Name
                    </Label>
                    <Input md="8"
                        type='text'
                        name={`documentBankStatement`}
                        id={`document-bank-statement`}
                        placeholder="Document Name"
                        onChange={
                            (e) => {
                                handleInput(e);
                            }}
                    />
                </Col>
                <Col md='6' className='mb-1 inline-flex'>
                    <Label md="4" className='form-label' for={`year-bank-statement`}>
                        Year
                    </Label>
                    <Input md="4"
                        type='text'
                        maxLength="4"
                        name={`yearBankStatement`}
                        id={`year-bank-statement`}
                        placeholder="Type Year Here"
                        onKeyPress={
                            numberOnlyKey}
                        onChange={
                            (e) => {
                                handleInput(e);
                            }}
                    />
                    <Button color='primary float-right' className='btn-next' tag={Label}>
                        Upload
                        <Input
                            type='file'
                            name={`documentBankStatementRY`}
                            onChange={(e) => { handleUpload(e) }}
                            hidden
                            value={''}
                            accept={ALLOWED_FILE_TYPES}
                        />
                    </Button>
                </Col>
            </Row>
            {
                <Row style={{ direction: 'rtl' }}><Col md="8" className='mb-1 inline-flex'>{showUploadFile("inputName", `documentBankStatementRY`, { direction: 'ltr' })}</Col></Row>
            }
            <CustomButton text={"Save"} handleClick={() =>
                handleAdd('', TitleGroup[1], true, 'documentBankStatementRY',
                    'documentBankStatement', 'yearBankStatement')} />
            <TableLaporanKeuangan data={filteringArrayByKey(
                store.getState().loan.merchantDocument,
                "documentGroup", [TitleGroup[1]])}
                handleTrash={handleAddForm}
            />
        </MainCard>
        <MainCard title={TitleGroup[2]} actions='collapse'>
            <Row>
                <Col md='6' className='mb-1 inline-flex'>
                    <Label md="4" className='form-label' for={`sell-out-report`}>
                        Document Name
                    </Label>
                    <Input md="8"
                        type='text'
                        name={`sellOutReport`}
                        id={`sell-out-report`}
                        onChange={
                            (e) => {
                                handleInput(e);
                            }}
                    />
                </Col>
                <Col md='6' className='mb-1 inline-flex'>
                    <Button color='primary float-right' className='btn-next' tag={Label}>
                        Upload
                        <Input
                            type='file'
                            name={`sellOutReportFile`}
                            onChange={(e) => { handleUpload(e) }}
                            hidden
                            value={''}
                            accept={ALLOWED_FILE_TYPES}
                        />
                    </Button>
                </Col>
            </Row>
            {
                <Row><Col md="8" className='mb-1 inline-flex'>{showUploadFile("inputName", `sellOutReportFile`, { direction: 'ltr' })}</Col></Row>
            }
            {/* <CustomButton text={"Add"} handleClick={() => handleAdd('', TitleGroup[1], true, 'sellOutReportFile')} /> */}
            <CustomButton text={"Save"} handleClick={() =>
                handleAdd('', TitleGroup[2], true, 'sellOutReportFile',
                    'sellOutReport', '')} />
            <TableLaporanKeuangan data={filteringArrayByKey(
                store.getState().loan.merchantDocument,
                "documentGroup", [TitleGroup[2]])}
                handleTrash={handleAddForm}
            />
        </MainCard>
        <MainCard title={TitleGroup[3]} actions='collapse'>
            <Row>
                <Col md='6' className='mb-1 inline-flex'>
                    <Label md="4" className='form-label' for={`Copy-Contract-Kerjasama`}>
                        Document Name
                    </Label>
                    <Input md="8"
                        type='text'
                        name={`copyContractKerjasama`}
                        id={`Copy-Contract-Kerjasama`}
                        onChange={
                            (e) => {
                                handleInput(e);
                            }}
                    />
                </Col>
                <Col md='6' className='mb-1 inline-flex'>
                    <Button color='primary float-right' className='btn-next' tag={Label}>
                        Upload
                        <Input
                            type='file'
                            name={`copyContractKerjasamaFile`}
                            onChange={(e) => { handleUpload(e) }}
                            hidden
                            value={''}
                            accept={ALLOWED_FILE_TYPES}
                        />
                    </Button>
                </Col>
            </Row>
            {
                <Row><Col md="6" className='mb-1 inline-flex'>{showUploadFile("inputName", `copyContractKerjasamaFile`, { direction: 'ltr' })}</Col></Row>
            }
            <CustomButton text={"Save"} handleClick={() =>
                handleAdd('', TitleGroup[3], true, 'copyContractKerjasamaFile',
                    'copyContractKerjasama', '')} />
            <TableLaporanKeuangan data={filteringArrayByKey(
                store.getState().loan.merchantDocument,
                "documentGroup", [TitleGroup[3]])}
                handleTrash={handleAddForm}
            />
        </MainCard>
        <MainCard title={TitleGroup[4]} actions='collapse'>
            <Row>
                <Col md='6' className='mb-1 inline-flex'>
                    <Label md="4" className='form-label' for={`sample-invoice-buyer`}>
                        Document Name
                    </Label>
                    <Input md="8"
                        type='text'
                        name={`sampleInvoiceBuyer`}
                        id={`sample-invoice-buyer`}
                        onChange={
                            (e) => {
                                handleInput(e);
                            }}
                    />
                </Col>
                <Col md='6' className='mb-1 inline-flex'>
                    <Button color='primary float-right' className='btn-next' tag={Label}>
                        Upload
                        <Input
                            type='file'
                            name={`sampleInvoiceBuyerFile`}
                            onChange={(e) => { handleUpload(e) }}
                            hidden
                            value={''}
                            accept={ALLOWED_FILE_TYPES}
                        />
                    </Button>
                </Col>
            </Row>
            {
                <Row><Col md="6" className='mb-1 inline-flex'>{showUploadFile("inputName", `sampleInvoiceBuyerFile`, { direction: 'ltr' })}</Col></Row>
            }
            {/* <CustomButton text={"Add"} handleClick={() => handleAdd('', TitleGroup[4], true, 'sampleInvoiceBuyerFile')} /> */}
            <CustomButton text={"Save"} handleClick={() =>
                handleAdd('', TitleGroup[4], true, 'sampleInvoiceBuyerFile',
                    'sampleInvoiceBuyer', '')} />
            <TableLaporanKeuangan data={filteringArrayByKey(
                store.getState().loan.merchantDocument,
                "documentGroup", [TitleGroup[4]])}
                handleTrash={handleAddForm}
            />
        </MainCard>
        <MainCard title={TitleGroup[5]} actions='collapse'>
            <Row>
                <Col md='8' className='mb-1 inline-flex'>
                    <Label md="4" className='form-label' for={`limit-Amount-Input`}>
                        Jumlah Limit
                    </Label>
                    <TextInput
                        type='text'
                        md='8'
                        name={`limitAmountInput`}
                        id={`limit-Amount-Input`}
                        // placeholder="Input Limit Amount"
                        aria-label={"limit-Amount-Input"}
                        language="idn"
                        value={checkData(store.getState().loan.creditLimitAmount?.value)}
                        onChange={
                            (e) => {
                                dispatch(setCreditAmountLimit({
                                    value: e.value,
                                    id: store.getState().loan.creditLimitAmount?.id
                                }))
                                handleInput(e);
                            }}
                    />
                </Col>
            </Row>
        </MainCard>

    </>);
}

export default LaporanKeuangan;