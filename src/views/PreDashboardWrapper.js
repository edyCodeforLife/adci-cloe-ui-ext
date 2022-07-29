import React from 'react';
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import { useTranslation } from 'react-i18next'
import {MAIN_LOGO} from '../utility/Source';

const PreDashboardWrapper = ({ bgPage, children }) => {
    const { t } = useTranslation();

    return (
        <div className='auth-wrapper auth-cover'>
            <Row className='auth-inner m-0'>
                <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                    <img src={MAIN_LOGO} alt="logo" style={{ width: '30px', height: '30px' }} />
                    <h2 className='brand-text text-primary ms-1'>{t("App Name")}</h2>
                </Link>
                <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                    <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                        <img className='img-fluid' src={bgPage} alt='Login Cover' />
                    </div>
                </Col>
                {
                    children
                }
            </Row>
        </div>
    )
}

export default PreDashboardWrapper

