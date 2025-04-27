import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const Body = () => {
    const navigate = useNavigate()
    const { user } = useSelector(store => store.app)
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [])
    return (
        <>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <Outlet />
            </div>
        </>
    );
}

export default Body;
