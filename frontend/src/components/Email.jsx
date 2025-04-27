import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { MdCropSquare } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedEmail } from '../redux/appSlice';

const Email = ({email}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const openMail = ()=>{
        dispatch(setSelectedEmail(email))
        navigate(`/mail/${email._id}`)
    }
    return (
        <div onClick={openMail} className='flex items-center justify-between border-b-gray-200 border-b px-4 py-3 text-small hover:cursor-pointer hover:shadow-md'>
            <div className='flex gap-2'>
                <div className='text-gray-400 cursor-pointer hover:shadow-xl rounded-full hover:text-gray-600'>
                    <MdCropSquare size={'20px'}/>
                </div>
                <div className='text-gray-400 hover:cursor-pointer hover:shadow-xl rounded-full hover:text-gray-600'>
                    <FaRegStar size={'20px'}/>
                </div>
                <div className='pl-2'>
                    <h1 className='font-semibold'>{email?.subject}</h1>
                </div>
            </div>
            <div className='flex-1 ml-4'>
                {email?.message}
            </div>
            <div className='flex-none text-gray text-sm'>
                <p>{email?.createdAt}</p>
            </div>
        </div>
    );
}

export default Email;
