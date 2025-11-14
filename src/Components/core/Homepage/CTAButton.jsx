import React from 'react'
import { Link } from 'react-router-dom';


const CTAButton = ({children , active , linkTo})=>{
    return(
        <Link to={linkTo}>
            <div className={` text-center py-[12px] px-[24px] rounded-md text-sm flex items-center gap-2 justify-center
            ${active ? "bg-yellow-50 text-black":"bg-richblack-800 text-white shadow-[3px_3px_4px_-3px_#C5C7D4]"}
            `}>
                {children}
            </div>
        </Link>
    )
}


export default CTAButton;