import React from 'react'
import MainCard from '@core/layouts/components/custom/MainCard';
import { useSelector } from 'react-redux';
import TableCompanyBackground from '../Company-Background/TableCompanyBackground';

function ConfirmedCompanyBackground() {
  const companyBackgroundData = useSelector(state=>state.summary.companyBackground)

  return (
    <MainCard title={"Company Background Document"} actions='collapse'>
      <div className='content-header'>
        <h5 className='mb-0'>Company Background Document</h5>
        <small className='text-muted'>Document</small>
        <TableCompanyBackground contents={companyBackgroundData} />
      </div>
    </MainCard>
  )
}

export default ConfirmedCompanyBackground