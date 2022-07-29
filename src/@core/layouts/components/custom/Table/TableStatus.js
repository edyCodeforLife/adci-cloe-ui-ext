import React from 'react'
import { useSelector } from 'react-redux'
// ** Custom Components
import AvatarGroup from '@components/avatar-group'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-11.jpg'

// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const TableStatus = (props) => {

    const { Data = [], handleClick } = props;

    const generateTitle = () => {
        let temp = [];
        temp.push(<th>Number</th>)
        for (var ttl in Data[0]) {
            temp.push(<th>
                {ttl}
            </th>);
        }
        return temp;
    }

    const determineStatus = (amount, status) => {
        // console.log(amount, status)
        switch(status)
        {
            case 1 : 
                return "complete 1";
            case 0 :
                return "Incomplete 0";
            default :
                return "Invalidate"
        }
    }

    const generateContent = () => {
        let temp = [];
        Data.map((val, index) => {
            temp.push(<tr>
                <td>{index + 1}</td>
                <td className='td-url-table'>
                    <span onClick={() => handleClick(val.id)}>
                        {val.id}
                    </span>
                </td>
                <td>{val.amount}</td>
                <td>{determineStatus(val.amount, val.status)}</td></tr>)
        })
        return temp;
    }

    return (
        <>
            <Table bordered responsive>
                <thead className='table-dark'>
                    <tr>
                        {
                            generateTitle()
                        }
                    </tr>
                </thead>
                <tbody>
                    {generateContent()}
                </tbody>
            </Table>

        </>
    )
}

export default TableStatus