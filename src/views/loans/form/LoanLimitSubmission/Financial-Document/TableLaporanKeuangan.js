import React from 'react'
import { Table } from 'reactstrap'
import { Trash2, Eye, EyeOff } from 'react-feather'
import { convertFormDataToJSON, openUrl } from '../../../../../utility/Utils'
import { store } from '../../../../../redux/store'
import { useSelector } from 'react-redux'

function TableLaporanKeuangan({ data, handleTrash }) {
    const readOnly = useSelector(state => state.general.readOnly)

    const deleteData = (val, activeStatus) => {
        let form = new FormData();
        form.set('merchantDocumentId', val?.id);
        form.set('loanLimitRequestId', store.getState().loan.loanLimitRequestId);
        form.set('documentGroup', val.documentGroup);
        form.set('documentName', val.documentName);
        form.set('documentUrl', val.documentUrl == undefined ? 'aa' : val.documentUrl);
        form.set('active', false)
        form.set('position', 1)

        // alert("alert===>"+JSON.stringify(convertFormDataToJSON(form)))
        handleTrash(form);
    }

    // {console.log("DATAAA+"+JSON.stringify(data))}
    return (
        <Table className='table-solid-border xl-margin-top xs-margin-bottom'>
            <tbody>
                {
                    data?.map((val, index) => {
                        if (val?.active == true) {
                            return (
                                <tr>
                                    <td className='thick'>{val.documentGroup}</td>
                                    <td colSpan={val?.documentYear != undefined ? '1' : '2'}>{val.documentName}</td>
                                    {val?.documentYear != undefined ?
                                        <td>{val.documentYear}</td> : null}
                                    <td>
                                        <div className='column-action d-flex align-items-center'>
                                            {/* <td>{val.documentDesc}</td> */}
                                            {
                                                val?.documentUrl != undefined ?

                                                    <Eye size={17} className='mx-1 icon-app' onClick={() => {
                                                        openUrl(val.documentUrl)
                                                    }} /> : <EyeOff size={17} className='mx-1 icon-app-off' />
                                            }
                                            {
                                                !readOnly ?
                                                    <Trash2 aria-placeholder='delete record' size={17} className='mx-1 icon-app' onClick={() =>
                                                        deleteData(val, false)
                                                    } /> : null
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    })
                }
            </tbody>
        </Table>
    )
}

export default TableLaporanKeuangan