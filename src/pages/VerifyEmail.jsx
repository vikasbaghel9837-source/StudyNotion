import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { signUp } from '../services/operations/authAPI';
import { sendOTP } from '../services/operations/authAPI';


const VerifyEmail = ()=>{

    const {loading ,signupData} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const [otp , setOtp] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[])

    if(!signupData) return null;

    const {
        accountType,
        firstName,
        lastName,
        password,
        confirmPassword,
        email
    } = signupData;

    const submitHandler = (e)=>{
        e.preventDefault();

        dispatch(signUp(accountType , firstName , lastName ,email , password , confirmPassword , otp,navigate))

    }

    return(
        <div className='flex justify-center items-center w-[26%] m-auto'>
            {
                loading ?(<div>Loading.....</div>):(
                    <div className='flex gap-4 flex-col'>
                        <h1  className='text-white text-3xl font-bold'>Verify Email</h1>

                        <p className='text-richblack-400 text-sm'>
                            A Vrification code has been sent to you . Enter the code below
                        </p>

                        <form onSubmit={submitHandler}>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props)=><input {...props} className='bg-richblack-800 text-richblack-5' />}
                                renderSeparator={<span>--</span>}
                                inputStyle={
                                    {
                                        width:"100%",
                                        height:"50px"
                                    }
                                }
                                
                            ></OTPInput>

                            <button  type='submit' className='w-full mt-6 text-center py-[12px] px-[24px] rounded-md text-sm flex items-center gap-2 justify-center bg-yellow-50 text-black'>
                                Verify email
                            </button>
                        </form>

                        <div className='text-white flex justify-between'>
                            <Link to="/login" className='flex items-center gap-1 text-sm'>
                                <IoIosArrowRoundBack/>
                                <div>
                                    Back to login
                                </div>
                            </Link>

                            <button onClick={()=>dispatch(sendOTP(signupData.email , navigate))} 
                                className='text-blue-300'
                                >
                                Resend it
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}


export default VerifyEmail;