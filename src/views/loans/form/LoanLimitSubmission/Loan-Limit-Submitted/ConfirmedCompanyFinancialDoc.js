import React from 'react'
import MainCard from '@core/layouts/components/custom/MainCard';
import TableLaporanKeuangan from '../Financial-Document/TableLaporanKeuangan';
import { useSelector } from 'react-redux';

function ConfirmedCompanyFinancialDoc() {
  const companyFinancialData = useSelector(state=>state.summary.financialDocument)

  return (
    <MainCard title={"Financial Document"} actions='collapse'>
      <div className='content-header'>
        <h5 className='mb-0'>Financial Document</h5>
        <small className='text-muted'>Document</small>
        <TableLaporanKeuangan data={companyFinancialData} />
      </div>
    </MainCard>
  )
}

export default ConfirmedCompanyFinancialDoc