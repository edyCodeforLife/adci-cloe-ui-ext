import { lazy } from 'react'
import { PATH_CONFIRMATION, PATH_FORM_LOAN_LIMIT_REQ, PATH_LOAN_LIMIT_REQ, PATH_LOAN_SUBMIT, PATH_MY_LOAN_REQ, PATH_UPLOAD_AGGREMENT } from '../../navigation/path'
import LoanLimitSubmission from '../../views/loans/LoanLimitSubmission'
import AcceptApproval from '../../views/loans/MyLoanRequest/OfferingLoan/AcceptProposal'

const LoanLimitRequest = lazy(() => import('../../views/loans/index'))
const MyLoanReq = lazy(()=>import('../../views/loans/MyLoanRequest'))
const FinishSubmit = lazy(()=>import('../../views/loans/form/LoanLimitSubmission/FinishSubmitted'))
const TextScreen = lazy(() => import('../../views/TextScreen'))

const CustomerRoutes = [
  {
    path: PATH_LOAN_LIMIT_REQ,
    element: <LoanLimitRequest />
  },
  {
    path: PATH_MY_LOAN_REQ,
    element: <MyLoanReq />
  },
  {
    path: PATH_LOAN_SUBMIT,
    element: <FinishSubmit />
  },
  {
    path: PATH_CONFIRMATION,
    element: <TextScreen />
  },
  {
    path: PATH_UPLOAD_AGGREMENT,
    element: <AcceptApproval />
  },
  {
    path: PATH_FORM_LOAN_LIMIT_REQ,
    element: <LoanLimitSubmission />
  }
]

export default CustomerRoutes
