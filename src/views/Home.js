import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MerchantDashboardService } from '../data/services/dashboard';
import { PATH_REGISTER } from '../navigation/path';
import { setDashboardData } from '../redux/general';
import { ACTIVATED } from '../utility/Constants';
import ChloeDashboard from './dashboard/ChloeDashboard'

const Home = () => {
  const username = useSelector(state => state.login.credential?.username)
  const navigate = useNavigate();
  const loginData = useSelector(state => state.login.credential);
  const _service = new MerchantDashboardService();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginData.userStatus !== ACTIVATED) {
      navigate(PATH_REGISTER)
    } else {
      _service.getCustomerDashboardData(username, {
        Success: (res) => {
          dispatch(setDashboardData(res?.data))
        }
      })
    }
  }, [])

  return (
    <ChloeDashboard />
  )
}

export default Home
