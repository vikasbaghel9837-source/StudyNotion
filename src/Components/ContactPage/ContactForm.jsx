import React, { useState ,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from "../../data/countrycode.json"

const ContactForm = ()=>{

    const [loading , setLoading] = useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data)=>{
        console.log("Logginf Data" , data);

        try{
            setLoading(true);

            const response = {status :"OK"};
            console.log("Logging Response ",response);
            setLoading(false);
        }
        catch(err){
            console.log("Error :" , err.message);
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:""
            })
        }
    },[reset , isSubmitSuccessful]);

    return(
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className='flex flex-col gap-3 w-[50%] mx-auto'>
                <div className='flex justify-between'>
                        {/* FirstName */}
                    <div className='flex flex-col gap-1 mb-2'>
                        <label htmlFor='firstname' className='text-sm text-richblack-25'>First Name</label>
                        <input 
                            type='text'
                            name='firstname'
                            id='firstname'
                            placeholder='Enter First Name'
                            className=' text-white bg-richblack-800 p-2 rounded-md border border-t-0 border-x-0 border-b-richblack-500'
                            {...register("firstname",{required:true})}
                            
                        />
                        {
                            errors.firstname && (
                                <span>
                                    Please Enter Your Name
                                </span>
                            )
                        }
                    </div>

                    {/* LastName */}
                    <div className='flex flex-col gap-1 mb-2'>
                        <label htmlFor='lastname' className='text-sm text-richblack-25'>Last Name</label>
                        <input 
                            type='text'
                            name='lastname'
                            id='lastname'
                            placeholder='Enter Last Name'
                            className='text-white bg-richblack-800 p-2 rounded-md border border-t-0 border-x-0 border-b-richblack-500'
                            {...register("lastname")}
                            
                        />
                        {
                            errors.lastname && (
                                <span>
                                    Please Enter Your Name
                                </span>
                            )
                        }
                    </div>
                </div>

                {/* email */}
                <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor='email' className='text-sm text-richblack-25'>Email</label>
                    <input 
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email Address'
                        className=' text-white bg-richblack-800 p-2 rounded-md border border-t-0 border-x-0 border-b-richblack-500'
                        {...register("email",{required:true})}
                        
                    />
                    {
                        errors.email && (
                            <span>
                                Please Enter Your email address
                            </span>
                        )
                    }
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor='phonenumber' className='text-sm text-richblack-25'>Phone Number</label>
                    <div className='flex justify-between'>
                        {/* DropDown */}
                        <select
                            name='dropdown'
                            id='dropdown'
                            {...register("countrycode",{required:true})}
                            className='w-[40%] text-white bg-richblack-800 p-2 rounded-md border border-t-0 border-x-0 border-b-richblack-500'
                        
                        >

                        {
                            CountryCode.map((element , index)=>{
                                return (
                                    <option
                                        key={index}
                                        value={element.code}
                                        className='text-white bg-richblack-800 p-2 rounded-md border border-t-0 border-x-0 border-b-richblack-500'
                                    >
                                        {element.code}-{element.country}
                                    </option>
                                )
                            })
                        }

                        </select>

                        {/* Input phone number */}
                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='99999*****'
                            className='lg:w-[260px] text-white bg-richblack-800 p-2 rounded-md border border-t-0 border-x-0 border-b-richblack-500'
                            {...register("phoneNo",{
                                required:{value:true , message:"Please enter Phone Number"},
                                maxLength:{value:10 , message:"Invalid Phone number"},
                                minLength:{value:8 , message:"Invalid Phone Number"}
                            })}
                        ></input>
                    </div>
                    {
                        errors.phoneNo && (
                            <span>
                                {errors.phoneNo.message}
                            </span>
                        )
                    }
                </div>

                {/* message */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor='message' className='text-sm text-richblack-25'>Message</label>
                        <textarea 
                            name='message'
                            id='message'
                            cols="30"
                            className=' text-white bg-richblack-800 p-2 rounded-md border border-t-0 border-x-0 border-b-richblack-500'
                            rows="7"
                            placeholder='Enter Your message here'
                            {...register("message", {required:true})}
                        />
                        {
                            errors.message && (
                                <span>
                                    PLease enter your message.
                                </span>
                            )
                        }
                    </div>
                        
                    <button type='submit'
                    className='rounded-md bg-yellow-50 text-center p-3 text-[16px] font-bold text-black'>
                            Send Message
                    </button>
                
                </div>
        </form>
    )
}


export default ContactForm;