import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ChangePassword = () => {
    const navigate = useNavigate()
    const API = import.meta.env.VITE_backend_url
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async() => {
        if (!password.trim() || !confirmPassword.trim()) {
            toast.error('Both fields are required.');
            return;
        }

        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('Password must be at least 6 characters long and contain at least one special character.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        
       try {
        const response =  await axios.put(`${API}user/change-password`, {password}, {withCredentials:true})
        const data = response.data
        toast.success(data.message)
        navigate('/profile')
        
       } catch (error) {
            console.log(error);
            toast.error(error.message || error.response.data.message || 'intenet error try again')
       }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div>
            <h3 className='text-center py-5 text-red-500 font-bold text-2xl underline'>Change Password</h3>
            <div className='flex border-2 border-gray-600 rounded-md p-2 w-[250px] m-auto mb-3'>
                <input
                    type={showPassword ? "text" : "password"}
                    className='focus:outline-none'
                    placeholder="Choose your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
            <div className='flex border-2 border-gray-600 rounded-md p-2 w-[250px] m-auto'>
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    className='focus:outline-none'
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
            </div>
            <div className='flex justify-center mt-5 '>
            <button onClick={handleSubmit} className=' w-[250px] bg-blue-600 py-2 text-white rounded hover:bg-blue-800 transition-all duration-300'>Submit</button>

            </div>
            <div className='pl-5 pt-5 md:pl-52'>
                <Link to='/profile'>
                <button className='underline'>←Back</button>
                </Link>
            </div>
        </div>
    );
};

export default ChangePassword;