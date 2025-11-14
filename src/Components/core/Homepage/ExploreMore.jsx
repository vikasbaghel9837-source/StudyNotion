import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightedText from './HighlightedText';
import CourseCard from "../Homepage/CourseCard"

const tagsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = ()=>{

    const [currentTab , setCurrentTab] = useState(tagsName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setCard = (value)=>{
        setCurrentTab(value);
        let result = HomePageExplore.filter((course)=> course.tag === value) ;

        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }

    return(
        <div className='bg-richblack-900'>
            <div className='flex flex-col justify-center items-center gap-3'>
                <div className='text-4xl font-bold'>
                    Unlock the <HighlightedText> Power of Code </HighlightedText>
                </div>
                <div className='text-richblack-300 text-sm'>
                    Learn to Build Anything You Can Imagine
                </div>

                <div className='flex gap-8 bg-richblack-800 p-2 rounded-full my-5'>
                    {
                        tagsName.map((element , index)=>{
                            return (
                                <div key={index} className={`font-inter ${currentTab === element ? "bg-richblack-900 text-richblack-5":"text-richblack-200"} 
                                                            rounded-full transition-all duration-200 cursor-pointer hover:text-richblack-5 px-3 py-1`}
                                    onClick={()=>setCard(element)}
                                >
                                    {element}
                                </div>
                            )
                        })
                    }
                </div>
                
                <div className='flex gap-8 items-center justify-center mt-10 -mb-20'>
                    {
                        courses.map((element,index)=>{
                            return (
                                <CourseCard
                                    key={index}
                                    cardData={element}
                                    currentCard={currentCard}
                                    setCurrentCard={setCurrentCard}
                                
                                />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}


export default ExploreMore;