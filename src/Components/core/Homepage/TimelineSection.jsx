import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLineImage from "../../../assets/Images/TimelineImage.png"

let timeline = [
    {
        logo:logo1,
        heading:"Leadership",
        description:"Fully committed to the success company"
    },
    {
        logo:logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority"
    },
    {
        logo:logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills"
    },
    {
        logo:logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution"
    }
]

const TimelineSection = ()=>{

    return(
        <div className='w-10/12 mx-auto mt-10 flex justify-between items-center'>
            {/* Section 1 */}
            <div className='w-[60%]'>
                <div className='flex flex-col font-inter gap-10 px-10'>
                    {
                        timeline.map((element , index)=>{
                            return (
                                <div className='flex gap-10' key={index}>
                                    <div className='mt-0.5 border border-none p-2 rounded-full shadow-[0px_0px_6px_3px_rgba(0,_0,_0,_0.1)]'>
                                        <img src={element.logo}></img>
                                    </div>
                                    <div>
                                        <p className='font-bold'>{element.heading}</p>
                                        <p className='text-sm text-richblack-700'>{element.description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/* Section 2 */}
            <div className=''>
                <div className='relative'>
                    
                    <img src={timeLineImage} className='relative border-[15px] border-white shadow-[-4px_-4px_6px_-2px_rgba(59,_130,_246,_0.5)]'/>


                    <div className='absolute w-[400px] bg-[#014A32] top-[80%] right-[12%] flex text-white py-8 px-6 gap-4'>
                        
                            <div className='flex gap-3 items-center border-r border-caribbeangreen-300 px-2'>
                                <div className='text-3xl font-bold'>10</div>
                                <div className='text-caribbeangreen-300'>YEARS EXPERIENCES</div>
                            </div>
        
                            <div className='flex gap-3 items-center'>
                                <div className='text-3xl font-bold'>250</div>
                                <div className='text-caribbeangreen-300'>TYPES OF COURSES</div>
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


export default TimelineSection;