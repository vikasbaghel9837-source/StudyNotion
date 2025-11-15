import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import CTAButton from "../Components/core/Homepage/CTAButton"
import BoxOffice from "../assets/Images/boxoffice.png"
import HighlightedText from '../Components/core/Homepage/HighlightedText';
import CodeBlocks from '../Components/core/Homepage/CodeBlocks';
import TimelineSection from '../Components/core/Homepage/TimelineSection';
import LearningLanguageSection from '../Components/core/Homepage/LearningLanguageSection';
import instructorImage from "../assets/Images/Instructor.png"
import ExploreMore from '../Components/core/Homepage/ExploreMore';
import Footer from '../Components/common/Footer';

const Home = ()=>{
    return(
        <div>
            {/* Section 1 */}

            <div className='text-white mx-auto w-11/12 flex flex-col items-center justify-between font-inter'>

                <Link to={"/signup"}>

                    <div className='group mt-16 justify-center items-center bg-richblack-800 text-richblack-200 rounded-full py-[6px] px-[18px]
                        transition-all duration-200 hover:scale-90 w-fit shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]'>
                        {/* Button */}
                        <div className='flex justify-center items-center gap-2 group-hover:bg-richblack-900 rounded-full transition-all duration-200
                        px-5 py-2'>
                        
                            <p className='text-md'>Become an instructor</p>
                            <FaArrowRight/>
                            
                        </div>

                    </div>
                
                </Link>

                {/* Heading */}
                <div className='mt-10 font-inter text-[36px] text-richblack-5 tracking-tight font-medium'>
                    <p>
                        Empower Your Future with {""}
                        <HighlightedText>
                            Coding Skills
                        </HighlightedText>
                    </p>
                    <p>

                    </p>
                </div> 

                {/* Description */}
                <div className='text-richblack-200 text-sm flex flex-col items-center mt-3'>
                    <div>
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a
                    </div>
                    <div>
                        wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                    </div>
                </div>

                {/* Buttons */}
                <div className='flex items-center text-center gap-11 mt-10'>
                    <CTAButton active={true} linkTo={"/signup"}>
                    Learn More
                    </CTAButton>

                    <CTAButton active={false} linkTo={"/login"}>
                    Book a Demo
                        
                    </CTAButton>
                </div>

                {/* Images */}
                <div className='mt-14 max-w-fit w-3/4 shadow-[-14px_-20px_47px_-7px_rgba(59,_130,_246,_0.15)]'>
                    <img src={BoxOffice} className=''></img>
                </div>

                {/* Code blocks */}
                <div className='font-inter'>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className='text-3xl font-semibold'> 
                                Unlock your {""}
                                <HighlightedText>coding potential {"\n"}</HighlightedText>
                                with our online courses.
                            </div>
                            }
                        subHeading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctaBtn1={
                            {
                                btnText:"try it yourself",
                                linkTo:"/signup",
                                active:true
                            }
                        }
                        ctaBtn2={
                            {
                                btnText:"learn More",
                                linkTo:"/login",
                                active:false
                            }
                        }
                        codeBlock={
                            `
                            <!DOCTYPE html>\n<html>\n<head><title> Example</title>\n<link rel="stylesheet" href="Styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>
                            `
                        }
                        codeColour={
                            "text-white"
                        }
                        backgroundGradient={
                            "absolute inset-0 bg-gradient-to-r from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF] opacity-20 blur-3xl rounded-full scale-100"
                        }
                    >

                    </CodeBlocks>

                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-3xl font-semibold'> 
                                Start {""}
                                <HighlightedText>coding in seconds{"\n"}</HighlightedText>
                                
                            </div>
                            }
                        subHeading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctaBtn1={
                            {
                                btnText:"Continue lesson",
                                linkTo:"/signup",
                                active:true
                            }
                        }
                        ctaBtn2={
                            {
                                btnText:"learn More",
                                linkTo:"/login",
                                active:false
                            }
                        }
                        codeBlock={
                            `
                            <!DOCTYPE html>\n<html>\n<head><title> Example</title>\n<link rel="stylesheet" href="Styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>
                            `
                        }
                        codeColour={
                            "text-white"
                        }
                        backgroundGradient={
                            "absolute inset-0 bg-gradient-to-r from-[#2950a3] via-[#2950a3] to-[#2950a3] opacity-40 blur-3xl rounded-full scale-100"
                        }
                    >

                    </CodeBlocks>
                </div>

                <ExploreMore></ExploreMore>
                
            </div>

            {/* Section 2 */}
            
            <div className='bg-white font-inter'>
                <div className='flex homepage-bg w-full h-[333px] bg-white'>
                    <div className='flex gap-10 items-center mx-auto'>
                        <CTAButton active={true} linkTo={"/signup"}>
                            Explore Full Catalog
                            <FaArrowRight/>
                        </CTAButton>
                        <CTAButton active={false} linkTo={"/login"}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>
                <div className='bg-white '>
                    <div className='flex w-10/12 font-inter mx-auto gap-14'>
                        <div className='font-bold w-[100%] text-4xl mt-14  leading-normal'>
                            Get the skills you need for a
                            <HighlightedText>
                                {" "}job that is in demand.
                            </HighlightedText>
                        </div>

                        <div className='mt-14 flex flex-col gap-10'>
                            <p className='font-semibold text-xs'>
                                The modern StudyNotion is the dictates its own terms.Today , to be a competitive specialist requires more than professional skills
                            </p>
                            <div className='flex items-center'>
                                <CTAButton active={true} linkTo={"/signup"}>
                                    Learn More
                                </CTAButton>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <TimelineSection></TimelineSection>

                <LearningLanguageSection></LearningLanguageSection>

            </div>

            {/* Section 3 */}
            <div className='bg-richblack-900 h-full w-full'>
                <div className='w-10/12 mx-auto flex gap-16'>
                    <div className='w-[70%] mt-12 '>
                        
                        <img src={instructorImage} 
                        style={{ boxShadow: '-10px -10px 0px rgba(255,255,255)' }}
                        />
                    </div>
                    <div className='text-white flex flex-col justify-center items-start gap-6'>
                        <div className='text-4xl font-bold'>
                            Become an <HighlightedText>instructor</HighlightedText>
                        </div>

                        <p className='text-sm text-richblack-400'>
                            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                        </p>

                        <div>
                            <CTAButton active={true} linkTo={"/signup"}>
                                Start Teaching Today
                                <FaArrowRight/>
                            </CTAButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer></Footer>
        </div>
    )
}


export default Home;