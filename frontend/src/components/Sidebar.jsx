import React from 'react';
import { LuPencil } from "react-icons/lu";
import { RiInbox2Fill } from "react-icons/ri";
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaRegFile } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { GoClock } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setOpen } from '../redux/appSlice';

const sidebarItems = [
    {
        icon: <RiInbox2Fill size={'20px'} />,
        text: "Inbox"
    },
    {
        icon: <FaRegStar size={'20px'} />,
        text: "Starred"
    },
    {
        icon: <GoClock size={'20px'} />,
        text: "Snoozed"
    },
    {
        icon: <AiOutlineSend size={'20px'} />,
        text: "Sent"
    },
    {
        icon: <FaRegFile size={'20px'} />,
        text: "Drafts"
    },
    {
        icon: <IoMdArrowDropdown size={'20px'} />,
        text: "More"
    },
]

const Sidebar = () => {
    const dispatch = useDispatch()
    return (
        <div className='w-[15%]'>
            <div className='p-3'>
                <button onClick={()=>dispatch(setOpen(true))} className='flex items-center gap-2 bg-[#C2E7FF] p-5 rounded-2xl hover:shadow'>
                    <LuPencil size={'24px'} />
                    <span className='font-medium ml-3'>Compose</span>
                </button>
            </div>
            <div className='text-gray-700'>
                {
                    sidebarItems.map(item => <div className='flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200'>
                        {item.icon}
                        <p>{item.text}</p>
                    </div>)
                }

            </div>
        </div>
    );
}

export default Sidebar;
