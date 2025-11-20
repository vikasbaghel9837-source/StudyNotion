import {setLoading , setUser} from "../../slices/profileSlice"
import {toast} from "react-hot-toast"
import {profileEndpoints} from "../apis"
import {logout} from "./authAPI"
import { apiConnector } from "../apiconnector"
import { data } from "react-router-dom"

const {GET_USER_DETAILS_API , GET_USER_ENROLLED_COURSES_API} = profileEndpoints

export function getUserDetails(token , navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading.....")
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("GET" , GET_USER_DETAILS_API , null , {
                Authorization:`Bearer  ${token}`,
            })

            console.log("GET_USER_DETAILS_API response........." , response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            const userImage = response.data.data.image ? response.data.data.image : `https://api.dicebar.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`

            dispatch(setUser({...response.data.data , image:userImage }))
        }
        catch(err){
            dispatch(logout(navigate));

            console.log("GET_USER_DETAILS API ERROR ......." , err);
            toast.error("Could not Get User Details")
        }

        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading......");

    let result = [];

    try{
        const response = await apiConnector("GET" , GET_USER_ENROLLED_COURSES_API , null , {
            Authorization:`Bearer ${token}`
        })

        console.log("GET_USER_ENROLLED_COURSES RESPONSE......" , response)
        if(!response,data.success){
            throw new Error(response.data.message)
        }

        result = response.data.data
    }
    catch(err){
        console.log("GET_USER_ENROLLED_COURSES_API ERROR" , err);
        toast.error("Could not get Enrolled Courses")
    }

    toast.dismiss(toastId);
    return result;
}