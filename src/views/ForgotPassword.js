// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

import { FORGOT_PASSWORD_DARK, FORGOT_PASSWORD_ } from '../utility/Source';
import PreDashboardWrapper from './PreDashboardWrapper'

const ForgotPassword = () => {
  // ** Hooks
  const { skin } = useSkin()

  const illustration = skin === 'dark' ? FORGOT_PASSWORD_DARK : FORGOT_PASSWORD_;

  return (
    <PreDashboardWrapper bgPage={illustration}>
      <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
        <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
          <CardTitle tag='h2' className='fw-bold mb-1'>
            Forgot Password? 🔒
          </CardTitle>
          <CardText className='mb-2'>
            Enter your email and we'll send you instructions to reset your password
          </CardText>
          <Form className='auth-forgot-password-form mt-2' onSubmit={e => e.preventDefault()}>
            <div className='mb-1'>
              <Label className='form-label' for='login-email'>
                Email
              </Label>
              <Input type='email' id='login-email' placeholder='john@example.com' autoFocus />
            </div>
            <Button color='primary' block>
              Send reset link
            </Button>
          </Form>
          <p className='text-center mt-2'>
            <Link to='/login'>
              <ChevronLeft className='rotate-rtl me-25' size={14} />
              <span className='align-middle'>Back to login</span>
            </Link>
          </p>
        </Col>
      </Col>
    </PreDashboardWrapper>
  )
}

export default ForgotPassword
