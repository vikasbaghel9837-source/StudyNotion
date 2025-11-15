import React, { useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';


const VerifyEmail = ()=>{

    const {loading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const [otp , setOtp] = useState("");

    return(
        <div className='flex justify-center items-center w-[26%] m-auto'>
            {
                loading ?(<div>Loading.....</div>):(
                    <div className='flex gap-4 flex-col'>
                        <h1  className='text-white text-3xl font-bold'>Verify Email</h1>

                        <p className='text-richblack-400 text-sm'>
                            A Vrification code has been sent to you . Enter the code below
                        </p>

                        <form>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props)=><input {...props} />}
                                className=""
                            ></OTPInput>

                            <button  type='submit' className='w-full mt-6 text-center py-[12px] px-[24px] rounded-md text-sm flex items-center gap-2 justify-center bg-yellow-50 text-black'>
                                Verify email
                            </button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}


export default VerifyEmail;