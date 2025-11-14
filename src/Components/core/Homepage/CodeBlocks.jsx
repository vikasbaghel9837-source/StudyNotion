import React from 'react'
import HighlightedText from './HighlightedText';
import {TypeAnimation} from "react-type-animation"
import CTAButton from './CTAButton';
import { FaArrowRight } from 'react-icons/fa';

const CodeBlocks = ({
    position,heading,subHeading,ctaBtn1 , ctaBtn2 ,codeBlock , backgroundGradient,codeColour
})=>{
    console.log(ctaBtn1);
    console.log(ctaBtn2);
    return(
        <div className={`flex ${position} justify-between my-20 px-20 w-11/12 gap-16`}>
            
            {/* Section 1 */}
            <div className='flex flex-col gap-5 h-fit'>
                {heading}
                <div className='text-sm text-richblack-300'>
                    {subHeading}
                </div>

                <div className='flex items-center gap-10'>
                    <CTAButton active={ctaBtn1.active} linkTo={ctaBtn1.linkTo}>
                        {ctaBtn1.btnText}
                        <FaArrowRight/>
                    </CTAButton>
                    <CTAButton active={ctaBtn2.active} linkTo={ctaBtn2.linkTo}>
                        {ctaBtn2.btnText}
                    </CTAButton>
                </div>
                
            </div>

            {/* Section 2 */}
            <div className='relative flex h-fit w-[100%] text-[10px] px-10 bg-[#0F1624]/50 border border-[#0F1624]/50 p-3 shadow-[-3px_-3px_0px_0px_#0F1624]'>

                {/* Gradient */}
                <div className={`${backgroundGradient}`}></div>
                
                <div className='text-center flex flex-col font-inter w-[10%] font-bold text-richblack-400 mt-4 leading-4'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col font-bold font-mono pr-2 ${codeColour} space-y-0 leading-4`}>
                    <TypeAnimation
                        sequence={[codeBlock , 1000, ""]}
                        repeat={Infinity}
                        cursor={false}
                        speed={70}
                        style={
                            {
                                whiteSpace:"pre-line",
                                display:"block",
                                gap:"20px"
                            }
                        }
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>

        </div>
    )
}


export default CodeBlocks;