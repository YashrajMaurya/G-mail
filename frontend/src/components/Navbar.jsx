import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import InitialsAvatar from 'react-initials-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setSearchText } from '../redux/appSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [text, setText] = useState('')
    const {user} = useSelector(store => store.app);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = async () => {
        try {
            const res = await axios.get("https://g-mail-backend.onrender.com/api/v1/user/logout")
            toast.success(res.data.msg)
            dispatch(setAuthUser(null))
            navigate("/login")
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        dispatch(setSearchText(text))
    },[text])
    return (
        <div className='flex items-center justify-between mx-3 h-16'>
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-2">
                    {
                        user && (
                            <div className='cursor-pointer hover:bg-gray-200 rounded-full p-3'>
                                <GiHamburgerMenu />
                            </div>
                        )
                    }

                    <img className="w-8" src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png" alt="Logo" />
                    <h1 className='text-2xl text-gray-500 font-medium'>Gmail</h1>
                </div>
            </div>
            {
                user && (
                    <>
                        <div className='w-[50%] mr-60'>
                            <div className='flex items-center bg-[#EAF1FB] px-2 py-4 rounded-full'>
                                <IoSearch size={'24px'} className='text-gray-700' />
                                <input value={text} onChange={(e)=>setText(e.target.value)} type="text" placeholder='Search mail' className='rounded-full w-full bg-transparent outline-none px-1 ml-2' />
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <CiCircleQuestion size={'24px'} />
                            </div>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <IoIosSettings size={'24px'} />
                            </div>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <TbGridDots size={'24px'} />
                            </div>
                            <span onClick={logout} className='underline cursor-pointer'>Log Out</span>
                            <InitialsAvatar name={user.fullname} className='bg-green-300 rounded-full px-2 py-2 hover:bg-green-500 cursor-pointer' />
                        </div>
                    </>
                )
            }

        </div>
    );
}

export default Navbar;
