import React from 'react'

const ToastContent = ({ code, res }) => {
    return (
        <div className='d-flex'>
            <div className='me-1'>
            </div>
            <div className='d-flex flex-column'>
                <div className='d-flex justify-content-between'>
                    <h6>{code}</h6>
                </div>
                <div className='d-flex justify-content-between'>
                </div>
                <span>Error Happen When Try To Login : {res}</span>
            </div>
        </div>
    )
}

export default ToastContent