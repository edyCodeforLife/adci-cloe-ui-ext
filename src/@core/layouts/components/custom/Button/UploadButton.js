import React from 'react'
import { Label, Button, Input } from 'reactstrap';
import { ALLOWED_FILE_TYPES } from '../../../../../utility/Constants';
import { Spinner } from 'reactstrap';
import { store } from '../../../../../redux/store';

const UploadButton = ({ isLoading, handleUpload, nameInput, showUploadFile }) => {

    return (
        <>
            <Button color='primary float-right' className='btn-next' tag={Label}>
                <span className='align-middle d-sm-inline-block d-none'>Upload</span>
                <Input
                    type='file'
                    name={nameInput}
                    onChange={(e) => { handleUpload(e) }}
                    hidden
                    value={''}
                    accept={ALLOWED_FILE_TYPES}
                />
{/*                 
                        <Spinner type={"grow"} style={{ width: '1rem', height: '1rem', color: 'white' }}
                            children={false}
                        /> */}
                                </Button>
            <div>{showUploadFile("inputName", nameInput)}</div>
        </>
    )
}

export default UploadButton