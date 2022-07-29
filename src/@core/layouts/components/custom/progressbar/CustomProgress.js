import React from 'react';
import { Progress } from 'reactstrap';
import { store } from '../../../../../redux/store';
import './styles.scss';

const CustomProgress = () =>{
 return (
    <div className="fill-window"> <Progress value={store.getState().upload.progress} /> </div>
 );
}

export default CustomProgress;