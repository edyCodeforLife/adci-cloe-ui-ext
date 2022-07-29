import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Label } from 'reactstrap';

const MainLabel = ({
    align, size, children, weight, className, style, ...res
}) => {

    const labelStyle = {
        fontSize: size + 'px',
        alignSelf: align,
        fontWeight: weight,
        ...style
    };
    
    return (
        <Label style={labelStyle} className={className}>
            {children}
        </Label>
    );
}

MainLabel.defaultProps = {
    align: "center",
    size: "12px",
    weight: "none"
  };

export default MainLabel;