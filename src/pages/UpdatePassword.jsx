import React from 'react'
import { setloading } from '../slices/authSlice'
import { useSelector } from 'react-redux'

const UpdatePassword = ()=>{

    const {loading} = useSelector((state)=> state.auth);
    const [showPassword , setShowPassword] = useState(false);
    const [formData , setFormData] = useState({
        password:"",
        confirmPassword : ""
    });


    const handleOnChange = (e)=>{
        e.prevenDefault();

    }
    

    return(
        <div>
            {
                loading ? (<div>
                    Loading.....
                </div>):(
                    <div>

                        

                    </div>
                )
            }
        </div>
    )
}


export default UpdatePassword;