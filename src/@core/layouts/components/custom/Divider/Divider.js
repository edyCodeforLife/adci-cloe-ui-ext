import React, { useState, useEffect } from 'react';

const Divider = ({}) => {

    const styled = {
        border: '1px solid black',
        backgroundColor: 'black',
        width: '100%',
        display: 'inline-flex',
        marginTop: '10px',
        marginBottom: '10px'
    }

    return ( 
        <div style={styled}>
        </div>
     );
}
 
export default Divider;
