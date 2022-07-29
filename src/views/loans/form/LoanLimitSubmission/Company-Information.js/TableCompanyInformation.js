import React from 'react'
import { Table } from 'reactstrap'

function TableCompanyInformation({ data = [] }) {
    return (
        <>
            <Table className='table-solid-border xl-margin-top xs-margin-bottom'>
                <thead>
                    <tr><th>Field Name</th><th>Field Value</th></tr>
                </thead>
                <tbody>
                    {
                        data?.map((val, index) => {
                            if (val?.active == true) {
                                return (
                                    <tr><td>{val?.fieldName}</td>
                                        <td>{val?.fieldValue}</td></tr>
                                )
                            }
                        })
                    }
                </tbody>
            </Table >
        </>)
}

export default TableCompanyInformation