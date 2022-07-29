import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import Wizard from '@components/wizard'
import CompanyBackground from './form/LoanLimitSubmission/CompanyBackground'
import CompanyInformation from './form/LoanLimitSubmission/CompanyInformation'
import LoanLimitSubmitted from './form/LoanLimitSubmission/LoanLimitSubmitted'
import FinancialDocuments from './form/LoanLimitSubmission/FinancialDocuments'
import Breadcrumbs from '@components/breadcrumbs'
import { DELETE, PG_LOAN_LIMIT_REQ } from '../../utility/Constants'
import CompanyDocuments from './form/LoanLimitSubmission/Company-Background-Document/CompanyDocuments'
import CompanyStructure from './form/LoanLimitSubmission/Company-Background-Structure/CompanyStructure'
import { LookupService } from '../../data/business'
import { useDispatch, useSelector } from 'react-redux'
import { Eye, Trash2 } from 'react-feather'
import { setDocument, setLoanData, setLoanLimitRequestID, setLookupData } from '../../redux/loan'
import { appendUrl, deleteObjectInArray, openUrl, searchKeyObjectInArray, splitText } from '../../utility/Utils'
import { uploadDocData } from '../../redux/upload'
import { UploadService } from '../../data/business/upload/upload'
import { store } from '../../redux/store'
import { LoanService } from '../../data/business/loan/loan'
import { setCompanyBackgroundDocumentList, setCompanyBackgroundList, setCompanyBackgroundStructureList, setCompanyFinancialDocList, setCompanyInformationList } from '../../redux/summary'
import { QrsToObj } from '../../utility/Utils';
import Swal from 'sweetalert2'
import { SwalError, SwalTimer } from '../../utility/layouts'
import { Progress } from 'reactstrap'

const LoanLimitSubmission = () => {
    const ref = useRef(null)
    const qrs = QrsToObj(window.location.search);
    const LOOKUP_COMPANY_FORM = ["city", "country", "state", "business-line", "business-area-coverage"]
    const LOOKUPGROUP = ["COMPANY_DOC_AKTA_PP", "COMPANY_DOC_KEMENKUMHAM", "COMPANY_DOC_BACKGROUND"]
    let llrdGlobal = {
        "loanLimitRequestId": store.getState().loan.loanLimitRequestId == "" ? undefined : store.getState().loan.loanLimitRequestId
    }
    let llrd = {
        "loanLimitRequestId": qrs?.id == undefined ? llrdGlobal?.loanLimitRequestId : qrs.id
    }
    const _service = new LookupService();
    const _loanService = new LoanService();
    const _uploadService = new UploadService();
    const dispatch = useDispatch();

    // ** State
    const [updateCI, setUpdateCI] = useState(false);
    const [updateFD, setUpdateFD] = useState(false);
    const [uploaded, setUploaded] = useState("");
    const [stepper, setStepper] = useState(null);
    const [confirmed, setConfirmation] = useState(false);
    const [progressTracker, setProgressState] = useState(0);
    const userProfile = useSelector(state => state.login.credential);

    useEffect(() => {
        const x = [];

        LOOKUPGROUP.forEach((data, index) => {
            x.push(_service.GetLookupType(
                splitText(data, "_", "-"), {
                Success: (res) => {
                    dispatch(setDocument({ name: data, value: res }));
                }
            }))
        }
        )

        const lookupCountry = [].push(
            LOOKUP_COMPANY_FORM.forEach((data, index) => {
                x.push(_service.GetLookupType(data, {
                    Success: (res) => {
                        dispatch(setLookupData({ type: data, value: res }));
                    }
                }))
            }
            ))

        Promise.all([x, lookupCountry]).then((results) => {
            console.log("Promise Done");

            let profile = {
                'name': userProfile?.companyName,
                'email': userProfile?.email,
            }
            dispatch(setLoanData(profile));
        })

        setConfirmation(true)
    }, [])

    const handleConfirmation = (isConfirm) => {
        setConfirmation(isConfirm)
    }

    //serviceGet
    const getMerchantDataByLoanLimitRequest = () => {
        _loanService.getMerchantDataByLoanLimitRequest(llrd?.loanLimitRequestId == undefined ? llrdGlobal : llrd, {
            Success: (res) => {
                dispatch(setCompanyBackgroundList(res.data))
            }
        });
    }

    const getMerchantBackgroundFilefn = () => {
        _loanService.getMerchantBackgroundFile(llrd?.loanLimitRequestId == undefined ? llrdGlobal : llrd, {
            Success: (res) => {
                dispatch(setCompanyBackgroundDocumentList(res.data))
            }
        });
    }
    const getStructureByLoanLimitIDfn = () => {
        _loanService.getStructureByLoanLimitID(llrd?.loanLimitRequestId == undefined ? llrdGlobal : llrd, {
            Success: (res) => {
                dispatch(setCompanyBackgroundStructureList(res.data))
            }
        });
    }
    const getMerchantInfofn = () => {
        _loanService.getMerchantInfo(llrd?.loanLimitRequestId == undefined ? llrdGlobal : llrd, {
            Success: (res) => {
                dispatch(setCompanyInformationList(res.data))
            }
        });
    }
    const getMerhantDocumentfn = () => {
        _loanService.getMerchantDocument(llrd?.loanLimitRequestId == undefined ? llrdGlobal : llrd, {
            Success: (res) => {
                dispatch(setCompanyFinancialDocList(res.data))
            }
        });
    }

    useEffect(() => {
        if (confirmed) {
            getMerchantDataByLoanLimitRequest();
            getMerchantBackgroundFilefn();
            getStructureByLoanLimitIDfn();
            getMerchantInfofn();
            getMerhantDocumentfn();
            setConfirmation(false);
        }
    }, [confirmed]);

    const setUploadedFile = useCallback(arg => {
        setUploaded(arg)
    }, [setUploaded]);

    const onUpdateFD = useCallback(arg => {
        setUpdateFD(arg)
    }, [updateFD])

    const onUpdateCI = useCallback(arg => {
        setUpdateCI(arg)
    }, [updateFD])

    // { console.log("nilaip" + progressTracker); }
    const showUploadFile = (key, value, styled) => {
        var x = searchKeyObjectInArray(store.getState().upload.UploadDoc, key, value)
        if (x) {
            return (<span style={styled}>
                {x.filename}
                <Eye size={17} className='mx-1 icon-app' onClick={() => {
                    openUrl(appendUrl(x.fileUrl))
                }} />
                <Trash2 size={17} className='mx-1 icon-app' onClick={() => {
                    deleteUploaded(key, value)
                    // dispatch(uploadDocData(deleteObjectInArray(store.getState().upload.UploadDoc, key, value)))
                    setUploaded(value)
                }} />
            </span>)
        }
    }

    const deleteUploaded = (key, value) => {
        dispatch(uploadDocData(deleteObjectInArray(store.getState().upload.UploadDoc, key, value)))
    }

    const countTime = (num) => {
        return num;
    }
    const memoizeCountTime = useMemo(() => countTime(progressTracker), [progressTracker])

    useEffect(() => {
        // console.log("mana datanya" + memoizeCountTime);
    }, [memoizeCountTime])


    const handleUpload = (e, type) => {
        if (type != DELETE) {
            const formData = new FormData();
            const file = e.target.files?.[0];
            if (file) {
                let max = 50;
                let { size, name } = file;
                let sizeInMb = size / 1024 / 1024;
                if (sizeInMb > max) {
                    Swal.fire({
                        title: 'Error!',
                        text: "Ukuran file melebihi batas maksimal",
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                    return;
                }
                formData.append('file', file);
                const fr = new FileReader();
                fr.onload = function () {
                    _uploadService.PostUploadFIle(formData, {
                        Success: (res) => {
                            let temp = Object.assign(res.data, { "inputName": e.target.name })
                            let array = store.getState().upload.UploadDoc.map(a => ({ ...a }));
                            let objKey = searchKeyObjectInArray(array, "inputName", e.target.name);
                            if (objKey == undefined) {
                                array.push(temp)
                            } else {
                                var index = array.findIndex(p => p.inputName == e.target.name);
                                Object.assign(array[index], temp)
                            }
                            dispatch(uploadDocData(array))
                            setProgressState(0);
                            setUploaded("hu-" + e.target.name)

                            SwalTimer("Upload Finished", 1000)
                        },
                        PercentageTracker: progressTracker => {
                            // setProgressState(0)                        
                            setTimeout(() => {
                                setProgressState(progressTracker)
                            }, 100);
                        },
                        Errors: (status, data) => {
                            SwalError(status, JSON.stringify(data))
                        }
                    });
                }
                fr.readAsDataURL(file);
            }

            Swal.fire({
                title: 'Upload File..',
                html: `Upload <b>${file?.name}</b> to Server<p></p>`,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    // const b = Swal.getHtmlContainer().querySelector('p')
                    // b.textContent = progressTracker
                },
                allowOutsideClick: false
            })
        }else{
            deleteUploaded(e?.key, e?.value)
        }
    }

    const steps = [
        {
            id: 'company-background',
            title: 'Company Background',
            subtitle: 'Company Background',
            content: <CompanyBackground llrd={llrd} stepper={stepper} getMerchantInfofn={getMerchantInfofn}
                showUploadFile={showUploadFile}
                handleUpload={handleUpload} setUploaded={setUploadedFile} type='wizard-vertical' />
        },
        {
            id: 'company-background-document',
            title: 'Company Background Document',
            subtitle: 'Company Background Document',
            content: <CompanyDocuments stepper={stepper} showUploadFile={showUploadFile}
                deleteUploaded={deleteUploaded}
                handleUpload={handleUpload} setUploaded={setUploadedFile} type='wizard-vertical' />
        },
        {
            id: 'company-background-structure',
            title: 'Company Background Structures',
            subtitle: 'Company Background Structures',
            content: <CompanyStructure stepper={stepper} showUploadFile={showUploadFile} onUpdateCI={onUpdateCI}
                handleUpload={handleUpload} setUploaded={setUploadedFile} type='wizard-vertical' />
        },
        {
            id: 'company-information',
            title: 'Company Information',
            subtitle: 'Add Company Information',
            content: <CompanyInformation onUpdateFD={onUpdateFD} stepper={stepper}
                GetMerchantInfofn={getMerchantInfofn} isLive={updateCI} type='wizard-vertical' />
        },
        {
            id: 'financial-documents',
            title: 'Financial Documents',
            subtitle: 'Financial Documents',
            content: <FinancialDocuments llrd={llrd} stepper={stepper}
                showUploadFile={showUploadFile} handleUpload={handleUpload}
                setUploaded={setUploadedFile} handleNext={handleConfirmation} type='wizard-vertical'
                isLive={updateFD}
            />
        },
        {
            id: 'loan-limit-submitted',
            title: 'Confirmation Data',
            subtitle: 'Confirm Input',
            content: <LoanLimitSubmitted stepper={stepper} type='wizard-vertical' />
        }
    ]

    return (
        <>
            <Breadcrumbs title={PG_LOAN_LIMIT_REQ} data={[{ title: 'Loan' }, { title: PG_LOAN_LIMIT_REQ }]} />
            <div className='vertical-wizard'>
                <Wizard
                    type='vertical'
                    ref={ref}
                    steps={steps}
                    options={{
                        linear: false
                    }}
                    instance={el => setStepper(el)}
                />
                <p style={{ color: 'red' }}>{store.getState().loan.loanLimitRequestId}</p>
            </div>
        </>
    );
}

export default LoanLimitSubmission;