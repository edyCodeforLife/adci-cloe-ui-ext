import React from 'react'
import { Table } from 'reactstrap'
import { Trash2, Eye, EyeOff } from 'react-feather'
import classNames from 'classnames'
import { appendUrl, openUrl, searchKeyObjectInArray } from '../../../../../utility/Utils'
import { store } from '../../../../../redux/store'
import { useSelector } from 'react-redux'

function TableCompanyBackgroundStructure({ data = [], handleTrash }) {
    const readOnly = useSelector(state => state.general.readOnly)
    const MAX = 3;

    const deleteData = (val, activeStatus) => {
        const form = new FormData();
        form.set('merchantStructureId', val.id);
        form.set('loanLimitRequestId', store.getState().loan.loanLimitRequestId);
        form.set('structureGroup', val?.structureGroup);
        for (var x = 0; x < MAX; x++) {
            form.set('label' + (x + 1), val?.["label" + (x + 1)]);
            form.set('field' + (x + 1), val?.[val?.structureGroup + "_input_" + (x + 1)]);
        }
        let ktpFile = appendUrl(searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", val?.structureGroup + "_ktpFile")?.["fileUrl"]);
        let npwpFile = appendUrl(searchKeyObjectInArray(store.getState().upload.UploadDoc, "inputName", val?.structureGroup + "_npwpFile")?.["fileUrl"]);
        if (npwpFile != undefined)
            form.set('npwpFile', npwpFile);
        if (ktpFile != undefined)
            form.set('ktpFile', ktpFile);
        form.set('position', '1');
        form.set('active', activeStatus);
        handleTrash(form)
    }


    return (
        <> {
            data?.map((val, index) => {
                if (val?.active == true) {
                    return (
                        <Table className='table-solid-border xl-margin-top xs-margin-bottom'>
                            <tbody>
                                <tr className='title-table'><td colSpan="2">{val?.structureGroup}
                                    {
                                        !readOnly ?
                                            <Trash2 size={17} className='mx-1 icon-app-white'
                                                onClick={() => deleteData(val, false)} /> : null
                                    }
                                </td>
                                </tr>
                                {val?.field1 != undefined ?
                                    <tr>
                                        <td className='thick'>{val?.label1}</td>
                                        <td>{val?.field1}</td>
                                    </tr> : null
                                }{
                                    val?.field2 != undefined ?
                                        <tr>
                                            <td className='thick'>{val?.label2}</td>
                                            <td>{val?.field2}</td>
                                        </tr> : null
                                }              
                                {
                                    val?.field3 != undefined ?
                                        <tr>
                                            <td className='thick'>{val?.label3}</td>
                                            <td>{val?.field3}</td>
                                        </tr> : null
                                }
                                <tr>
                                    <td><div className='column-action d-flex align-items-center'>
                                        Ktp
                                        {
                                            val.ktpUrl != undefined ?
                                                <Eye size={17} className='mx-1 icon-app' onClick={() => {
                                                    openUrl(val.ktpUrl)
                                                }} /> : <EyeOff size={17} className='mx-1 icon-app-off' />
                                        }
                                    </div>
                                    </td>
                                    <td><div className='column-action d-flex align-items-center'>
                                        Npwp
                                        {
                                            val.npwpUrl != undefined ?
                                                <Eye size={17} className='mx-1 icon-app' onClick={() => {
                                                    openUrl(val.npwpUrl)
                                                }} /> : <EyeOff size={17} className='mx-1 icon-app-off' />
                                        }
                                    </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table >

                    )
                }
            })
        }    </>)
}

export default TableCompanyBackgroundStructure