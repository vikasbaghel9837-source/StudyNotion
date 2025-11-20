import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import ChipInput from './ChipsInput';
import { MdNavigateNext } from 'react-icons/md';
import RequirementField from './RequirementField';
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"


const CourseInformationForm = ()=>{
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    } = useForm();


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token} = useSelector((state)=>state.auth);
    const {course , editCourse} = useSelector((state)=>state.course);
    const [loading , setLoading] = useState(false);
    const [courseCategories , setCourseCategories] = useState([]);

    useEffect(()=>{
        const getCategories = async()=>{
            setLoading(true);

            const categories = await fetchCourseCategories();
            if(categories.length > 0){
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        getCategories();
    },[])

    if(editCourse){
        setValue("courseTitle" , course.courseName);
        setValue("courseDesc" , course.courseDesciption);
        setValue("coursePrice" , course.price);
        setValue("courseTags" , course.tag);
        setValue("courseBenefits" , course.whatYouWillLearn);
        setValue("courseCategory" , course.category);
        setValue("courseRequirements" , course.instructions);
        setValue("courseImage" , course.thumbnail);
    }

    const onSubmit = async(data)=>{

    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}
            className='rounded-md bg-richblack-800 border-richblack-700 p-6 space-y-8'
        >
            <div>
                <label htmlFor='courseTitle'>Course Title <sup>*</sup></label>
                <input
                    id='courseTitle'
                    name='courseTitle'
                    placeholder='Enter Course Title'
                    {...register("courseTitle",{required:true})}
                    className='w-full'
                />
            </div>

            <div>
                <label htmlFor='courseDesc'>Course Short Description <sup>*</sup></label>
                <input
                    id='courseDesc'
                    name='courseDesc'
                    placeholder='Enter Description'
                    {...register("courseDesc",{required:true})}
                    className='w-full h-40'
                />
            </div>

            <div className='relative'>
                <label htmlFor='coursePrice'>Price <sup>*</sup></label>
                <input
                    id='coursePrice'
                    name='coursePrice'
                    placeholder='Enter Price'
                    {...register("coursePrice",{required:true,valueAsNumber:true})}
                    className='w-full '
                />
                <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400'/>
                {
                    errors.coursePrice && (
                        <span>Course Price is Required *</span>
                    )
                }
            </div>

            <div>
                <label htmlFor='courseCategory'>Category <sup>*</sup></label>
                <select
                    id='courseCategory'
                    name='courseCategory'
                    defaultValue=""
                    {...register("courseCategory" , {required:true})}
                    className='text-richblack-400'
                >
                    <option disabled value="">Choose a Category</option>

                    {
                        !loading && courseCategories.map((category,index)=>{
                            <option key={index} value={category._id} >{category?.name}</option>
                        })
                    }
                </select>
                {
                    errors.courseCategory && (
                        <span>Course Category is Required</span>
                    )
                }
            </div>
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tag and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

              {/* course Thumbnail image/video */}
            {/* <Upload
                name="courseImage"
                setValue={setValue}
                getValues={getValues}
                register = {register}
                errors = {errors}
                editData = {editCourse ? course?.thumbnail : null}
            /> */}
            {/* Benefits of the course */}
            <div>
                <label>Benefits of the Course<sup>*</sup></label>
                <textarea 
                
                    id='courseBenefits'
                    placeholder='Enter Benfits of the course'
                    {...register("courseBenefits",{required:true})}
                    className='form-style'
                />
                {
                    errors.courseBenefits && (
                        <span>Benefits of the course is required</span>
                    )
                }
            </div>

            {/* Requirements/Instructions */}
            {/* <RequirementField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
            /> */}

            {/* Next Button */}
            <div>
                <button>
                    Continue Without Saving
                </button>

                <IconBtn
                    disabled={loading}
                    text={!editCourse ? "Next" :"Save Changes"}
                >
                    <MdNavigateNext/>
                </IconBtn>
            </div>


        </form>
    )
}

export default CourseInformationForm;