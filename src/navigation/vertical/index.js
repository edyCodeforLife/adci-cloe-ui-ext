import { Mail, Home, Circle, Activity } from 'react-feather'
import { PATH_DASHBOARD, PATH_LOAN_LIMIT_REQ, PATH_MY_LOAN_REQ } from '../path'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: PATH_DASHBOARD
  },
  {
    id: 'loans',
    title: 'Loan',
    icon: <Activity size={20} />,
     children: [
      {
        id: 'loanLimitReq',
        title: 'Loan Limit Request',
        icon: <Circle size={12} />,
        navLink: PATH_LOAN_LIMIT_REQ
      },
      {
        id: 'myLoanRequest',
        title: 'My Loan Limit Request',
        icon: <Circle size={12} />,
        navLink: PATH_MY_LOAN_REQ
      }
    ]
  }
]
