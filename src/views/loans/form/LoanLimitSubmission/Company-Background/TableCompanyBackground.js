import React from 'react'
import { Table } from 'reactstrap'
import { Trash2, Eye } from 'react-feather'
import { useTranslation } from 'react-i18next'

function TableCompanyBackground({ contents }) {

    const {t} = useTranslation();
    const name = ["Type", "Value"]
    const title = ['name', 'email', 'phone', 'address', 'city', 'country', 'province', 'postalCode'
        , 'npwpNo', 'nibNo', 'product', 'businessLine', 'businessAreaCoverage'
    ]

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
                        {name?.map((item, idx) => (
                            <th key={idx}>
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        title?.map((val, index) => {
                            {
                                if (contents?.[val] != "undefined") {
                                    return <tr key={contents?.id + "-" + index}>
                                        <td>{t(val)}</td>
                                        <td>{contents?.[val]}</td>
                                    </tr>
                                }
                            }
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default TableCompanyBackground