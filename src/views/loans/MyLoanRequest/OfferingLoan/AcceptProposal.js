import React, { useState, useEffect } from 'react';
import { Eye, Trash2 } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Button, Input, Label } from 'reactstrap'
import Swal from 'sweetalert2';
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import { LoanService } from '../../../../data/business';
import { UploadService } from '../../../../data/business/upload/upload';
import { store } from '../../../../redux/store';
import { uploadDocData } from '../../../../redux/upload';
import { ALLOWED_FILE_TYPES } from '../../../../utility/Constants';
import { SwalError, SwalTimer } from '../../../../utility/layouts';
import { appendUrl, deleteObjectInArray, openUrl, searchKeyObjectInArray } from '../../../../utility/Utils';

const AcceptApproval = ({ data }) => {

    const _service = new LoanService();
    const _uploadService = new UploadService();
    const [fileName, setFileName] = useState("");
    const [uploaded, setUploaded] = useState("");
    const [progressTracker, setProgressState] = useState(0);
    const dispatch = useDispatch();

    const styleUpload = {
        marginLeft: '10px'
    }

    const submit = () => {
        Swal.fire({
            title: 'Do you want to submit the document?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                _service.saveUploadCreditSignAggrement({
                    "loanLimitRequestId": data?.loanLimitRequestId,
                    "fileUrl": appendUrl(fileName)
                }, {
                    Success: (res) => {
                        Swal.fire(
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfully Submit',
                                text: 'All Process Cleared',
                            }).then((result) => {
                                
                            }
                            ))
                    },
                    Errors: (res, data) => {
                        if (fileName.length > 0)
                            Swal.fire(
                                {
                                    icon: 'error',
                                    title: 'Something Went Wrong (' + res + ')',
                                    text: data?.error,
                                })
                        else
                            SwalError(res, "File cannot be empty. Please Upload Your Document First")
                    }
                })
            }
        })
    }

    const showUploadFile = (key, value, styled) => {
        var x = searchKeyObjectInArray(store.getState().upload.UploadDoc, key, value)
        if (x) {
            return (<span style={styled}>
                {x.filename}
                <Eye size={17} className='mx-1 icon-app' onClick={() => {
                    openUrl(appendUrl(x.fileUrl))
                }} />
                <Trash2 size={17} className='mx-1 icon-app' onClick={() => {
                    dispatch(uploadDocData(deleteObjectInArray(store.getState().upload.UploadDoc, key, value)))
                    setUploaded(value)
                }} />
            </span>)
        }
    }

    const _uploadFile = (e) => {
        const formData = new FormData();
        const file = e.target.files?.[0];
        if (file) {
            let max = 50;
            let { size, name } = file;
            let sizeInMb = size / 1024 / 1024;
            if (sizeInMb > max) {
                Swal.fire({
                    title: 'Error!',
                    text: "File Size exceeds maximal limit",
                    icon: 'error',
                    confirmButtonText: 'Ok'
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
                        setFileName(res?.data?.fileUrl);
                        SwalTimer("Upload Finished", 1000)
                    },
                    PercentageTracker: progressTracker => {
                        // setProgressState(0)                        
                        setTimeout(() => {
                            setProgressState(progressTracker)
                        }, 100);
                    },
                    Errors: (status, data) => {
                        if (fileName == null)
                            SwalError(status, "File cannot be empty")
                        else
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

    }

    return (<>
        <MainCard>
            <p className='md-font-size underline'>Hi <span className='thick'>{store.getState().login.credential?.username}</span></p>
            <p>Thank you for your approvals. You are not far away from your first digital financing experience,
                Please download Boost Credit Indonesia agreement bellow and signed off the agreement.
            </p>
            <p><a className='mb-1' href='http://10.194.33.13:8090/api/file/view/OwYxe72Nhi'>Download Aggrement File</a></p>
            <p>Please upload the <b>Boost Credit Indonesia agreement</b> once you have signed through bellow button, and click Submit button: </p>
            <div>
                <Button color='primary' className='btn-next ltr-direction margin-top-small' tag={Label}>
                    <span className='align-middle d-sm-inline-block d-none'>Browse</span>
                    <Input
                        type='file'
                        name={`aggrementPdfFile`}
                        onChange={(e) => _uploadFile(e)}
                        hidden
                        value={''}
                        accept={ALLOWED_FILE_TYPES}
                    />
                </Button>

                {
                    showUploadFile("inputName", "aggrementPdfFile", styleUpload)
                }

                <Button color='primary' className='btn-next right-float margin-top-small' style={{ float: 'right' }} onClick={() => submit()}>
                    <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                </Button>
            </div>
        </MainCard>
    </>);
}

export default AcceptApproval;