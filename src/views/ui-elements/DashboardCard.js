import React, { useState, useEffect } from 'react';
import MainLabel from '../../@core/layouts/components/custom/label/MainLabel';
import MainCard from '../../@core/layouts/components/custom/MainCard';
import { Navigation } from 'react-feather'
import { useTranslation } from 'react-i18next';

const DashboardCard = ({ title, width, logo, value, icon, bgColor }) => {

    const { t } = useTranslation();
    const IconCard = icon ? require('react-feather/dist/icons/' + icon).default :
        require('react-feather/dist/icons/help-circle').default;

    const style = {
        border: '2px solid red',
        backgroundColor: bgColor,
        width: '20%',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: 180,
            height: 180,
            background: 'red',
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
            content: '""',
            position: 'absolute',
            width: 180,
            height: 180,
            background: 'red',
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

    return (
        <MainCard styled={{ backgroundColor: bgColor, overflow: 'hidden', height: 'fit-content' }}>
            <div style={{ display: 'inline-flex', width: '100%' }}>
                <MainLabel size="12" weight="bold" style={{ color: 'white' }}>
                    {t(title)}
                </MainLabel>
                <MainLabel size="16" weight="bold" style={{ marginLeft: 'auto', color: 'white' }}>
                    {value}
                </MainLabel>
            </div>
            {/* <IconCard style={{ color: 'white', width: '15%', height: '15%' }} /> */}
        </MainCard>
    );
}

export default DashboardCard;