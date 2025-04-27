import React, { useEffect, useState } from 'react';
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { FaCaretDown, FaUserFriends } from 'react-icons/fa';
import { IoMdMore, IoMdRefresh } from 'react-icons/io';
import { GoTag } from 'react-icons/go';
import { CiCircleInfo } from "react-icons/ci";
import Emails from './Emails';
import useGetAllEmails from '../hooks/useGetAllEmails.js';

const mailType = [
    {
        icon: <MdInbox size={'20px'}/>,
        text: "Primary"
    },
    {
        icon: <GoTag size={'20px'}/>,
        text: "Promotion"
    },
    {
        icon: <FaUserFriends size={'20px'}/>,
        text: "Social"
    },
    {
        icon: <CiCircleInfo size={'20px'}/>,
        text: "Updates"
    },
]

const Inbox = () => {
    const [selected, setSelected] = useState(0)
    const getEmails = useGetAllEmails()
    useEffect(() => {
        getEmails(); // Fetch emails automatically when component mounts
    }, []); 
    return (
        <div className='flex-1 bg-white rounded-xl mx-5'>
            <div className='flex items-center justify-between px-4 my-2'>
                <div className="flex items-center gap-2">
                    <div className='flex items-center'>
                        <div className='hover:bg-gray-200 cursor-pointer px-0.5 py-2'>
                            <MdCropSquare size={'20px'} />
                        </div>
                        <div className='hover:bg-gray-200 cursor-pointer px-0.5 py-2'>
                            <FaCaretDown size={'20px'} />
                        </div>
                    </div>
                    <div onClick={getEmails} className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                        <IoMdRefresh size={'20px'} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                        <IoMdMore size={'20px'} />
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <span>1 to 50</span>
                    <MdKeyboardArrowLeft size={'24px'}/>
                    <MdKeyboardArrowRight size={'24px'}/>
                </div>
            </div>
            <div className='h-90vh overflow-y-auto'>
                <div className="flex items-center gap-20">
                    {
                        mailType.map((item,index) => <button className={` ${selected === index ? "border-b-4 border-b-blue-600 text-blue-600" : "border-b-transparent border-b-4"} flex items-center gap-4 w-52 hover:bg-gray-200 p-4`} onClick={()=>setSelected(index)}>
                            {item.icon}
                            <span>{item.text}</span>
                        </button>)
                    }
                </div>
                <Emails/>
            </div>
        </div>
    );
}

export default Inbox;
