import React from 'react'
import { Button } from 'reactstrap'

function CustomButton(props) {
    const {handleClick, text, icon, styled} = props;

    const classBtn = 'btn-next float-right md-margin-bottom'

    return (
        <Button color='primary' className={styled?styled:classBtn} onClick={() => handleClick()}>
            <span className='align-middle d-sm-inline-block d-none'>{text}</span>
            {
                icon? null: null
            }
        </Button>
    )
}

export default CustomButton