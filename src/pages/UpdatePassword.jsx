import React , {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {IoIosArrowRoundBack} from "react-icons/io"
import { Link } from 'react-router-dom';
import { resetPassword } from "../services/operations/authAPI"
import CTAButton from '../Components/core/Homepage/CTAButton';

const UpdatePassword = ()=>{

    const {loading} = useSelector((state)=> state.auth);
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
    const [formData , setFormData] = useState({
        password:"",
        confirmPassword : ""
    });

    const [resetComplete , setResetComplete] = useState(false);

    const dispatch = useDispatch();
    const {password , confirmPassword} = formData;
    const location = useLocation();

    const handleOnChange = (e)=>{
        e.preventDefault();

        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]:e.target.value,

            }
        ))

    }

    const handleOnSubmit = (e)=>{
        e.preventDefault();  
        const token = location.pathname.split('/').at(-1);

        dispatch(resetPassword(password , confirmPassword , token , setResetComplete));
        
    }
    

    return(
            <div className='flex justify-center items-center w-[26%] m-auto'>
                {
                    loading ? (
                        <div> Loading ....</div>
                    ):(
                        <div className='flex gap-4 flex-col'>
                            <div className='text-white text-3xl font-bold'>
                                {
                                    !resetComplete ? "Choose new password" : "Reset Complete"
                                }
                            </div>
    
                            <div className='text-richblack-400 text-sm'>
                                {
                                    !resetComplete ? "Almost done. Enter your new password and you are all set.":
                                    `All done! Your password is successfully updated`
                                }
                            </div>
    
                            <div>
                                { 
                                    !resetComplete ? (
                                    <form onSubmit={handleOnSubmit}>
                                        <label>
                                            <div className='text-richblack-5 mb-2 text-xs'>
                                                New password <span className='text-[#FF0000]'>*</span>
                                            </div>
                                            <input type= {showPassword ? "text":"password"}
                                             placeholder='********'
                                             required
                                             value={password}
                                             name='password'
                                             onChange={handleOnChange}
    
                                             className='px-2 py-2 bg-richblack-800 rounded-md border border-b-richblack-400 text-white text-sm w-full'
                                             />
                                             <span onClick={()=>setShowPassword((prev)=>!prev)} className="text-white" >
                                                {
                                                    showPassword ? <AiOutlineEye fontSize={24}/> :<AiOutlineEyeInvisible fontSize={24}/>
                                                }
                                             </span>
                                        </label>

                                        <label>
                                            <div className='text-richblack-5 mb-2 text-xs'>
                                                Confirm new password <span className='text-[#FF0000]'>*</span>
                                            </div>
                                            <input type={showConfirmPassword ? "text":"password"}
                                             placeholder='********'
                                             required
                                             value={confirmPassword} 
                                             name='confirmPassword'
                                             onChange={handleOnChange}
    
                                             className='px-2 py-2 bg-richblack-800 rounded-md border border-b-richblack-400 text-white text-sm w-full'
                                             />

                                             <span onClick={()=>setShowConfirmPassword((prev)=>!prev)} className="text-white">
                                                {
                                                    showConfirmPassword ? <AiOutlineEye fontSize={24}/> :<AiOutlineEyeInvisible fontSize={24}/>
                                                }
                                             </span>
                                        </label>
    
                                            <button type='submit' className='w-full mt-6 text-center py-[12px] px-[24px] rounded-md text-sm flex items-center gap-2 justify-center bg-yellow-50 text-black'>
                                                Reset Password
                                            </button>
                                    </form>
                                    ):(
                                        <CTAButton active={true} linkTo={"/login"}>
                                            Return to login
                                        </CTAButton>
                                    )
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


export default UpdatePassword;