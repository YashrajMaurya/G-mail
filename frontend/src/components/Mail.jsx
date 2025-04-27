import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { MdDelete, MdDeleteOutline, MdDriveFileMoveOutline, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineArchive } from "react-icons/md";
import { RiSpam2Line } from "react-icons/ri";
import { IoMailUnreadOutline } from 'react-icons/io5';
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
const icons1 = [
    <MdOutlineArchive size={'20px'} />,
    <RiSpam2Line size={'20px'} />,
]
const icons2 = [
    <IoMailUnreadOutline size={'20px'} />,
    <MdDriveFileMoveOutline size={'20px'} />,
    <HiDotsVertical size={'20px'} />,
]

const Mail = () => {
    const { selectedEmail } = useSelector(store => store.app)
    const navigate = useNavigate();
    const params = useParams()
    const deleteHandler = async () => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/email/${params.id}`, { withCredentials: true })
            toast.success(res.data.msg)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex-1 bg-white rounded-xl mx-5'>
            <div className='flex items-center justify-between px-4'>
                <div className='flex items-center gap-4 text-gray-700 py-2'>
                    <div onClick={() => navigate("/")} className='p-2 rounded-full cursor-pointer hover:bg-gray-200 mr-6'>
                        <IoMdArrowBack size={'20px'} />
                    </div>
                    {
                        icons1.map(item => <div className='p-2 rounded-full cursor-pointer hover:bg-gray-200'>
                            {item}
                        </div>)
                    }
                    <div onClick={deleteHandler} className='p-2 rounded-full cursor-pointer hover:bg-gray-200'>
                        <MdDeleteOutline size={'20px'} />
                    </div>
                    {
                        icons2.map(item => <div className='p-2 rounded-full cursor-pointer hover:bg-gray-200'>
                            {item}
                        </div>)
                    }
                </div>
                <div className='flex items-center gap-2'>
                    <span>1 to 50</span>
                    <MdKeyboardArrowLeft size={'24px'} />
                    <MdKeyboardArrowRight size={'24px'} />
                </div>
            </div>
            <div className='h-[90vh] overflow-y-auto p-4'>
                <div className='flex justify-between bg-white items-center gap-1'>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-xl font-medium'>{selectedEmail?.subject}</h1>
                        <span className='text-sm bg-gray-200 rounded-md px-2'>Inbox</span>
                    </div>
                    <div className='flex-none text-gray-400 my-5 text-sm'>
                        <p>{selectedEmail?.createdAt}</p>
                    </div>
                </div>
                <div className='text-gray-500 text-sm'>
                    <h1>{selectedEmail?.from}</h1>
                    <span>to me</span>
                </div>
                <div className='my-10'>
                    {selectedEmail?.message}
                </div>
            </div>
        </div>
    );
}

export default Mail;
