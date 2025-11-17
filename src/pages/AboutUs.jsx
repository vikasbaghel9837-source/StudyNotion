import React from 'react'
import HighlightedText from '../Components/core/Homepage/HighlightedText';
import aboutImg1 from "../assets/Images/aboutus1.webp"
import aboutImg2 from "../assets/Images/aboutus2.webp"
import aboutImg3 from "../assets/Images/aboutus3.webp"
import foundingStoryImg from "../assets/Images/FoundingStory.png"
import StatsComponent from '../Components/core/AboutPage/Stats';
import LearningGrid from '../Components/core/AboutPage/LearningGrid';
import ContactUsFormSection from "../Components/core/AboutPage/ContactUSFormSection"

const AboutUs = ()=>{
    return(
        <div className='bg-richblack-900'>
            {/* Section 1 */}
            <div className='bg-richblack-800'>
                
                <div className='pt-14 px-14 flex flex-col justify-center items-center m-auto w-2/3'>
                    <p className='text-xs text-richblack-500 font-bold mb-10'>About us</p>

                    <h1 className='text-white text-2xl font-semibold'>
                        Driving Innovation in Online Education for a 
                    </h1>
                    <div className='text-2xl font-semibold mb-6'>
                        <HighlightedText>
                            Brighter Future
                        </HighlightedText>
                    </div>

                    <p className='text-richblack-400 flex text-center mb-10'>
                        Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>

                    <div className='flex gap-6 justify-center items-center -mb-12'>
                        <img src={aboutImg1} width={"45%"} loading='lazy'/>
                        <img src={aboutImg2} width={"45%"} loading='lazy'/>
                        <img src={aboutImg3} width={"45%"} loading='lazy'/>
                    </div>

                </div>
            </div>


                {/* Section 2 */}
            <div className='mt-20 pb-14 flex justify-center items-center border border-b-richblack-500'>
                <div className='text-richblack-200 font-semibold pt-10 text-center text-3xl w-[80%] leading-10 '>
                    <span className='text-richblack-500'>"</span>
                    We are passionate about revolutionizing the way we learn. Our innovative platform
                    <span className='bg-clip-text text-transparent bg-gradient-to-br from-blue-100 to-blue-300'>{" "}combines technology</span>,
                    <span className='bg-clip-text text-transparent bg-gradient-to-br from-[#f57c31] to-[#c4530c]'>{"  "}expertise</span>
                    , and community to create an
                    <span className='bg-clip-text text-transparent bg-gradient-to-br from-brown-100 to-brown-600'>{"  "}unparalleled educational experience.</span> 
                    <span className='text-richblack-500'>"</span>
                </div>
            </div>

            {/* Section 3 */}
            <div>
                <div className='w-9/12 mx-auto text-white p-20'>
                    <div className='mb-20'>
                        <div className='flex gap-14'>
                            <div className='w-[55%]'>
                                <h1 className='text-3xl font-semibold bg-gradient-to-br bg-clip-text text-transparent
                                    from-[#fa5cc5] via-[#e05353] to-[#ff0000]
                                '>Our Founding Story</h1>
                                <p className='mt-5 text-sm text-richblack-300'>
                                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                                </p>
                                <p className='mt-3 text-sm text-richblack-300'>
                                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                                </p>
                            </div>

                            <div className='flex justify-center items-center'>
                                <img src={foundingStoryImg} className='w-[80%]'></img>
                            </div>
                        </div>
                        
                    </div>

                    <div className='mx-auto flex gap-36'>
                        <div>
                            <h1 className='text-3xl font-semibold bg-gradient-to-br bg-clip-text text-transparent
                                    from-[#f57c31] to-[#c4530c]
                                '>Our Vision</h1>
                            <p className='mt-5 text-sm text-richblack-300'>
                                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                            </p>
                        </div>
                        <div>
                            <h1 className='text-3xl font-semibold bg-gradient-to-br bg-clip-text text-transparent
                                     from-blue-100 to-blue-300
                                '>
                                Our Mission
                            </h1>
                            <p className='mt-5 text-sm text-richblack-300'>
                                our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <StatsComponent/>
            </div>

            <div className='w-[90%] m-auto mt-20'>
                <LearningGrid/>
            </div>

           <div className='w-10/12 m-auto text-white'>
                <ContactUsFormSection/>
           </div>
        </div>
    )
}


export default AboutUs; 