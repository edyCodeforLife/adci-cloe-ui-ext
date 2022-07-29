import React, { memo, useState } from 'react';
import { Table } from 'reactstrap'
import {
    Trash2, Eye, EyeOff
} from 'react-feather'
import { openUrl } from '../../../../../utility/Utils';
import { useSelector } from 'react-redux';

function TableCompanyDocuments({ contents, handleTrash }) {

    const title = ["Group", "Type", "Year", "Notes", "Action"];
    const readOnly = useSelector(state => state.general.readOnly)

    const deleteItem = (val) => {
        const form = new FormData();
        form.set('loanLimitRequestId', val?.loanLimitRequestId);
        form.set('documentGroup', val?.documentGroup);
        form.set('documentType', val?.documentType);
        form.set('documentYear', val?.documentYear == undefined ? 0 : val?.documentYear);
        form.set('documentNotes', val?.documentNotes);
        let file = val?.documentUrl;
        form.set('documentFile', file == undefined ? '' : file)
        form.set('position', val.position);
        form.set('merchantBackFileId', val.id)
        form.set('active', false)
        handleTrash(form)
    }

    return (
        <>
            <Table
                striped
                style={{
                    height: '100px'
                }}
            >
                <thead>
                    <tr>
                        {title?.map((item, idx) => (
                            <th key={idx}>
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        contents?.map((val, index) => {
                            if (val?.active == true) {
                                return <tr key={val?.id}>
                                    <th scope="row">{val?.documentGroup}</th>
                                    <td>{val?.documentType}</td>
                                    <td>{val?.documentYear}</td>
                                    <td>{val?.documentNotes == "undefined" ? '' : val?.documentNotes}</td>
                                    <td><div className='column-action d-flex align-items-center'>
                                        {val?.documentUrl != undefined ?
                                            <Eye size={17} className='mx-1 icon-app' onClick={() => {
                                                openUrl(val.documentUrl)
                                            }} /> : <EyeOff size={17} className='mx-1 icon-app-off' />}
                                        {
                                            !readOnly ?
                                                <Trash2 size={17} className='mx-1 icon-app'
                                                    onClick={() => {
                                                        deleteItem(val)
                                                    }}
                                                /> : null
                                        }
                                    </div>
                                    </td>
                                </tr>
                            }
                        })
                    }
                    {/* {configTable?.data?.map((data, idx) => (
                        <tr key={idx}>
                            <th scope="row">{data?.Job_Number}</th>
                            <td>{data?.Company_Name}</td>
                            <td>{data?.User}</td>
                            <td>{data?.Created_Date}</td>
                            <td>{data?.status}</td>
                            <td>
                                <span onClick={() => redirectTo()} className='text-link'>Details</span>
                            </td>
                        </tr>
                    ))} */}

                </tbody>
            </Table>
        </>
    )
}

export const TableCD = memo(TableCompanyDocuments);