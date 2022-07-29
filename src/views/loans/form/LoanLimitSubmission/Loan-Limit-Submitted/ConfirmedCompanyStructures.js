import React from 'react'
import MainCard from '@core/layouts/components/custom/MainCard';
import TableCompanyBackgroundStructure from '../Company-Background-Structure/TableCompanyBackgroundStructure';
import { useSelector } from 'react-redux';

function ConfirmedCompanyStructures() {
  const companyStructureData = useSelector(state=>state.summary.companyBackgroundStructure)

  return (
    <MainCard title={"Company Background Structures"} actions='collapse'>
    <div className='content-header'>
        <h5 className='mb-0'>Company Background Structures</h5>
        <small className='text-muted'>Document</small>
        <TableCompanyBackgroundStructure data={companyStructureData} />
    </div>
</MainCard>
  )
}

export default ConfirmedCompanyStructures