import React from 'react'
import {FaUsers , FaProjectDiagram} from "react-icons/fa"

const CourseCard = ({cardData , CurrCard , setCurrentCard , active})=>{
    return(
        <div className={`bg-richblack-800 p-5 w-[24%] cursor-default group hover:bg-white hover:shadow-[11px_11px_0px_-2px_#ffd657] transition-all duration-300`}>
            <div className='flex flex-col gap-5'>
                <p className='text-richblack-50 text-xl font-bold group-hover:text-black transition-all duration-300'>{cardData.heading}</p>
                <p className='text-sm text-richblack-400 mb-20'>{cardData.description}</p>
            </div>
            <div className='flex justify-between text-richblack-400 border-t pt-3 border-dashed group-hover:text-caribbeangreen-700'>
                <div className='flex items-center gap-2'>
                    <FaUsers/>
                    Beginner
                </div>
                <div className='flex items-center gap-2'>
                    <FaProjectDiagram/>
                    6 Lessons
                </div>
            </div>
        </div>
    )
}


export default CourseCard;