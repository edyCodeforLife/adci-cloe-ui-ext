import React, { useState, useEffect } from 'react';
import MainLabel from '../@core/layouts/components/custom/label/MainLabel';
import MainCard from '../@core/layouts/components/custom/MainCard';

const TextScreen = ({data, title}) => {
    return (<>
        <MainCard title={title}>
            <MainLabel size="12px" align='center'>{data}</MainLabel>
        </MainCard>
    </>);
}

export default TextScreen;