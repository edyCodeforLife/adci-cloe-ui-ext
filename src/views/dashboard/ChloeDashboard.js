import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap'
import DashboardCard from '../ui-elements/DashboardCard';

import '@styles/base/bootstrap-extended.scss';
import MainCard from '../../@core/layouts/components/custom/MainCard';
import ChartApp from '../../@core/layouts/components/custom/chart/ChartApp';
import DashboardSideCard from '../ui-elements/DashboardSideCard';

import { store } from '../../redux/store';
import PageLoader from '../../@core/components/page-loader';
import { AuthService } from '../../data/business/auth/auth';
import { PATH_LOGIN, PATH_REGISTER } from '../../navigation/path';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACTIVATED } from '../../utility/Constants';

const cards = [
    "Active Loan", "Total Active Loan Req", "Remain Loan Amount"
];
const cardIcon = [
    "activity", "airplay", "aperture"
];
const bgCard = [
    '#002b79', '#038874', '#ad0025'
];

const bgSideCard = [
    '#002b79', '#038874', '#ad0025', '#ad0025'
];

const ChloeDashboard = () => {
    const dashboardData = useSelector(state => state.general?.dashboardData);

    const generateTopCard = () => {
        let temp = [];
        let index = 0;
        if (dashboardData != undefined)
            for (var key of Object.keys(dashboardData)) {
                temp.push(
                    <Col xl='4' md='4' xs='12'>
                        <DashboardCard title={key} value={dashboardData[key]} icon={cardIcon[index]} bgColor={bgCard[index]} />
                    </Col>)
                index++;
                if(index>2)
                    index=0;
            }

        return temp;
    }

    const innerChart = {

    }

    return (<>
        <Row className='match-height'>
            {
                generateTopCard()
            }
        </Row>
        {/* <Row className='match-height'>
            <Col xl='12' md='12' xs='12'>
                <MainCard>
                    <ChartApp />
                </MainCard>
            </Col>
            <Col xl='4' md='4' xs='12'>
                <DashboardSideCard title="tes" value="0" />
                <DashboardSideCard title="tes" value="0" />
                <DashboardSideCard title="tes" value="0" />
                <DashboardSideCard title="tes" value="0" />
            </Col>
        </Row> */}
    </>);
}

export default ChloeDashboard;