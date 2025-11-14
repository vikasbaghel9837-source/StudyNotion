import React from 'react'
import CTAButton from './CTAButton';
import HighlightedText from './HighlightedText';
import knowyourprogress from "../../../assets/Images/Know_your_progress.png"
import comparewithothers from "../../../assets/Images/Compare_with_others.png"
import planyourlesson from "../../../assets/Images/Plan_your_lessons.png"

const LearningLanguageSection = ()=>{
    return(
        <div className='w-10/12 m-auto bg-white flex items-center flex-col justify-center mt-20 font-inter text-center pb-20'>
            <div className='flex flex-col gap-5 w-3/4'>
                <div className='text-4xl font-semibold'>
                    Your swiss knife for <HighlightedText>Learning any language</HighlightedText>
                </div>
                <p className='font-bold text-richblack-500'>Using spin making learning multiple languages easy. With 20+ languages realistic voice-over, progress tracking, custom schedule and more</p>
            </div>

            <div className='flex'>
                <img src={knowyourprogress} className='object-contain -mr-32'/>
                <img src={comparewithothers} className='object-contain'/>
                <img src={planyourlesson} className='object-contain -ml-36'/>
            </div>
            <div>
                <CTAButton active={true} linkTo={"/signup"}>
                    Learn more
                </CTAButton>
            </div>
        </div>
    )
}


export default LearningLanguageSection;