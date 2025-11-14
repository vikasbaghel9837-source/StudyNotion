import React, { useState } from 'react'
import CTAButton from '../Components/core/Homepage/CTAButton';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getResetPasswordToken } from '../services/operations/authAPI';


const ForgotPassword = ()=>{

    const [email , setEmail] = useState("");
    const [emailSent , setEmailSent] = useState(false);

    const {loading} = useSelector((state)=> state.auth);

    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();
        
        dispatch(getResetPasswordToken(email , setEmailSent));
    }

    return(
        <div className='flex justify-center items-center w-[25%] m-auto'>
            {
                loading ? (
                    <div> Loading ....</div>
                ):(
                    <div className='flex gap-4 flex-col'>
                        <div className='text-white text-3xl font-bold'>
                            {
                                !emailSent ? "Reset your Password" : "Check email"
                            }
                        </div>

                        <div className='text-richblack-400 text-sm'>
                            {
                                !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":
                                            `We have sent the reset email to ${email}`
                            }
                        </div>

                        <div>
                            {
                            
                            !emailSent &&
                                <form onSubmit={submitHandler}>
                                    <label>
                                        <div className='text-richblack-5 mb-2 text-xs'>
                                            Email Address <span className='text-[#FF0000]'>*</span>
                                        </div>
                                        <input type='email'
                                         placeholder='yours@gmail.com'
                                         required
                                         value={email}
                                         name='email'
                                         onChange={(e)=> setEmail(e.target.value)}

                                         className='px-2 py-2 bg-richblack-800 rounded-md border border-b-richblack-400 text-white text-sm w-full'
                                         />
                                    </label>

                                    <div className=' mt-6 text-center py-[12px] px-[24px] rounded-md text-sm flex items-center gap-2 justify-center bg-yellow-50 text-black'>
                                        <button type='submit' className=''>
                                            {
                                                !emailSent ? "Reset Password" : "Resend Email"
                                            }
                                        </button>
                                    </div>
                                </form>
                            }
                            
                        </div>

                        <div className='text-white'>
                            <Link to="/login" className='flex items-center gap-1 text-sm'>
                                <IoIosArrowRoundBack/>
                                <div>
                                    Back to login
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}


export default ForgotPassword;