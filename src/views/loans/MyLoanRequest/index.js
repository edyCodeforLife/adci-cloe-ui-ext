
import MainCard from '@layouts/components/custom/MainCard'
import Breadcrumbs from '@components/breadcrumbs'
import { PG_MY_LOAN_REQ, STATUS_APPROVED_BY_ALL_COMMITTE } from '../../../utility/Constants'
import { LoanService } from '../../../data/business/loan/loan'
import { useDispatch, useSelector } from 'react-redux'
import { resetMyLoanData, setSubmittedLoanRequest } from '../../../redux/myLoan'
import { useCallback, useEffect, useState } from 'react'
import TableStatus from '@core/layouts/components/custom/Table/TableStatus'
import { store } from '../../../redux/store'
import TextScreen from '../../TextScreen'
import { CustomTable } from '../../../@core/layouts/components/custom/Table/CustomTable'
import { PATH_FORM_LOAN_LIMIT_REQ, PATH_MY_LOAN_REQ } from '../../../navigation/path'
import { resetLoanData, setLoanLimitRequestID } from '../../../redux/loan'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetSummaryData } from '../../../redux/summary'
import { resetUploadData } from '../../../redux/upload'
import DataDisplay from './DataDisplay'
import { filteringArrayByKey, searchKeyObjectInArray } from '../../../utility/Utils'
import { resetGeneral, setReadOnly } from '../../../redux/general'

const MyLoanRequest = () => {
  const location = useLocation();
  const _service = new LoanService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nav, setnav] = useState(false);
  const [dataChoose, setDataChoose] = useState();
  const Data = useSelector(state => state.myLoan.submittedLoanRequest)

  const resetAllData = () => new Promise((resolve, reject) => {
    dispatch(resetLoanData())
    dispatch(resetGeneral())
    dispatch(resetSummaryData())
    dispatch(resetUploadData())
    dispatch(resetMyLoanData())
    resolve();
  });

  const setNavData = useCallback(arg => {
    setnav(arg)
  }, [setnav]);

  useEffect(() => {
    resetAllData().then(
      _service.getSubmittedLoanLimitReqByCustomerID(
        {
          'customerId': store.getState().login.credential?.customerId,
          'offset': 0,
          'limit': 10
        }
        , {
          Success: (res) => {
            dispatch(setSubmittedLoanRequest(res.data));
          }
        })
    )
  }, [])

  const redirectTo = (IdPassed) => {
    dispatch(setLoanLimitRequestID(IdPassed))
    dispatch(setReadOnly(true))

    let dataFind = searchKeyObjectInArray(Data, 'loanLimitRequestId', IdPassed)
    setnav(true);
    // alert(dataFind?.status)
    setDataChoose(dataFind);
    navigate(PATH_MY_LOAN_REQ + '?id=' + IdPassed)
  }

  const switchRender = () => {
    if (location.search === "") {
      return <CustomTable
        striped
        configTable={configTable}
        redirectTo={redirectTo}
        jobNumber={true}
        amount={true}
      />
    } else {
      return <DataDisplay isNav={nav} setNavData={setNavData} dataChoose={dataChoose} />
    }
  }

  const configTable = {
    title: ["No", "Job Number", "Transaction ID", "User", "Created Date", "Last Update", "Amount", "Status"],
    data: Data
  }

  return (<>
    <Breadcrumbs title={PG_MY_LOAN_REQ} data={[{ title: 'Loan' }, { title: PG_MY_LOAN_REQ }]} />
    <MainCard>
      {
        switchRender()
      }
    </MainCard>
  </>
  )
}

export default MyLoanRequest
