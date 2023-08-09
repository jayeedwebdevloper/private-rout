/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { WebController } from '../MainController';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';

const PrivateRouter = ({ children }) => {
    const { loader, userInfo } = useContext(WebController);
    if (loader) {
        return <Loader></Loader>
    }
    if (userInfo && userInfo.uid) {
        return children;
    }
    return <Navigate to='/signin'></Navigate>
};

export default PrivateRouter;