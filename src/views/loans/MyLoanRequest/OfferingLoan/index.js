import React, { useState, useEffect } from 'react';
import MainCard from '../../../../@core/layouts/components/custom/MainCard';
import avatar1 from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import AvatarGroup from '@components/avatar-group'
// ** Icons Imports
import { MoreVertical, Edit, Trash, Check, X } from 'react-feather'
// ** Reactstrap Imports
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import { PATH_UPLOAD_AGGREMENT } from '../../../../navigation/path';
import { APPROVED_LETTER, REJECT__LETTER } from '../../../../utility/Constants';
import { useSelector } from 'react-redux';
import Divider from '../../../../@core/layouts/components/custom/Divider/Divider';
import { MyLoanService } from '../../../../data/business';
import { formatCurrency } from '../../../../utility/Utils';

const OfferingLoan = ({ data }) => {
    const _service = new MyLoanService();
    const navigation = useNavigate();

    const handleClick = (status) => {
        if (status == APPROVED_LETTER) {
            _service.approveLoanLimitReqLetter({
                "loanLimitRequestId": data?.loanLimitRequestId
            }, {
                Success: (res) => {
                    navigation(PATH_UPLOAD_AGGREMENT)
                }
            })
        } else {
            _service.rejectLoanLimitReqLetter({
                "loanLimitRequestId": data?.loanLimitRequestId
            }, {
                Success: (res) => {
                    alert("Succesfully Rejected")
                }
            })
        }
    }

    return (<>
        <MainCard>
            <p>Hi Sugianto</p>
            <p>Your Credit Loan Request form with Credit Limit Loan Request Job Number #1234567 has been processed,
                bellow is Boost Offering Loan Limit Letter. </p>
            <Table bordered responsive>
                <thead className='table-dark'>
                    <tr>
                        <th>No</th>
                        <th>Company Name</th>
                        <th>Customer Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            1
                        </td>
                        <td>
                            <img className='me-75' src={avatar1} alt='angular' height='20' width='20' />
                            <span className='align-middle fw-bold'>{data?.companyName}</span>
                        </td>
                        <td>{data?.customerName}</td>
                        <td>
                            {
                              formatCurrency(data?.amount)
                            }                           
                        </td>
                    </tr>
                </tbody>
            </Table>
        </MainCard>
        <Button color='primary' className='btn-next right-float margin-top-small' style={{ color: 'gray' }} onClick={() => handleClick(APPROVED_LETTER)}>
            <span className='align-middle d-sm-inline-block d-none'>Approved</span>
            <Check size={14} className='align-middle ms-sm-25 ms-0'></Check>
        </Button>
        <Button color='primary' className='btn-next ltr-direction margin-top-small' style={{ float: 'right' }} onClick={() => handleClick(REJECT__LETTER)}>
            <span className='align-middle d-sm-inline-block d-none'>Reject</span>
            <X size={14} className='align-middle ms-sm-25 ms-0'></X>
        </Button>
        <Divider />
    </>);
}

export default OfferingLoan;