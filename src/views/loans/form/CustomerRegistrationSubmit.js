import React, { useState, useEffect } from 'react';
import { Label } from 'reactstrap';
import MainCard from '../../../@core/layouts/components/custom/MainCard';
import { SV_CUSTOMER_REGIST_FORM } from '../../../utility/Constants';

const CustomerRegistrationSubmit = () => {
    return (<>
        <MainCard title={SV_CUSTOMER_REGIST_FORM}>
            <Label>Somthing</Label>
        </MainCard>
    </>);
}

export default CustomerRegistrationSubmit;