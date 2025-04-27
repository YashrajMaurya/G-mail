import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '../redux/appSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch()
    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:8000/api/v1/user/login", input, {
                
                withCredentials: true
            })
            if(res.data.success){
                dispatch(setAuthUser(res.data.user))
                navigate("/")
                toast.success(res.data.mess)
            }
        }catch(e){
            console.log(e);
            toast.error(e.response.data.mess)
        }
    }
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen'>
            <form onSubmit={submitHandler} className='flex flex-col bg-white p-4 w-[20%] gap-3'>
                <h1 className='font-bold text-2xl uppercase my-2'>Login</h1>
                <input value={input.email} name='email' onChange={changeHandler} type="email" placeholder='Email' className='border border-gray-400 rounded-md px-2 py-1'/>
                <input value={input.password} name='password' onChange={changeHandler} type="password" placeholder='Password' className='border border-gray-400 rounded-md px-2 py-1'/>
                <button type='submit' className='bg-gray-800 p-2 text-white my-2 rounded-md'>Login</button>
            </form>
            <span>Don't have an account? <span className='text-blue-800 cursor-pointer' onClick={()=>navigate("/signup")}>SignUp</span></span>
        </div>
    );
}

export default Login;
