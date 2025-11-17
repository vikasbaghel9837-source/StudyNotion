import React from 'react'
import ContactForm from "../../ContactPage/ContactForm"

const ContactUsFormSection = ()=>{
    return(
        <div>
            <div>
                <div className='flex flex-col gap-4 justify-center items-center'>
                    <h1 className='text-3xl font-semibold'>Get in Touch</h1> 
                    <p className='text-sm text-richblack-300'>
                        We'd love to here for you , Please fill out this form.
                    </p>
                </div>

                <div className='p-10'>
                    <ContactForm/>
                </div>
            </div>
        </div>
    )
}


export default ContactUsFormSection;