import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { setEmails, setOpen } from '../redux/appSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const SendEmail = () => {
    const { open, emails, user } = useSelector(store => store.app);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        from: '', // Check if user exists before accessing email
        to: '',
        subject: '',
        message: ''
    });
    useEffect(() => {
        if (user) {
            setFormData(prevState => ({ ...prevState, from: user.email }));
        }
    }, [user]);


    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setOpen(false));
        try {
            const res = await axios.post("http://localhost:8000/api/v1/email/create", formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            // dispatch(setEmails([...emails, res.data.email]));
            toast.success(res.data.message)
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={`${open ? 'block' : 'hidden'} bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}>
            <div className='flex items-center justify-between px-3 py-2 bg-[#F2F6FC]'>
                <h1>New Message</h1>
                <div onClick={() => dispatch(setOpen(false))} className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <RxCross2 size={'20px'} />
                </div>
            </div>
            <form onSubmit={submitHandler} className='flex flex-col p-3 gap-2'>
                <label>From: </label>
                <input name='from' value={formData.from} type="text" placeholder='From' className='outline-none py-1 border-b-1' readOnly />
                <input onChange={changeHandler} name='to' value={formData.to} type="text" placeholder='To' className='outline-none py-1 border-b-1' />
                <input onChange={changeHandler} name='subject' value={formData.subject} type="text" placeholder='Subject' className='outline-none py-1 border-b-1' />
                <textarea onChange={changeHandler} name='message' value={formData.message} rows={'10'} cols={'30'} className='outline-none'></textarea>
                <button type='submit' className='bg-blue-700 text-white rounded-full px-5 py-1 w-fit'>Send</button>
            </form>
        </div>
    );
}

export default SendEmail;
