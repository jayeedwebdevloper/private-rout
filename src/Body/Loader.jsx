/* eslint-disable no-unused-vars */
import React from 'react';

const Loader = () => {
    return (
        <div className='container'>
            <div className="box">
                <h2 className='text-secondary'>Loading....</h2>
                <div className="loader">
                    <div className="loading"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;