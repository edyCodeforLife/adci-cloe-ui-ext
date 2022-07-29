import React from 'react'
import MainCard from '@core/layouts/components/custom/MainCard';
import { TableCD } from '../Company-Background-Document/TableCompanyDocuments';
import { useSelector } from 'react-redux';

function ConfirmedCompanyDocument() {
  const companyDocumentData = useSelector(state=>state.summary.companyDocument)
  
  return (
    <MainCard title={"Company Document"} actions='collapse'>
      <div className='content-header'>
        <h5 className='mb-0'>Company Document</h5>
        <small className='text-muted'>Document</small>
        <TableCD contents={companyDocumentData} />
      </div>
    </MainCard>
  )
}

export default ConfirmedCompanyDocument