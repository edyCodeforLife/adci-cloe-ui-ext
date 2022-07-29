// ** React Imports
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'
import { REGISTER_DARK, REGISTER_ } from '../utility/Source';

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import PreDashboardWrapper from './PreDashboardWrapper'
import { AuthService } from '../data/business/auth/auth'
import { PATH_LOGIN } from '../navigation/path'
import { store } from '../redux/store'
import { useEffect, useState } from 'react'

const Register = () => {
  // ** Hooks
  const _service = new AuthService();
  const navigate = useNavigate();
  const { skin } = useSkin()
  const illustration = skin === 'dark' ? REGISTER_DARK : REGISTER_;
  const [password, setPassword] = useState("");
  const [confirmPwd, setconfirmPwd] = useState("");
  const [isNotMatch, setIsnotMatch] = useState(true);

  const handleRegister = () => {
    let payload = {
      "email": store.getState().login.credential.username + "----", //'andi.cust@gmail.com',
      "password": password,
      "confirmPassword": confirmPwd
    }
    _service.UpdatePassword(payload, {
      Success: (res) => {
        SwalTimer("Upload Finished", 1000).then((result) =>
          navigate(PATH_LOGIN))
      }
    })
  }

  useEffect(() => {
    let notMatch = true;
    if (confirmPwd !== "" ) {
      if (password !== "" && confirmPwd !== password) {
        notMatch = true
      } else {
        notMatch = false;
      }
    }

    setIsnotMatch(notMatch);
    // if(store.getState().credential==undefined)
    //   navigate(PATH_LOGIN)
  }, [confirmPwd]);

  return (
    <PreDashboardWrapper bgPage={illustration}>
      <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
        <Col className='px-xl-2 mx-auto' xs='12' sm='8' md='6' lg='12'>
          <CardTitle tag='h2' className='fw-bold mb-1'>
            Reset Password 🚀
          </CardTitle>
          <CardText className='mb-2'>You Required to change your password to activate your account</CardText>
          <Form className='auth-register-form mt-2' onSubmit={e => e.preventDefault()}>
            <div className='mb-1'>
              <Label className='form-label' for='register-password'>
                New Password
              </Label>
              <InputPasswordToggle className='input-group-merge' id='register-password' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='register-password'>
                Confirm Password
              </Label>
              <InputPasswordToggle className='input-group-merge' id='register-password' onChange={(e) => setconfirmPwd(e.target.value)} />
              {isNotMatch && (
                <div style={{ color: '#EF3D3D' }}>
                  Password Tidak sama / Kosong
                </div>
              )}
            </div>
            {/* <div className='form-check mb-1'>
              <Input type='checkbox' id='terms' />
              <Label className='form-check-label' for='terms'>
                I agree to
                <a className='ms-25' href='/' onClick={e => e.preventDefault()}>
                  privacy policy & terms
                </a>
              </Label>
            </div> */}


            <Button tag={Link} to='/' color='primary' disabled={isNotMatch} block onClick={() => handleRegister()}>
              Submit
            </Button>
          </Form>
          {/* <p className='text-center mt-2'>
            <span className='me-25'>Already have an account?</span>
            <Link to='/login'>
              <span>Sign in instead</span>
            </Link>
          </p> */}
        </Col>
      </Col>
    </PreDashboardWrapper>
  )
}

export default Register
