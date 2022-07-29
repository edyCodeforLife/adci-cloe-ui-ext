import React from 'react'
import MainCard from '@core/layouts/components/custom/MainCard';
import { useSelector } from 'react-redux';
import TableCompanyInformation from '../Company-Information.js/TableCompanyInformation';

function ConfirmedCompanyInformation() {
  const companyInformationData = useSelector(state=>state.summary.companyInformation)

  return (
    <MainCard title={"Company Information"} actions='collapse'>
      <div className='content-header'>
        <h5 className='mb-0'>Company Information</h5>
        <small className='text-muted'>Document</small>
        <TableCompanyInformation data={companyInformationData} />
      </div>
    </MainCard>
  )
}

export default ConfirmedCompanyInformation