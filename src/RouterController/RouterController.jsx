/* eslint-disable no-unused-vars */
import React from 'react';
import Header from '../Navbar/Header';
import { Outlet } from 'react-router-dom';

const RouterController = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default RouterController;