import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, UncontrolledButtonDropdown } from 'reactstrap';
import MainCard from '@core/layouts/components/custom/MainCard';
import { SV_COMPANY_PROFILE, SV_CUSTOMER_PROFILE } from '../../../utility/Constants';
import "@core/scss/react/custom/customer-registration.scss";
import MainLabel from '@core/layouts/components/custom/label/MainLabel';

const options = {
    companyType: ['UID', "CV"]
}

const CompanyCustomerProfile = ({ t }) => {
    return (<>
        <MainCard title={SV_COMPANY_PROFILE}>
            <div className='display-inline'>
                <MainLabel size="12px" align='center'>{t("Company Type")}</MainLabel>
                <UncontrolledButtonDropdown>
                    <DropdownToggle className='flex-1' outline color='primary' size='sm' caret>
                        {options.companyType[0]}
                    </DropdownToggle>
                    <DropdownMenu>
                        {options.companyType.map(item => (
                            <DropdownItem className='w-100' key={item}>
                                {item}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                    {/* <Dropdown className='flex-1'>
                        <DropdownToggle caret>
                            Dropdown
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>
                                Header
                            </DropdownItem>
                            <DropdownItem>
                                Action
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown> */}
                </UncontrolledButtonDropdown>
                <MainLabel size="12px" align='center'>{t("Company Name")}</MainLabel>
                <Input className='half-field' type='text' id='company-name' placeholder='john@example.com' autoFocus />
            </div>
        </MainCard>
        <MainCard title={SV_CUSTOMER_PROFILE}>
            <div className='grid-display'>
                <Label>{t("Full Name")}</Label>
                <Input type='text' className='half-field tidy-margin' id='company-name' placeholder='john@example.com' />
                <Label>{t("Phone")}</Label>
                <Input type='text' className='half-field tidy-margin' id='company-name' placeholder='john@example.com' />
                <Label>{t("Mobile Phone")}</Label>
                <Input type='text' className='half-field tidy-margin' id='company-name' placeholder='john@example.com' />
                <Label>{t("Email")}</Label>
                <Input type='email' className='half-field tidy-margin' id='company-name' placeholder='john@example.com' />
            </div>
        </MainCard>
    </>);
}

export default CompanyCustomerProfile;