import toast from "react-hot-toast";
import { setloading , setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import {setUser} from "../../slices/profileSlice";
import {apiConnector} from "../apiconnector"
import { endpoints } from "../apis";
// import { resetPasswordBackend } from "../../../server/controllers/ResetPassword";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = endpoints

export function sendOTP(email , navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading....");

        dispatch(setloading(true));
        try{
            const response = await apiConnector("POST" , SENDOTP_API ,{
                email,
                checkUserPresent:true,
            })
            console.log("SENDING API RESPONSE ............." , response);
            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email")
        }
        catch(err){
            console.log("SENDOTP API ERROR............." , err)
            toast.error("Could not send OTP")
        }

        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading....")
        dispatch(setloading(true))

        try{
            const response = await apiConnector("POST" , SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            })

            console.log("SIGNUP API RESPONSE.........." , response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Signup Successful")
            navigate("/login")

        }   
        catch(err){
            console.log("SIGNUP API ERROR" , err);
            toast.error("Signup Failed")
            navigate("/signup")
        }

        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}

export function login(email , password , navigate){
    return async(dispatch) =>{
        const toastId = toast.loading("Loading....")

        dispatch(setloading(true))

        try{
            const response = await apiConnector("POST",LOGIN_API , {
                email,
                password
            })

            console.log("LOGIN API RESPONSE......", response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Login Successful");

            dispatch(setToken(response.data.token))

            const userImage = response.data.user?.image ?
                        response.data.user?.image:
                        `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            
            dispatch(setUser({...response.data.user , image:userImage}))

            localStorage.setItem("token" ,response.data.token);
            localStorage.setItem("user" , JSON.stringify(response.data.user));
            
            navigate("/dashboard/my-profile")
        }
        catch(err){
            console.log("LOGIN API ERROR...." , err);
            toast.error("Login Failed");
        }

        toast.dismiss(toastId);
        dispatch(setloading(false));
    }
}

export function resetPassword(password , confirmPassword , token ,setResetComplete){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading....");

        dispatch(setloading(true));

        try{
            const response = await apiConnector("POST" , RESETPASSWORD_API , {
                password,
                confirmPassword,
                token
            })

            console.log("RESETPASSWORD API RESPONSE .........." , response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password Reset Successfully")
            setResetComplete(true);
            // navigate("/login")
        }
        catch(err){
            console.log("RESETPASSWORD ERROR........." , err);
            toast.error("Failed to Reset Password")
        }
        
        toast.dismiss(toastId);
        dispatch(setloading(false));
        
    }
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}

export function getResetPasswordToken(email , setEmailSent){
    return async(dispatch)=>{

        dispatch(setloading(true));

        try{
            const response = await apiConnector("POST" , RESETPASSTOKEN_API , {email});

            console.log("RESET PASSWORD TOKEN RESPONSE : " ,response);

            if(!response.data.success){
                throw new Error(response.data.message);

            }

            toast.success("Email sent successfully");
            setEmailSent(true);

            
        }
        catch(err){
            console.log("RESET PASSWORD TOKEN ERROR : ",err);
            toast.error("Failed in Resetting password")
        }

        dispatch(setloading(false))

    }
};