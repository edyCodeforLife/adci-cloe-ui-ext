import React, { useState, useEffect } from 'react';
import { Label, Row, Col, Progress } from 'reactstrap';
import MainLabel from '../../@core/layouts/components/custom/label/MainLabel';
import MainCard from '../../@core/layouts/components/custom/MainCard';
import { Navigation } from 'react-feather'

const DashboardSideCard = ({ title, width, logo, value, icon, bgColor }) => {

    const IconCard = icon ? require('react-feather/dist/icons/' + icon).default :
        require('react-feather/dist/icons/help-circle').default;

    const styleOutside = {
        backgroundColor: bgColor ? bgColor : 'white',
        '&:after': {
            content: "",
            position: 'absolute',
            width: 180,
            height: 180,
            background: 'white',
            borderRadius: '50%',
            bottom: -95,
            right: -95,
            opacity: 0.1,
            // [theme.breakpoints.down('sm')]: {
            //   top: -105,
            //   right: -140
            // }
        },
        '&:before': {
            content: "",
            position: 'absolute',
            width: 180,
            height: 180,
            background: 'white',
            borderRadius: '50%',
            bottom: -135,
            right: -15,
            opacity: 0.5,
            // [theme.breakpoints.down('sm')]: {
            //   top: -155,
            //   right: -70
            // }
        }
    }

    const styleInside = {
        border: '2px solid red',
        backgroundColor: 'red',
        borderColor: 'white',
        width: 'fit-content',
        display: 'inline-flex',
    }



    return (
        <MainCard styled={styleOutside}>
             <Row className='pt-50'>
                <Col className='mb-2' md='6' sm='12'>
                    <p className='mb-50'>Goal:</p>
                    <Progress className='avg-session-progress mt-25' value='50' />
                </Col>
                </Row>
        </MainCard>
    );
}

export default DashboardSideCard;