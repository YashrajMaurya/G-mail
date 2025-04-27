import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        password: ''
    });
    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.post("https://g-mail-backend.onrender.com/api/v1/user/register", input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            if(res.data.success){
                navigate("/login")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen'>
            <form onSubmit={submitHandler} className='flex flex-col bg-white p-4 w-[20%] gap-3'>
                <h1 className='font-bold text-2xl uppercase my-2'>SignUp</h1>
                <input onChange={changeHandler} value={input.fullname} name='fullname' type="text" placeholder='Name' className='border border-gray-400 rounded-md px-2 py-1' />
                <input onChange={changeHandler} value={input.email} name='email' type="email" placeholder='Email' className='border border-gray-400 rounded-md px-2 py-1' />
                <input onChange={changeHandler} value={input.password} name='password' type="password" placeholder='Password' className='border border-gray-400 rounded-md px-2 py-1' />
                <button type='submit' className='bg-gray-800 p-2 text-white my-2 rounded-md'>SignUp</button>
            </form>
            <span>Already have an account? <span className='text-blue-800 cursor-pointer' onClick={() => navigate("/login")}>Login</span></span>
        </div>
    );
}

export default Signup;
    
